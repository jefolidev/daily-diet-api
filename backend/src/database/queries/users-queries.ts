import { knexDb } from "../../database";
import type { UserType } from "../../schemas/users-schema";


export async function selectAllUsers() {
  const queryData = await knexDb('users').select("*")

  return queryData
}

export async function insertUserIntoDB(userData: UserType, accountId: string) {
  const newUser: UserType = { ...userData, id: crypto.randomUUID(), account_id: accountId }
  const query = await knexDb('users').insert(newUser).returning("*")

  return query
}


export async function deleteUserById(id: string) {
  // console.log("refeição recebida no BAnco de dados" + id)
  const query = await knexDb("users").del().where({ id })
  // console.log("linha sendo deletada: " + query)

  return query
}