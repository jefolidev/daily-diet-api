import type { MealType } from '../../api/schemas/meals-schema'
import { useMeals } from '../../hooks/use-meals'
import { MealItem } from './components/meal-item'

type OrderedMeals = Record<string, MealType[]>

export function MealsIndex() {
  const { meals } = useMeals()

  const reducedMeals = meals.reduce((acc: OrderedMeals, meal) => {
    if (!acc[meal.date.toString()]) {
      acc[meal.date.toString()] = []
    }

    acc[meal.date.toString()].push(meal)

    return acc
  }, {} as OrderedMeals)

  const orderedMeals = Object.entries(reducedMeals)

  return (
    <div className="flex flex-col gap-4 px-6">
      {orderedMeals.map(([date, meals]) => (
        <div key={date} className="flex flex-col gap-3">
          <h1 className="text-xl font-bold">{date.replace(/-/g, '.')}</h1>

          <div className="flex flex-col gap-4">
            {meals.map((meal) => {
              if (meal.id) {
                return (
                  <>
                    <MealItem
                      mealId={meal.id}
                      mealName={meal.name}
                      mealDescription={meal.description}
                      mealDate={meal.date}
                      mealHours={meal.time}
                      mealIsOnDiet={Boolean(meal.is_on_diet)}
                    />
                  </>
                )
              } else {
                return <>Nenhuma refeição encontrada!</>
              }
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
