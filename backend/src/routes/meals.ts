import type { FastifyInstance } from "fastify";
import { accountMiddlewares } from "../middlewares/account-middlewares";
import { mealsSchema } from "../schemas/meals-schema";
import { createNewMeal, getAllTheMeals, removeMealById, updateMealById } from "../services/meal-services";

const { ensureAuthenticaded } = accountMiddlewares

export async function mealsRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: ensureAuthenticaded }, async (req, res) => {
    try {
      const meals = await getAllTheMeals()

      console.log(req.user?.id + " " + req.user?.role)

      const formattedMeals = meals.map(meal => {
        const formattedDate = meal.date.split("T")[0]
        // const formattedDateString = isNaN(formattedDate.getTime()) ? null : formattedDate.toISOString()

        return {
          ...meal,
          is_on_diet: Boolean(meal.is_on_diet),
          date: formattedDate,
          // date: formattedDateString,
        }
      })

      return res.status(201).send(formattedMeals)
    } catch (error) {
      console.error("An error ocurred while trying to GET the meals. See the error: ", error)
      throw new Error("An error ocurred while trying to GET the meals.")
    }
  })

  app.post('/',
    { preHandler: ensureAuthenticaded },
    async (req, res) => {
      try {
        const { body } = req

        const accountId = req.user?.id

        console.log("account id da rota post de comidas " + accountId)

        if (!accountId) {
          return res.code(404).send("User not found")
        }

        const mealData = mealsSchema.omit({ user_id: true }).parse(body)
        const meal = await createNewMeal(mealData, accountId)
        const newMeal = meal.map(mealItem => {
          return { ...mealItem, is_on_diet: mealData.is_on_diet }
        })

        return res.status(201).send({ newMeal })

      } catch (error) {
        console.error("An error ocurred while trying to POST a new meal. See the error: ", error)
        throw new Error("An error ocurred while trying to POST a new meal.")
      }
    })

  app.put('/:id', async (req, res) => {
    try {
      const { body } = req
      const { id } = req.params as {
        id: string
      }

      const mealsSchemaWithouUserId = mealsSchema.omit({ user_id: true })
      const parsedMeal = mealsSchemaWithouUserId.parse(body)

      const updatedMeal = await updateMealById(parsedMeal, id)

      return res.status(201).send(updatedMeal)

    } catch (error) {
      console.error("An error ocurred while trying to PUT a meal. See the error: ", error)
      throw new Error("An error ocurred while trying to PUT a meal.")
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