import type { FastifyInstance } from 'fastify'
import { sign } from 'jsonwebtoken'
import { authConfig } from '../configs/auth'
import { accountMiddlewares } from '../middlewares/account-middlewares'
import { userAccountSchema } from '../schemas/account-schema'
import {
  findAccountIdByEmail,
  getAllTheAccounts,
} from '../services/account-services'
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
      const { body } = req
      const accountParsed = userAccountSchema.parse(body)

      const { email, password } = accountParsed

      const id = await findAccountIdByEmail(email)

      const accounts = await getAllTheAccounts()
      const account = accounts.find((account) => account.email === email)

      console.log('CONTA LOGADA: ', account)

      const hasSameEmail = accounts.some((account) => account.email === email)
      const hasSamePassword = accounts.some(
        (account) => account.password === password,
      )

      if (!hasSameEmail || !hasSamePassword) {
        return res.code(401).send({ message: 'Incorrect email or password' })
      }

      const userRole = account?.role

      if (!userRole) {
        console.log('Cargo não registrado!')
        return res.send(401).send('Cargo não registrado!')
      }

      const { secret, expiresIn } = authConfig.jwt

      const token = sign({ sub: String(id), role: userRole }, secret, {
        expiresIn,
      })

      console.log()

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
