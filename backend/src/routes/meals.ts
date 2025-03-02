import type { FastifyInstance } from "fastify";
import { mealsSchema } from "../schemas/meals-schema";
import { createNewMeal, getAllTheMeals } from "../services/meal-services";

export async function mealsRoutes(app: FastifyInstance) {
  app.get('/', async (_, res) => {
    try {
      const meals = await getAllTheMeals()

      return res.status(201).send(meals)
    } catch (error) {
      console.error("An error ocurred while trying to GET a new user. See the error: ", error)
      throw new Error("An error ocurred while trying to GET a new user.")
    }
  })

  app.post('/', async (req, res) => {
    try {
      const { body } = req
      const mealData = mealsSchema.parse(body)

      const newMeal = await createNewMeal(mealData, mealData.user_id)

      return res.status(201).send(newMeal)

    } catch (error) {
      console.error("An error ocurred while trying to POST a new meal. See the error: ", error)
      throw new Error("An error ocurred while trying to POST a new meal.")

    }
  })
}