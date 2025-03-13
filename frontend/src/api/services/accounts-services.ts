import { api } from '../axios'

export const accountsServices = {
  getAccounts: async () => {
    try {
      const response = await api.get('/accounts')
      const { data } = response

      return data
    } catch (error) {
      console.error('Houve um erro ao listar as contas: ' + error)
      throw new Error('A error has excepted at GET the accounts: ' + error)
    }
  },

  postLogin: async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    try {
      const credentials = { email, password }

      const response = await api.post('/login', credentials, {
        withCredentials: true,
      })
      const { data } = response

      return data
    } catch (error) {
      console.error('Houve um erro ao listar as contas: ' + error)
      throw new Error('A error has excepted at GET the accounts: ' + error)
    }
  },
}
