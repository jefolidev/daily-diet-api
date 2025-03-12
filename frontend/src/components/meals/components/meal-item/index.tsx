import { Badge } from '../../../ui/badge'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../../ui/sheet'
import { EditMealItem } from '../edit-meal'
import { RemoveMealItem } from '../remove-meal'

interface MealItemProps {
  mealId: string
  mealHours: string
  mealName: string
  mealDescription: string
  mealDate: string | Date
  mealIsOnDiet: boolean
}

export function MealItem({
  mealId,
  mealHours,
  mealName,
  mealDescription,
  mealDate,
  mealIsOnDiet,
}: MealItemProps) {
  const isOnDietSlug = mealIsOnDiet ? 'Dentro da dieta' : 'Fora da dieta'

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center justify-between rounded-lg border border-zinc-300 px-6 py-6 hover:cursor-pointer hover:border-zinc-400">
          <div className="flex items-center gap-4">
            <p className="text-lg font-bold">{mealHours}</p>
            <div className="h-4 w-0.5 bg-zinc-300" />
            <p className="text-lg">{mealName}</p>
          </div>
          <div
            className={`size-6 ${mealIsOnDiet ? 'bg-green-300' : 'bg-red-400'} rounded-full`}
          />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="text-xl">
          <SheetTitle>{mealName}</SheetTitle>
          <SheetDescription>{mealDescription}</SheetDescription>
        </SheetHeader>
        <div className="-mt-3 px-4">
          <div>
            <span className="text-lg font-bold text-zinc-900">Data e hora</span>
            <p>
              {mealDate.toLocaleString('pt-BR').replace(/-/g, '/')} às{' '}
              {mealHours}
            </p>
          </div>
          <Badge className="mt-3 gap-3 rounded-full bg-zinc-100 px-5 py-2 text-sm font-medium text-zinc-900">
            <div
              className={`size-2 rounded-full ${mealIsOnDiet ? 'bg-green-dark' : 'bg-red-dark'}`}
            />
            {isOnDietSlug}
          </Badge>
        </div>
        <SheetFooter>
          <EditMealItem mealId={mealId} />
          <RemoveMealItem mealId={mealId} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
