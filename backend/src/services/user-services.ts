import { deleteUserById, insertUserIntoDB, selectAllUsers, selectMealsFromUserById } from "../database/queries/users-queries";
import type { UserType } from "../schemas/users-schema";

export async function getAllTheUsers() {
  try {
    return await selectAllUsers()
  } catch (error) {
    console.error("An error occurred while trying to get the users. See the error below: ", error)
    throw new Error("An error occurred while trying to get the users.")
  }
}

export async function getMealsFromUserById(accountId: string) {
  try {
    return await selectMealsFromUserById(accountId)
  } catch (error) {
    console.error("An error occurred while trying to get the meals from the current user. See the error below: ", error)
    throw new Error("An error occurred while trying to get the meals from the current user. ")
  }
}

export async function createNewUser(userData: UserType, accountId: string) {
  try {
    return await insertUserIntoDB(userData, accountId)
  } catch (error) {
    console.error("An error occurred while trying to create a user. See the error below: ", error)
    throw new Error("An error occurred while trying to create a user. ")
  }
}

export async function removeUserById(userId: string) {
  try {
    if (!userId) {
      throw new Error("No user finded, please, fix the user id and try again!")
    }

    return await deleteUserById(userId)

  } catch (error) {
    console.error("An error occurred while trying to remove a user. See the error below: ", error)
    throw new Error("An error occurred while trying to remove a user. ")
  }
}