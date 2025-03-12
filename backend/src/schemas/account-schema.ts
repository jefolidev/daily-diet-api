import { z } from 'zod'

export const userAccountSchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(['user', 'adm']).default('user'),
})

export type UserAccount = z.infer<typeof userAccountSchema>
