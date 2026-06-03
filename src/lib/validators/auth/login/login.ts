import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Invalid email format")
    .trim()
    .toLowerCase(),


  password: z
    .string()
    .min(1, "Password is required") // I intentionally do not use 8 which is what is required to create account in order to give attackers no clue of how many characters is required
})

export type LoginInput = z.infer<typeof loginSchema>;