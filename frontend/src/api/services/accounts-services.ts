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

  login: async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await api.post('/login', { email, password })
      const { data } = response

      return data
    } catch (error) {
      console.error('Houve um erro ao listar as contas: ' + error)
      throw new Error('A error has excepted at GET the accounts: ' + error)
    }
  },
}
