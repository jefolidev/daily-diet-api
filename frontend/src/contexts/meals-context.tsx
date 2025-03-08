import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useMemo, useState } from "react";
import type { MealType } from "../api/schemas/meals-schema";
import { mealsServices } from "../api/services/meals-services";

interface MealsContextType {
  meals: MealType[]
  outOfDietMeals: MealType[] | undefined
  inDietMeals: MealType[] | undefined
  bestDietSequence: number
}

export const MealsContext = createContext({} as MealsContextType)

export function MealsProvider({ children }: { children: React.ReactNode }) {
  const [meals, setMeals] = useState<MealType[]>([])

  const outOfDietMeals = meals.filter(meal => Boolean(meal.is_on_diet) === false)
  const inDietMeals = meals.filter(meal => Boolean(meal.is_on_diet) === true)

  const bestDietSequence = useMemo(() => {
    let maxSequence = 0
    let currentSequence = 0

    for (const meal of meals) {
      if (meal.is_on_diet) {
        currentSequence++
        maxSequence = Math.max(maxSequence, currentSequence)
      } else {
        currentSequence = 0
      }
    }

    return maxSequence
  }, [meals])

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
    // console.log("Dados recebidos:", getMealsFn);
  }, [getMealsFn])


  return (
    <MealsContext.Provider value={{ bestDietSequence, meals, outOfDietMeals, inDietMeals }}>{children}</MealsContext.Provider>
  )

}