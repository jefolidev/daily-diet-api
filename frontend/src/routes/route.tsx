import { Route, Routes } from "react-router";
import { LoginPage } from "../pages/auth/login";
import { SignInPage } from "../pages/auth/signin";
import { MealsMain } from "../pages/meals";

export function Router() {
  return (
    <Routes>
      <Route path="/meals" element={<MealsMain />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signin" element={<SignInPage />} />
    </Routes>
  )
}