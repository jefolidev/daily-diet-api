import { Navigate } from 'react-router'
import { useAuth } from '../hooks/use-auth'
import { MealsMain } from '../pages/meals'

export function PrivateRoute() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <MealsMain /> : <Navigate to={'/login'} />
}
