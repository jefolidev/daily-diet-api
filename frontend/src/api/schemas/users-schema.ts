import { z } from "zod";

export const usersSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  birth: z.date().default(new Date()),
  age: z.number(),
  gender: z.enum(["man", "woman"]),
  weight: z.number(),
  height: z.number(),
  imc: z.number().optional(),
  created_at: z.date().default(new Date())
})

export type UserType = z.infer<typeof usersSchema>