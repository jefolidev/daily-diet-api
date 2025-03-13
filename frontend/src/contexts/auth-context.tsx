import { useMutation, useQuery } from '@tanstack/react-query'
import { createContext, useEffect, useState } from 'react'
import { api } from '../api/axios'
import { accountsServices } from '../api/services/accounts-services'
import { queryClient } from '../lib/react-query'

interface User {
  id: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  logout: () => void
  login: (email: string, password: string) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const { postLogin, postLogout } = accountsServices

  const { data: logedUserData, isFetching } = useQuery({
    retry: false,
    queryKey: ['authUser'],
    queryFn: async () => {
      const response = await api.get('/me', { withCredentials: true })
      return response.data
    },
  })

  useEffect(() => {
    if (logedUserData) {
      setUser(logedUserData)
    }
  }, [logedUserData])

  const { mutateAsync: loginFn } = useMutation({
    mutationFn: postLogin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['authUser'] })
    },
  })

  async function login(email: string, password: string) {
    await loginFn({ email, password })
  }

  async function logout() {
    await postLogout()
    setUser(null)
    queryClient.removeQueries({ queryKey: ['authUser'] })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {!isFetching && children}
    </AuthContext.Provider>
  )
}
