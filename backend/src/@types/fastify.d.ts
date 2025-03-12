import 'fastify'
import type { Role } from '../utils/rules'

declare module 'fastify' {
  export interface FastifyRequest {
    user?: {
      id: string
      role: Role
    }
  }
}