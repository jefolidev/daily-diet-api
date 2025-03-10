import { api } from "../axios";
import type { UserType } from "../schemas/users-schema";

export const usersServices = {
  getUsers: async (): Promise<UserType[]> => {
    try {
      const response = await api.get('/users')
      const { data } = response

      return data
    } catch (error) {

      console.error("Houve um erro ao listar os usuários: " + error)
      throw new Error("A error has excepted at GET the users: " + error)

    }
  },

  createNewUser: async (userData: UserType) => {
    try {
      console.log("valor recebido pelo axios: " + JSON.stringify(userData, null, 2))
      const response = await api.post("/users", userData)

      const { data } = response

      return data
    } catch (error) {

      console.error("Erro ao criar novo usuário: ", error)
      throw new Error("A error ocurred at POST a new user: " + error)

    }
  }


}