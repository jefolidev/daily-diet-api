import { api } from "../axios"
import type { NewMeal } from "../schemas/meals-schema"

export const mealsServices = {
  getMeals: async () => {
    try {
      const response = await api.get('/meals')
      const { data } = response

      return data

    } catch (error) {
      console.error("Houve um erro ao listar as refeições: " + error)
      throw new Error("A error has excepted at GET the meals: " + error)
    }
  },

  createNewMeal: async (newMeal: NewMeal) => {
    try {
      const mealData = { ...newMeal, user_id: "b5757d1d-7bb7-4e8e-8cb0-a94cb04ebcd8" }
      const response = await api.post('/meals', mealData)

      console.log("Resposta AXIOS" + response)

      const { data } = response

      if (!data) {
        console.log("Nenhum dado recebido!")
      }

      console.log("Resposta atraves do AXIOS: " + JSON.stringify(data))


      return data
    } catch (error) {
      console.error("Houve um erro ao criar uma nova refeição: " + error)
      throw new Error("A error has excepted at POST a new meal: " + error)
    }

  }
}