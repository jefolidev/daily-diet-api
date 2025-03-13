import { env } from '../../env'

export const authConfig = {
  jwt: {
    secret: env.JWT_SECRET || 'W7LLfswvHvw5aZEzA7LSu',
    expiresIn: 86400,
  },
}
