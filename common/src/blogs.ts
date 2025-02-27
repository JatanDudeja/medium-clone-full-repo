import { z } from "zod";

export const createPostZod = z.object({
  description: z.string().min(10).nonempty(),
  title: z.string().min(2).nonempty(),
});

export type CreatePostDTO = z.infer<typeof createPostZod>;
