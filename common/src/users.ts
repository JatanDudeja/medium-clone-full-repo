import { z } from "zod";

export const userSigninZod = z.object({
  username: z.string().nonempty(),
  password: z.string().min(5).nonempty({ message: "Password cannot be empty" }),
});

export const userSignupZod = z.object({
  name: z.string().optional(),
  username: z.string().nonempty().min(1),
  password: z.string().min(5).nonempty({ message: "Password cannot be empty" }),
});

export type userSigninDTO = z.infer<typeof userSigninZod>;
export type userSingupDTO = z.infer<typeof userSignupZod>;
