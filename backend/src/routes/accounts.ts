import type { FastifyInstance } from 'fastify'
import { env } from '../../env'
import { selectAccountById } from '../database/queries/accounts-queries'
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
    async (req, res) => {
      try {
        const accounts = await getAllTheAccounts()

        const token = req.cookies.token
        console.log(token)
        return res.status(200).send(accounts)
      } catch (error) {
        console.error(
          'An error ocurred while trying to GET the accounts. See the error: authUser',
          error,
        )
        throw new Error('An error ocurred while trying to GET the accounts.')
      }
    },
  )

  app.get('/me', { preHandler: ensureAuthenticaded }, async (req, res) => {
    try {
      if (!req.user?.id) {
        throw new Error('User id not found')
      }

      const user = await selectAccountById(req.user?.id)

      return res.send({
        id: user.id,
        email: user.email,
        role: user.role,
      })
    } catch (error) {
      return res.code(500).send({ message: 'Error fetching user data' })
    }
  })

  app.post('/login', async (req, res) => {
    try {
      const { email, password } = userAccountSchema.parse(req.body)

      const token = await authenticateUser(email, password)

      res.setCookie('token', token, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24,
      })

      return res.code(200).send({ message: 'Login successful!', token })
    } catch (error) {
      console.error(
        'An error ocurred while trying to login the account. See the error: ',
        error,
      )
      throw new Error('An error ocurred while trying to login the account.')
    }
  })

  app.post('/logout', async (req, res) => {
    try {
      res.clearCookie('token', {
        path: '/',
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
      })

      return res.code(200).send({ message: 'Logged out successfully' })
    } catch (error) {
      return res.code(500).send({ message: 'Error while logging out' })
    }
  })
}
