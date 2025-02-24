import { MealItem } from "./components/meal-item";

export function MealsIndex() {
  return (
    <div className="px-6 flex flex-col gap-4">
      <h1 className="font-bold text-xl">12.08.22</h1>

      <div className="flex flex-col gap-4">
        <MealItem isOnDiet={false} />
        <MealItem isOnDiet={false} />
        <MealItem isOnDiet={false} />
        <MealItem isOnDiet={false} />
      </div>
    </div>
  )
}