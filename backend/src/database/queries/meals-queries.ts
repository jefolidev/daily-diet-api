import { knexDb } from "../../database";
import type { MealType } from "../../schemas/meals-schema";

export async function selectAllMeals(): Promise<MealType[]> {
  const query = await knexDb('meals').select("*")

  return query
}

export async function insertMealIntoDB(mealData: MealType, userId: string) {
  const newMeal = { ...mealData, id: crypto.randomUUID(), user_id: userId }

  const query = await knexDb('meals').insert(newMeal).returning("*")

  return query
}