import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid().optional(),
  account_id: z.string().uuid().optional(),
  name: z.string(),
  birth: z.string(),
  age: z.number(),
  gender: z.enum(["man", "woman"]),
  weight: z.number(),
  height: z.number(),
  imc: z.number().optional(),
  created_at: z.date().default(new Date())
})

export type UserType = z.infer<typeof userSchema>