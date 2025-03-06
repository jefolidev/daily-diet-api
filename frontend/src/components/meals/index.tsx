import { useMeals } from "../../hooks/use-meals";
import { MealItem } from "./components/meal-item";

export function MealsIndex() {
  const { meals } = useMeals()

  console.log(meals)
  return (
    <div className="px-6 flex flex-col gap-4">
      <h1 className="font-bold text-xl">12.08.22</h1>

      {meals.map(meal => {
        return (
          <code>{meal.name}</code>
        )
      })}

      <div className="flex flex-col gap-4">
        <MealItem isOnDiet={false} />
        <MealItem isOnDiet={false} />
        <MealItem isOnDiet={false} />
        <MealItem isOnDiet={false} />
      </div>
    </div>
  )
}