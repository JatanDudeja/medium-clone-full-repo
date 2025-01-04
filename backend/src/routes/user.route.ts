import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import {
  UserSigninDTO,
  userSigninZod,
  userSignupZod,
  UserSingupDTO,
} from "@jatan_dudeja/medium-clone";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    ACCESS_TOKEN_SECRET: string;
    ACCESS_TOKEN_EXPIRY: string;
    REFRESH_TOKEN_SECRET: string;
    REFRESH_TOKEN_EXPIRY: string;
  };
}>();

app.post("/login", async (c) => {
  const body: UserSigninDTO = await c.req.json();
  const { success } = userSigninZod.safeParse(body);

  if (!success) {
    return c.json({
      statusCode: 411,
      message: "Inputs not correct",
    });
  }
  const { username, password } = body;

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!user) {
    return c.json(
      {
        statusCode: 411,
        messsage: "User does not exist!",
      },
      411
    );
  }

  if (!(password === user?.password)) {
    return c.json(
      {
        statusCode: 401,
        message: "Password do not match",
      },
      401
    );
  }

  let refreshToken = user?.refreshToken;

  if (refreshToken) {
    const isExpired = await verify(refreshToken, c.env.REFRESH_TOKEN_SECRET);
    if (isExpired) {
      refreshToken = await sign(
        {
          userID: user?.id,
          username: user?.username,
        },
        c.env.ACCESS_TOKEN_SECRET
      );

      try {
        await prisma?.user?.update({
          where: {
            id: user?.id,
          },
          data: {
            refreshToken,
          },
        });
      } catch (error) {
        console.log("Error while updating refresh token in login api.");
      }
    }
  } else {
    refreshToken = await sign(
      {
        userID: user?.id,
        username,
      },
      c.env.REFRESH_TOKEN_SECRET
    );

    try {
      await prisma?.user?.update({
        where: {
          id: user?.id,
        },
        data: {
          refreshToken,
        },
      });
    } catch (error) {
      console.log("Error while updating refresh token in login api.");
    }
  }

  const response = {
    username: user?.username,
    userID: user?.id,
    accessToken: await sign(
      {
        userID: user?.id,
        username,
      },
      c.env.ACCESS_TOKEN_SECRET
    ),
    refreshToken,
  };

  return c.json(
    {
      statusCode: 200,
      message: "Logged in",
      data: response,
    },
    200
  );
});

app.post("/signup", async (c) => {
  const body: UserSingupDTO = await c.req.json();

  const { success } = userSignupZod.safeParse(body);

  if (!success) {
    return c.json({
      statusCode: 411,
      message: "Wrong Inputs",
    });
  }

  const { name, username, password } = body;

  if ([username, password].some((item) => !item)) {
    return c.json(
      {
        statusCode: 411,
        message: "Please enter complete details.",
      },
      411
    );
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userExists = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (userExists) {
    return c.json({
      statusCode: 400,
      message: "User already exists",
    });
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
      password,
    },
  });

  if (!user) {
    return c.json(
      {
        statusCode: 500,
        message: "Please try after sometime.",
      },
      500
    );
  }

  const response = {
    username: user?.username,
    accessToken: await sign(
      {
        userID: user?.id,
        username,
      },
      c.env.ACCESS_TOKEN_SECRET
    ),
    refreshToken: await sign(
      {
        userID: user?.id,
        username,
      },
      c.env.REFRESH_TOKEN_SECRET
    ),
  };

  return c.json(
    {
      statusCode: 200,
      message: "User successfully created.",
      data: response,
    },
    200
  );
});

export default app;
