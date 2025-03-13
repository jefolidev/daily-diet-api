import cors from '@fastify/cors'
import fastify from 'fastify'
import { env } from '../env'
import { accountsRoutes } from './routes/accounts'
import { mealsRoutes } from './routes/meals'
import { usersRoutes } from './routes/users'

import cookie from '@fastify/cookie'

const app = fastify()

const { PORT } = env // 3333

app.register(cors, {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

app.register(cookie)

app.register(accountsRoutes, {
  prefix: 'accounts',
})

app.register(usersRoutes, {
  prefix: 'users',
})

app.register(mealsRoutes, {
  prefix: 'meals',
})

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log('🔌 HTTP Server Running!')
  })
