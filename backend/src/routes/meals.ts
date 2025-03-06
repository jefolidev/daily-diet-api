import type { FastifyInstance } from "fastify";
import { mealsSchema } from "../schemas/meals-schema";
import { createNewMeal, getAllTheMeals, removeMealById } from "../services/meal-services";

export async function mealsRoutes(app: FastifyInstance) {
  app.get('/', async (_, res) => {
    try {
      const meals = await getAllTheMeals()

      const formattedMeals = meals.map(meal => ({
        ...meal, is_on_diet: Boolean(meal.is_on_diet)
      }))

      return res.status(201).send(formattedMeals)
    } catch (error) {
      console.error("An error ocurred while trying to GET a new user. See the error: ", error)
      throw new Error("An error ocurred while trying to GET a new user.")
    }
  })

  app.post('/', async (req, res) => {
    try {
      const { body } = req
      const mealData = mealsSchema.parse(body)

      const meal = await createNewMeal(mealData, mealData.user_id)

      const newMeal = meal.map(mealItem => {
        return { ...mealItem, is_on_diet: mealData.is_on_diet }
      })

      return res.status(201).send(newMeal)

    } catch (error) {
      console.error("An error ocurred while trying to POST a new meal. See the error: ", error)
      throw new Error("An error ocurred while trying to POST a new meal.")

    }
  })

  app.delete('/:id', async (req, res) => {

    try {
      const { id } = req.params as { id: string }
      // const { id } = params as { id: string }

      if (!id) {
        return res.status(400).send("Meal ID is required")
      }

      await removeMealById(id)
      return res.status(200).send(`Meal with id ${id} deleted successfully `)

    } catch (error) {
      console.error("An error ocurred while trying to DELETE the current meal. See the error: ", error)
      throw new Error("An error ocurred while trying to DELETE the current meal.")
    }

  })
}