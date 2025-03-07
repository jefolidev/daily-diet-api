import { TrashSimple } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { mealsServices } from "../../../../api/services/meals-services";
import { queryClient } from "../../../../lib/react-query";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../ui/dialog";

interface RemoveMealItemProsp {
  mealId: string
}

export function RemoveMealItem({ mealId }: RemoveMealItemProsp) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const { removeMealById } = mealsServices

  const { mutate: removeMeal } = useMutation({
    mutationFn: removeMealById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] })
      setIsModalOpen(false)
    }
  })

  return (
    <Dialog modal={isModalOpen}>
      <DialogTrigger asChild>
        <button className="hover:cursor-pointer hover:bg-zinc-200 flex border-2 border-zinc-800 py-4 text-zinc-800 items-center gap-2  font-bold justify-center rounded-sm">
          <TrashSimple weight="light" size={20} className="-ml-2 " />Excluir refeição
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Realmente deseja remover essa refeição?</DialogTitle>
          <DialogDescription>Ao afirmar, essa ação não poderá ser revertida.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <button className="px-4 bg-zinc-800 hover:cursor-pointer hover:bg-zinc-700 py-3 rounded-md text-white font-bold">Cancelar</button>
          </DialogClose>
          <button className="px-4 bg-red-500  hover:cursor-pointer hover:bg-red-400 py-3 rounded-md text-white font-bold" onClick={() => removeMeal(mealId)}>Apagar</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}