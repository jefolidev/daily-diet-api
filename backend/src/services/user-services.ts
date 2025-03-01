import { insertUserIntoDB, selectAllUsers } from "../database/queries/users-queries";
import type { UserType } from "../schemas/users-schema";

export async function getAllTheUsers() {
  try {
    return await selectAllUsers()
  } catch (error) {
    console.error("An error occurred while trying to get the users. See the error below: ", error)
    throw new Error("An error occurred while trying to get the users.")
  }
}

export async function createNewUser(userData: UserType) {
  try {
    return await insertUserIntoDB(userData)
  } catch (error) {
    console.error("An error occurred while trying to create a user. See the error below: ", error)
    throw new Error("An error occurred while trying to create a user. ")
  }
}