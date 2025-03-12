import { useQuery } from '@tanstack/react-query'
import { createContext, useEffect, useState } from 'react'
import type { UserAccount } from '../api/schemas/account-schema'
import type { UserType } from '../api/schemas/users-schema'
import { accountsServices } from '../api/services/accounts-services'
import { usersServices } from '../api/services/users-services'

interface UsersContextType {
  accounts: UserAccount[]
  users: UserType[]
}

export const UsersContext = createContext({} as UsersContextType)

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<UserType[]>([])
  const [accounts, setAccounts] = useState<UserAccount[]>([])

  const { getUsers } = usersServices
  const { getAccounts } = accountsServices

  const { data: getAccountsFn } = useQuery({
    queryKey: ['accounts'],
    queryFn: getAccounts,
  })

  const { data: getUsersFn } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  useEffect(() => {
    if (getUsersFn) {
      setUsers(getUsersFn)
    }

    if (getAccountsFn) {
      setAccounts(getAccountsFn)
    }
  }, [getAccountsFn, getUsersFn])

  return (
    <UsersContext.Provider value={{ users, accounts }}>
      {children}
    </UsersContext.Provider>
  )
}
