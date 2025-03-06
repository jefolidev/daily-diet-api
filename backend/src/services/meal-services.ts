import { deleteMealById, insertMealIntoDB, selectAllMeals } from "../database/queries/meals-queries";
import type { MealType } from "../schemas/meals-schema";

export async function getAllTheMeals() {
  try {
    const querie = await selectAllMeals()
    console.log("retorno do GET " + querie)

    return querie
  } catch (error) {
    console.error("An error occurred while trying to get the meals. See the error below: ", error)
    throw new Error("An error occurred while trying to get the meals.")
  }
}

export async function createNewMeal(mealData: MealType, mealId: string) {
  try {
    if (!mealId) {
      console.error("No user finded, please, fix the user id and try again!")
      throw new Error("No user finded, please, fix the user id and try again!")
    }

    return await insertMealIntoDB(mealData, mealId)

  } catch (error) {
    console.error("An error occurred while trying to create a meal. See the error below: ", error)
    throw new Error("An error occurred while trying to create a meal. ")
  }
}

export async function removeMealById(mealId: string) {
  try {
    if (!mealId) {
      throw new Error("No user finded, please, fix the user id and try again!")
    }

    return await deleteMealById(mealId)

  } catch (error) {
    console.error("An error occurred while trying to remove a meal. See the error below: ", error)
    throw new Error("An error occurred while trying to remove a meal. ")
  }
}