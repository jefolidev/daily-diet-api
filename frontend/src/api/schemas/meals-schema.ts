import { z } from 'zod'

export const mealsSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  time: z.string(),
  is_on_diet: z.number(),
  user_id: z.string().uuid(),
  created_at: z.date().default(new Date()),
})

export type MealType = z.infer<typeof mealsSchema>

export const newMealSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  date: z.coerce.date(),
  time: z.string(),
  is_on_diet: z.coerce.number(),
})

export type NewMeal = z.infer<typeof newMealSchema>
