import { z } from "zod";

export const userSigninZod = z.object({
  username: z.string(),
  password: z.string().min(5),
});

export const userSignupZod = z.object({
  name: z.string().optional(),
  username: z.string().min(1),
  password: z.string().min(5),
});

export type UserSigninDTO = z.infer<typeof userSigninZod>;
export type UserSingupDTO = z.infer<typeof userSignupZod>;
