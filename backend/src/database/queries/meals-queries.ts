import { knexDb } from "../../database";
import type { MealType } from "../../schemas/meals-schema";

export async function selectAllMeals(): Promise<MealType[]> {
  const query = await knexDb("meals").select("*")
  // console.log("query de todas as refeições: " + query)

  return query
}

export async function insertMealIntoDB(mealData: MealType, userId: string) {
  const newMeal = { ...mealData, id: crypto.randomUUID(), is_on_diet: Boolean(mealData.is_on_diet), user_id: userId }
  const query = await knexDb("meals").insert(newMeal).returning("*")

  return query
}

export async function deleteMealById(id: string) {
  console.log("refeição recebida no BAnco de dados" + id)
  const query = await knexDb("meals").del().where({ id })
  console.log("linha sendo deletada: " + query)

  return query
}