import { useContext } from 'react'
import { UsersContext } from '../contexts/users-context-'

export function useUsers() {
  return useContext(UsersContext)
}
