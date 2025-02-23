import fastify from 'fastify'
import { knexDb } from './database'

const app = fastify()

const PORT = 3333

app.get("/hello", async () => {
  const tables = await knexDb("sqlite_schema").select("*")
  return tables
})

app
  .listen({
    port: PORT
  }).then(() => {
    console.log("🔌 HTTP Server Running!")
  })
