import { X } from '@phosphor-icons/react'

import { useMeals } from '../../hooks/use-meals'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'
import { Card } from './components/card'

export function DietStats() {
  const {
    inDietMealsPercentage,
    bestDietSequence,
    inDietMeals,
    outOfDietMeals,
    meals,
  } = useMeals()

  console.log(inDietMeals)

  if (!inDietMeals || !outOfDietMeals) {
    return 0
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          className={`gap-2 rounded-xl text-zinc-900 ${Number(inDietMealsPercentage) < 60 ? 'bg-red-light hover:border-red-mid' : 'bg-green-light hover:border-green-mid'} flex w-full flex-col items-center justify-center border-[3px] border-transparent py-6 transition-all duration-75 hover:cursor-pointer hover:border-[3px]`}
        >
          <h1 className="text-5xl font-bold">{inDietMealsPercentage}%</h1>
          <p className="text-xl">das refeições dentro da dieta</p>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl pt-4 pb-12">
          <DrawerHeader className="text-center">
            <div className="flex justify-between">
              <DrawerTitle className="mx-auto text-2xl">
                Estastísticas Gerais
              </DrawerTitle>
              <DrawerClose>
                <button className="hover:cursor-pointer">
                  <X size={16} weight="bold" />
                </button>
              </DrawerClose>
            </div>
            <DrawerDescription className="text-md">
              Veja as estastísticas de sua dieta
            </DrawerDescription>
          </DrawerHeader>
          <div className="space-y-3">
            <Card
              slug="melhor sequência de pratos dentro da dieta"
              value={bestDietSequence}
            />
            <Card slug="refeições registradas" value={meals.length} />

            <div className="flex gap-2">
              <Card variant="positive" value={inDietMeals.length} />
              <Card variant="negative" value={outOfDietMeals.length} />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
