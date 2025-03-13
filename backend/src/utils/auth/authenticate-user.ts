import { sign } from 'jsonwebtoken'
import { authConfig } from '../../configs/auth'
import { findAccountByEmail } from '../../services/account-services'

export async function authenticateUser(email: string, password: string) {
  const account = await findAccountByEmail(email)

  if (!account || account.password !== password) {
    throw new Error('Incorrect email or password')
  }

  if (!account.role) {
    throw new Error('User role not registered')
  }

  const { expiresIn, secret } = authConfig.jwt

  return sign({ sub: String(account.id), role: account.role }, secret, {
    expiresIn,
  })
}
