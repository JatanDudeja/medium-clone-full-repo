import { Hono } from "hono";
import userRouter from "./routes/user.route";
import blogRouter from "./routes/blog.route";
import { decode, verify } from "hono/jwt";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    ACCESS_TOKEN_SECRET: string;
    ACCESS_TOKEN_EXPIRY: string;
    REFRESH_TOKEN_SECRET: string;
    REFRESH_TOKEN_EXPIRY: string;
  };
  Variables: {
    userID: number;
  };
}>();

app.use(
  "/*",
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (c) => {
  return c.text("Hello World!");
});

app.route("/api/v1/user", userRouter);

app.use("/*", async (c, next) => {
  const accessToken = (c.req.header("Authorization") || "")?.replace(
    "Bearer ",
    ""
  );

  if (!accessToken) {
    return c.json(
      {
        statusCode: 401,
        message: "Unauthorized access",
      },
      401
    );
  }

  try {
    const isAccessTokenValid = await verify(
      accessToken,
      c.env.ACCESS_TOKEN_SECRET
    );

    if (!isAccessTokenValid) {
      return c.json(
        {
          statusCode: 401,
          message: "Unauthorized Access",
        },
        401
      );
    }

    const decodedToken = decode(accessToken);
    const userID = decodedToken?.payload?.userID;
    console.log(
      ">>>decodedToken: ",
      decodedToken?.header,
      decodedToken?.payload
    );

    c.set("userID", Number(userID));
    return next();
  } catch (err) {
    return c.json(
      {
        statusCode: 401,
        message: "Invalid or expired token",
      },
      401
    );
  }
});

app.route("/api/v1/blog", blogRouter);

export default app;
