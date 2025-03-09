import type { FastifyInstance } from "fastify"
import { getAllTheAccounts } from "../services/account-services"


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
}