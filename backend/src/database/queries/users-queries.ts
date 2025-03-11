import { knexDb } from "../../database";
import type { MealType } from "../../schemas/meals-schema";
import type { UserType } from "../../schemas/users-schema";


export async function selectAllUsers() {
  const queryData = await knexDb('users').select("*")

  return queryData
}

export async function selectMealsFromUserById(accountId: string): Promise<MealType[]> {
  const user = await knexDb("users").select("account_id").where({ account_id: accountId }).first()
  console.log("USUARIO ID = ", user)
  const mealsFromUser = await knexDb("meals").select("*").where({ user_id: user.account_id })

  console.log("ID DO USUARIO" + JSON.stringify(mealsFromUser, null, 2))

  return mealsFromUser
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