import type { FastifyInstance } from 'fastify'
import { accountMiddlewares } from '../middlewares/account-middlewares'
import { userAccountSchema } from '../schemas/account-schema'
import { getAllTheAccounts } from '../services/account-services'
import { authenticateUser } from '../utils/auth/authenticate-user'
import { AccountRules } from '../utils/rules'

const { ensureAuthenticaded, checkPermissions } = accountMiddlewares

export async function accountsRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [
        ensureAuthenticaded,
        checkPermissions([AccountRules.ACCOUNT_READ_OTHERS]),
      ],
    },
    async (_, res) => {
      try {
        const accounts = await getAllTheAccounts()

        return res.status(200).send(accounts)
      } catch (error) {
        console.error(
          'An error ocurred while trying to GET the accounts. See the error: ',
          error,
        )
        throw new Error('An error ocurred while trying to GET the accounts.')
      }
    },
  )

  app.post('/login', async (req, res) => {
    try {
      const { email, password } = userAccountSchema.parse(req.body)

      const token = await authenticateUser(email, password)

      return res.code(200).send({ message: 'Ok!', token })
    } catch (error) {
      console.error(
        'An error ocurred while trying to login the account. See the error: ',
        error,
      )
      throw new Error('An error ocurred while trying to login the account.')
    }
  })
}
