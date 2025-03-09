import { knexDb } from "../../database";
import type { UserAccount } from "../../schemas/account-schema";

export async function selectAllUsersAccounts(): Promise<UserAccount[]> {
  const query: UserAccount[] = await knexDb('accounts').select("*").orderBy("created_at", "desc")

  console.log("Query do banco de dados" + query)

  return query
}

export async function insertAccountIntoDb(accountData: UserAccount) {
  const [account] = await knexDb("accounts").insert({ ...accountData, id: crypto.randomUUID() }).returning("*")

  return account
}

export async function getAccountIdByEmail(email: string): Promise<string | null> {
  const account = await knexDb("accounts").select("id").where({ email }).first()

  return account ? account.id : null
}