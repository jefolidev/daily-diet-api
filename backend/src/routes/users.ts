import type { FastifyInstance } from "fastify"
import { userAccountSchema } from "../schemas/account-schema"
import { userSchema } from "../schemas/users-schema"
import { createNewAccount, findAccountIdByEmail } from "../services/account-services"
import { createNewUser, getAllTheUsers } from "../services/user-services"

export async function usersRoutes(app: FastifyInstance) {
  app.get("/", async (_, res) => {
    try {
      const users = await getAllTheUsers()

      return res.status(200).send(users)

    } catch (error) {
      console.error("An error ocurred while trying to GET a user. See the error: ", error)
      throw new Error("An error ocurred while trying to GET a user.")
    }
  })

  app.post('/', async (req, res) => {
    try {
      const { body } = req

      const accountData = userAccountSchema.parse(body)
      const userData = userSchema.parse(body)

      let accountId = await findAccountIdByEmail(accountData.email)

      if (!accountId) {
        const newAccount = await createNewAccount(accountData)
        accountId = newAccount.id
      }

      if (!accountId) {
        throw new Error("Failed to create or retrieve account ID.");
      }

      const newUser = await createNewUser(userData, accountId)

      return res.status(201).send(newUser)
    } catch (error) {
      console.error("An error ocurred while trying to POST a new user. See the error: ", error)
      throw new Error("An error ocurred while trying to POST a new user.")
    }
  })

}