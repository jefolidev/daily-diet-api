import { api } from "../axios"

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
  }
}