import fastify from 'fastify'
import { env } from '../env'
import { usersRoutes } from './routes/users'

const app = fastify()

const { PORT } = env // 3333

app.register(usersRoutes, {
  prefix: 'users'
})

app
  .listen({
    port: PORT
  }).then(() => {
    console.log("🔌 HTTP Server Running!")
  })
