import { z } from "zod";

export const createPostZod = z.object({
  description: z.string().min(10).nonempty(),
  title: z.string().min(2).max(20).nonempty(),
});

export type createPostDTO = z.infer<typeof createPostZod>;