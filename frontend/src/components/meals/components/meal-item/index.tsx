import { Badge } from "../../../ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../../../ui/sheet"
import { EditMealItem } from "../edit-meal"
import { RemoveMealItem } from "../remove-meal"

interface MealItemProps {
  isOnDiet: boolean
}

export function MealItem({ isOnDiet }: MealItemProps) {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="w-full flex border justify-between items-center py-6 px-6 border-zinc-300 rounded-lg hover:border-zinc-400 hover:cursor-pointer">
          <div className="flex gap-4 items-center">
            <p className="text-lg font-bold">20:00</p>
            <div className="w-0.5 h-4 bg-zinc-300" />
            <p className="text-lg">X-Tudo</p>
          </div>
          <div className={`size-6 ${isOnDiet ? "bg-green-300" : "bg-red-400"} rounded-full`} />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="text-xl">
          <SheetTitle>Nome da Refeição</SheetTitle>
          <SheetDescription>Descrição da refeição</SheetDescription>
        </SheetHeader>
        <div className="-mt-3 px-4 ">
          <div>
            <span className="font-bold text-lg text-zinc-900">Data e hora</span>
            <p>12/08/2022 às 16:00</p>
          </div>
          <Badge className="mt-3 text-sm gap-3 rounded-full py-2 px-5 bg-zinc-100 font-medium text-zinc-900"><div className="size-2 rounded-full bg-green-dark" />Dentro na dieta</Badge>
        </div>
        <SheetFooter>
          <EditMealItem />
          <RemoveMealItem />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}