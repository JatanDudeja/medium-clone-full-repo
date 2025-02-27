import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { CreatePostDTO, createPostZod } from "@jatan_dudeja/medium-clone";

export type UpdateBlogDTO = {
  title?: string;
  description?: string;
};

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

app.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body: CreatePostDTO = await c.req.json();

  const { success } = createPostZod.safeParse(body);

  if (!success) {
    return c.json(
      {
        statusCode: 411,
        message: "Wrong Inputs",
      },
      411
    );
  }

  const { description, title } = body;

  if ([description, title].some((item) => !item)) {
    return c.json(
      {
        statusCode: 411,
        message: "Please write both title and descprtion to publish this blog",
      },
      411
    );
  }

  const authorID = c.get("userID");

  if (!authorID) {
    return c.json(
      {
        statusCode: 401,
        message: "Unauthorized Access",
      },
      401
    );
  }

  let createPost;
  try {
    createPost = await prisma?.blog?.create({
      data: {
        title,
        description,
        authorID: authorID,
      },
    });
  } catch (error) {
    return c.json(
      {
        statusCode: 500,
        message: "Something went wrong while publishing the blog",
      },
      500
    );
  }

  return c.json(
    {
      statusCode: 201,
      message: "Blog published successfully.",
      data: {
        id: createPost?.id,
      },
    },
    201
  );
});

app.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  let allBlogs;
  try {
    allBlogs = await prisma.blog.findMany({
      select: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
        title: true,
        description: true,
        createdAt: true,
        id: true,
      },
    });
  } catch (error) {
    return c.json(
      {
        statusCode: 500,
        message: "Something went wrong",
      },
      500
    );
  }

  // Rename authorID to userID
  const transformedBlogs = allBlogs.map((blog) => ({
    userID: blog.author?.id,
    authorUsername: blog.author?.username?.split("@")[0],
    title: blog.title,
    description: blog.description,
    createdAt: blog.createdAt,
    id: blog.id,
  }));

  return c.json(
    {
      statusCode: 200,
      message: "All blogs fetched",
      data: transformedBlogs,
    },
    200
  );
});

app.get("/:blogID", async (c) => {
  const { blogID } = c.req.param();

  if (!blogID) {
    return c.json(
      {
        statusCode: 411,
        message: "No blog found for the given id",
      },
      411
    );
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.findFirst({
    where: {
      id: Number(blogID),
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
          username: true,
        },
      },
    },
  });

  return c.json(
    {
      statusCode: 200,
      message: "Blog post fetched successfully",
      data: {
        id: blog?.id,
        title: blog?.title,
        userID: blog?.author?.id,
        description: blog?.description,
        authorName: blog?.author?.username?.split("@")[0],
        createdAt: blog?.createdAt,
      },
    },
    200
  );
});

app.put("/:id", async (c) => {
  const { id } = c.req.param();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  if (!id) {
    c.json(
      {
        statusCode: 411,
        message: "No post exists with that id.",
      },
      411
    );
  }

  const { title, description } = await c.req.json();

  if (!title || !description) {
    return c.json(
      {
        statusCode: 411,
        message: "Found nothing that needs to be updated",
      },
      411
    );
  }

  const dataToUpdate: UpdateBlogDTO = {};

  if (title) {
    dataToUpdate["title"] = title;
  }

  if (description) {
    dataToUpdate["description"] = description;
  }

  let updatedPost;

  try {
    updatedPost = await prisma.blog.update({
      where: {
        id: Number(id),
      },
      data: dataToUpdate,
      select: {
        authorID: true,
        title: true,
        description: true,
        createdAt: true,
        id: true,
      },
    });
  } catch (error) {
    return c.json(
      {
        statusCode: 500,
        message: "Something went wrong while editing the post",
      },
      500
    );
  }

  return c.json(
    {
      statusCode: 200,
      message: "Post edited successfully",
      data: updatedPost,
    },
    200
  );
});

app.get("/user/:userID", async (c) => {
  const { userID } = c.req.param();

  if (!userID) {
    return c.json(
      {
        statusCode: 411,
        message: "No blog found for the given id",
      },
      411
    );
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const allBlogs = await prisma.blog.findMany({
    where: {
      authorID: Number(userID),
    },
    select: {
      id: true,
      authorID: true,
      title: true,
      description: true,
      createdAt: true,
    },
  });

  const transformedBlogs = allBlogs.map((blog) => ({
    userID: blog.authorID,
    title: blog.title,
    description: blog.description,
    createdAt: blog.createdAt,
    id: blog.id,
  }));

  return c.json(
    {
      statusCode: 200,
      message: "Blogs fetched for the user",
      data: transformedBlogs,
    },
    200
  );
});

export default app;
