import { X } from '@phosphor-icons/react';

import { useMeals } from '../../hooks/use-meals';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Card } from './components/card';

export function DietStats() {
  const { inDietMealsPercentage, bestDietSequence, inDietMeals, outOfDietMeals, meals } = useMeals()

  console.log(inDietMeals)

  if (!inDietMeals || !outOfDietMeals) {
    return 0
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className={`text-zinc-900 gap-2 rounded-xl ${Number(inDietMealsPercentage) < 60 ? "bg-red-light hover:border-red-mid" : "bg-green-light hover:border-green-mid"} hover:border-[3px]  border-[3px] transition-all duration-75 hover:cursor-pointer border-transparent flex flex-col py-6 w-full items-center justify-center`} >
          <h1 className="font-bold text-5xl">{inDietMealsPercentage}%</h1>
          <p className="text-xl">das refeições dentro da dieta</p>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl pt-4 pb-12">
          <DrawerHeader className="text-center">
            <div className='flex justify-between'>
              <DrawerTitle className="text-2xl mx-auto">Estastísticas Gerais</DrawerTitle>
              <DrawerClose>
                <button className='hover:cursor-pointer'>
                  <X size={16} weight='bold' />
                </button>
              </DrawerClose>
            </div>
            <DrawerDescription className="text-md">Veja as estastísticas de sua dieta</DrawerDescription>

          </DrawerHeader>
          <div className="space-y-3">

            <Card slug='melhor sequência de pratos dentro da dieta' value={bestDietSequence} />
            <Card slug='refeições registradas' value={meals.length} />

            <div className='flex gap-2'>
              <Card variant='positive' value={inDietMeals.length} />
              <Card variant='negative' value={outOfDietMeals.length} />
            </div>

          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}