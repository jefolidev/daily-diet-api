import { X } from '@phosphor-icons/react';

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";

export function DietStats() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="text-zinc-900 gap-2 rounded-xl bg-green-light hover:border-[3px] hover:border-green-mid border-[3px] transition-all duration-75 hover:cursor-pointer border-transparent flex flex-col py-6 w-full items-center justify-center ">
          <h1 className="font-bold text-5xl">90,86%</h1>
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
            <div className="w-full py-4 flex flex-col items-center gap-2 rounded-md bg-zinc-200/80">
              <h1 className="font-bold text-4xl">22</h1>
              <span>melhor sequência de pratos dentro da dieta</span>
            </div>
            <div className="w-full py-4 flex flex-col items-center gap-2 rounded-md bg-zinc-200/80">
              <h1 className="font-bold text-4xl">109</h1>
              <span>refeições registradas</span>
            </div>
            <div className="flex gap-4">
              <div className="w-full py-4 flex flex-col items-center gap-2 rounded-md bg-green-light">
                <h1 className="font-bold text-4xl">99</h1>
                <span>refeições dentro da dieta</span>
              </div>
              <div className="w-full py-4 flex flex-col items-center gap-2 rounded-md bg-red-light">
                <h1 className="font-bold text-4xl">109</h1>
                <span>refeições fora da dieta</span>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}