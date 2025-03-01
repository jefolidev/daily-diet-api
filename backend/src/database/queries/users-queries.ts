import { knexDb } from "../../database";
import type { UserType } from "../../schemas/users-schema";


export async function selectAllUsers() {
  const queryData = await knexDb('users').select("*")

  return queryData
}

export async function insertUserIntoDB(userData: UserType) {
  const queryData = await knexDb('users').insert(userData).returning("*")

  return queryData
}