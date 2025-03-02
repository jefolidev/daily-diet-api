import { z } from "zod";

export const mealsSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  time: z.string(),
  is_on_diet: z.boolean(),
  user_id: z.string().uuid(),
  created_at: z.date().default(new Date())
})

export type MealType = z.infer<typeof mealsSchema>