import { insertAccountIntoDb, selectAccountIdByEmail, selectAllUsersAccounts, selectFirstMatchedEmail, selectRoleFromUser } from "../database/queries/accounts-queries"
import type { UserAccount } from "../schemas/account-schema"

export async function getAllTheAccounts(): Promise<UserAccount[]> {
  try {
    return await selectAllUsersAccounts()

  } catch (error) {
    console.error("An error occurred while trying to get the accounts. See the error below: ", error)
    throw new Error("An error occurred while trying to get the accounts.")
  }
}

export async function getFirstMatchedEmail(email: string) {
  try {
    return await selectFirstMatchedEmail(email)
  } catch (error) {
    console.error("An error occurred while trying to get the emails. See the error below: ", error)
    throw new Error("An error occurred while trying to get the emails. " + error)
  }
}

export async function getRoleFromUser(accountId: string) {
  try {
    console.log("ID DO USUARIO DA ROLE", accountId)
    return await selectRoleFromUser(accountId)
  } catch (error) {
    console.error("An error occurred while trying to get the role of current user. See the error below: ", error)
    throw new Error("An error occurred while trying to get the role of current user. " + error)
  }
}

export async function createNewAccount(accountData: UserAccount) {
  try {

    return await insertAccountIntoDb(accountData)

  } catch (error) {
    console.error("An error occurred while trying to create the account. See the error below: ", error)
    throw new Error("An error occurred while trying to create the account.")
  }
}

export async function findAccountIdByEmail(email: string) {
  try {
    return await selectAccountIdByEmail(email)
  } catch (error) {
    console.error("User email couldn't be finded, please, fix the email and try again! " + error)
    throw new Error("User email couldn't be finded, please, fix the email and try again! ")
  }

}