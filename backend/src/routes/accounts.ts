import type { FastifyInstance } from "fastify"
import { sign } from "jsonwebtoken"
import { authConfig } from "../configs/auth"
import { userAccountSchema } from "../schemas/account-schema"
import { findAccountIdByEmail, getAllTheAccounts } from "../services/account-services"


export async function accountsRoutes(app: FastifyInstance) {
  app.get("/", async (_, res) => {
    try {
      const accounts = await getAllTheAccounts()

      return res.status(200).send(accounts)
    } catch (error) {
      console.error("An error ocurred while trying to GET the accounts. See the error: ", error)
      throw new Error("An error ocurred while trying to GET the accounts.")
    }
  })

  app.post("/login", async (req, res) => {
    try {
      const { body } = req
      const accountParsed = userAccountSchema.parse(body)

      const { email, password, role } = accountParsed

      const id = await findAccountIdByEmail(email)

      const accounts = await getAllTheAccounts()


      const hasSameEmail = accounts.find(account => account.email === email)
      const hasSamePassword = accounts.find(account => account.password === password)

      if (!hasSameEmail || !hasSamePassword) {
        return res.code(401).send({ message: "Incorrect email or password" })
      }

      const { secret, expiresIn } = authConfig.jwt

      const token = sign({ role }, secret, {
        expiresIn,
        subject: String(id)
      })

      return res.code(200).send({ message: "Ok!", token })
    } catch (error) {
      console.error("An error ocurred while trying to login the account. See the error: ", error)
      throw new Error("An error ocurred while trying to login the account.")
    }
  })
}