import { Route, Routes } from 'react-router'
import { PrivateRoute } from '../layouts/private-route'
import { LoginPage } from '../pages/auth/login'
import { SignInPage } from '../pages/auth/signin'
import { MealsMain } from '../pages/meals'

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/meals" element={<MealsMain />} />
      </Route>
      <Route path="/signin" element={<SignInPage />} />
    </Routes>
  )
}
