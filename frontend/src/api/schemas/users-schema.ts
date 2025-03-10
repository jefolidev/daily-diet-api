import { z } from "zod";

export const usersSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  birth: z.string(),
  age: z.number().optional(),
  gender: z.enum(["man", "woman"]),
  weight: z.number(),
  height: z.number(),
  imc: z.number().optional(),
})

export type UserType = z.infer<typeof usersSchema>