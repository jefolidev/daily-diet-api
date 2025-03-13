import { knexDb } from '../../database'
import type { UserAccount } from '../../schemas/account-schema'

export async function selectAllUsersAccounts(): Promise<UserAccount[]> {
  const query: UserAccount[] = await knexDb('accounts')
    .select('*')
    .orderBy('created_at', 'desc')

  // console.log('Query do banco de dados' + query)

  return query
}

export async function selectAccountIdByEmail(
  email: string,
): Promise<string | null> {
  const account = await knexDb('accounts').select('id').where({ email }).first()

  return account ? account.id : null
}

export async function selectAccountByEmail(
  email: string,
): Promise<UserAccount> {
  const query = await knexDb('accounts').where({ email }).first()

  console.log(
    'QUERY DE SELECT FIRST MATCHED EMAIL: ' + JSON.stringify(query, null, 2),
  )

  return query
}

export async function selectAccountById(
  accountId: string,
): Promise<UserAccount> {
  const query = await knexDb('accounts').where({ id: accountId }).first()

  return query
}

export async function selectRoleFromUser(accountId: string) {
  const query = await knexDb('accounts').where({ id: accountId }).from('role')
  console.log('query banco de dados de role', query)
  return query || `${accountId} --- ID RECEBIDO `
}

export async function insertAccountIntoDb(accountData: UserAccount) {
  const [account] = await knexDb('accounts')
    .insert({ ...accountData, id: crypto.randomUUID() })
    .returning('*')

  return account
}
