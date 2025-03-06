import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import type { MealType } from "../api/schemas/meals-schema";
import { mealsServices } from "../api/services/meals-services";

interface MealsContextType {
  meals: MealType[]
}

export const MealsContext = createContext({} as MealsContextType)

export function MealsProvider({ children }: { children: React.ReactNode }) {
  const [meals, setMeals] = useState<MealType[]>([])

  const { getMeals } = mealsServices

  const { data: getMealsFn } = useQuery({
    queryKey: ["meals"],
    queryFn: getMeals
  })

  useEffect(() => {
    if (getMealsFn && getMealsFn.length > 0) {
      // setMeals(getMealsFn.map((meal: MealType) => ({
      //   ...meal, is_on_diet: Boolean(meal.is_on_diet)
      // })));

      setMeals(getMealsFn)
    }
    console.log("Dados recebidos:", getMealsFn);
  }, [getMealsFn])


  return (
    <MealsContext.Provider value={{ meals }}>{children}</MealsContext.Provider>
  )

}