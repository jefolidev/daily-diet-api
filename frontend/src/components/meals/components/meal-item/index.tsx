interface MealItemProps {
  isOnDiet: boolean
}

export function MealItem({ isOnDiet }: MealItemProps) {
  return (
    <div className="w-full flex border justify-between items-center py-6 px-6 border-zinc-300 rounded-lg">
      <div className="flex gap-4 items-center">
        <p className="text-lg font-bold">20:00</p>
        <div className="w-0.5 h-4 bg-zinc-300" />
        <p className="text-lg">X-Tudo</p>
      </div>
      <div className={`size-6 ${isOnDiet ? "bg-green-300" : "bg-red-400"} rounded-full`} />
    </div>
  )
}