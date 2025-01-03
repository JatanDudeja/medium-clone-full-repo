import { Hono } from "hono";
import userRouter from "./routes/user.route";
import blogRouter from "./routes/blog.route";
import { decode, sign, verify } from "hono/jwt";

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

app.get("/", (c) => {
  return c.text("Hello World!");
});

app.route("/api/v1/user", userRouter);

app.use("/*", async (c, next) => {
  const accessToken = (c.req.header("Authorization") || "")?.replace(
    "Bearer ",
    ""
  );
  console.log(">>>here: ", accessToken);

  if (!accessToken) {
    return c.json({
      statusCode: 401,
      message: "Unauthorized access",
    });
  }

  try {
    const isAccessTokenValid = await verify(
      accessToken,
      c.env.ACCESS_TOKEN_SECRET
    );

    if (!isAccessTokenValid) {
      return c.json({
        statusCode: 401,
        message: "Unauthorized Access",
      });
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
    return c.json({
      statusCode: 401,
      message: "Invalid or expired token",
    });
  }
});

app.route("/api/v1/blog", blogRouter);

export default app;
