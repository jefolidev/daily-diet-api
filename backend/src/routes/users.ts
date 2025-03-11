import type { FastifyInstance } from "fastify"
import { accountMiddlewares } from "../middlewares/account-middlewares"
import { userAccountSchema } from "../schemas/account-schema"
import { userSchema } from "../schemas/users-schema"
import { createNewAccount, findAccountIdByEmail } from "../services/account-services"
import { createNewUser, getAllTheUsers, getMealsFromUserById, removeUserById } from "../services/user-services"

const { checkIfEmailExists, ensureAuthenticaded } = accountMiddlewares

export async function usersRoutes(app: FastifyInstance) {

  app.get("/", async (_, res) => {
    try {
      const users = await getAllTheUsers()

      return res.status(200).send(users)

    } catch (error) {
      console.error("An error ocurred while trying to GET a user. See the error: ", error)
      throw new Error("An error ocurred while trying to GET a user.")
    }
  }),

    app.get("/meals", { preHandler: ensureAuthenticaded }, async (req, res) => {
      try {
        const accountId = req.user?.id

        if (!accountId) {
          throw new Error("User not exist! Insert a valid id.")
        }

        const users = await getMealsFromUserById(accountId)

        return res.status(200).send(users)

      } catch (error) {
        console.error("An error ocurred while trying to GET a user. See the error: ", error)
        throw new Error("An error ocurred while trying to GET a user.")
      }
    })

  app.post('/', { preHandler: checkIfEmailExists }, async (req, res) => {
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
  }),

    app.delete('/:id', { preHandler: ensureAuthenticaded }, async (req, res) => {
      try {
        const { id } = req.params as { id: string }
        // const { id } = params as { id: string }

        if (!id) {
          return res.status(400).send("User ID is required")
        }

        await removeUserById(id)
        return res.status(200).send(`Meal with id ${id} deleted successfully `)

      } catch (error) {
        console.error("An error ocurred while trying to DELETE the current user. See the error: ", error)
        throw new Error("An error ocurred while trying to DELETE the current user.")
      }

    })

}