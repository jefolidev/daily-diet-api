import type { FastifyInstance } from "fastify"
import { userSchema } from "../schemas/users-schema"
import { createNewUser, getAllTheUsers } from "../services/user-services"

export async function usersRoutes(app: FastifyInstance) {
  app.get("/", async (_, res) => {
    try {
      const users = await getAllTheUsers()

      return res.status(200).send(users)

    } catch (error) {
      console.error("An error ocurred while trying to GET a new user. See the error: ", error)
      throw new Error("An error ocurred while trying to GET a new user.")
    }
  })

  app.post('/', async (req, res) => {
    try {
      const { body } = req
      const userData = userSchema.parse(body)

      const newUser = await createNewUser(userData)

      return res.status(201).send(newUser)
    } catch (error) {
      console.error("An error ocurred while trying to POST a new user. See the error: ", error)
      throw new Error("An error ocurred while trying to POST a new user.")
    }
  })

}