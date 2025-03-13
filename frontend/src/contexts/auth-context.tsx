import { useQuery } from '@tanstack/react-query'
import { createContext, useEffect, useState } from 'react'

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
  const [user, setUser] = useState<User | null>()
  const isAuthenticated = !user

  const { data, isFetching } = useQuery({
    queryKey: ['login'],
  })

  useEffect(() => {
    async function checkUserSession() {
      const response
    }
  }, [])
}
