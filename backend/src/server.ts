import fastify from 'fastify'
import { env } from '../env'
import { mealsRoutes } from './routes/meals'
import { usersRoutes } from './routes/users'

const app = fastify()

const { PORT } = env // 3333

app.register(usersRoutes, {
  prefix: 'users'
})

app.register(mealsRoutes, {
  prefix: 'meals'
})


app
  .listen({
    port: PORT
  }).then(() => {
    console.log("🔌 HTTP Server Running!")
  })
