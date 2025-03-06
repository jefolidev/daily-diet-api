import { useContext } from "react";
import { MealsContext } from "../contexts/meals-context";

export function useMeals() {
  return useContext(MealsContext)
}