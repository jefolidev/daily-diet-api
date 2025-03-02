import { insertMealIntoDB, selectAllMeals } from "../database/queries/meals-queries";
import type { MealType } from "../schemas/meals-schema";

export async function getAllTheMeals() {
  try {
    return await selectAllMeals()
  } catch (error) {
    console.error("An error occurred while trying to get the meals. See the error below: ", error)
    throw new Error("An error occurred while trying to get the meals.")
  }
}

export async function createNewMeal(mealData: MealType, userId: string) {
  try {
    if (!userId) {
      console.error("No user finded, please, fix the user id and try again!")
      throw new Error("No user finded, please, fix the user id and try again!")
    }

    return await insertMealIntoDB(mealData, userId)

  } catch (error) {
    console.error("An error occurred while trying to create a meal. See the error below: ", error)
    throw new Error("An error occurred while trying to create a meal. ")
  }
}