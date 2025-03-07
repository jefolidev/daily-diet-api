import { zodResolver } from "@hookform/resolvers/zod";
import { PencilSimple } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { newMealSchema, type NewMeal } from "../../../../api/schemas/meals-schema";
import { mealsServices } from "../../../../api/services/meals-services";
import { queryClient } from "../../../../lib/react-query";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../ui/dialog";


interface EditMealItemProsp {
  mealId: string
}

export function EditMealItem({ mealId }: EditMealItemProsp) {
  const { updateMeal } = mealsServices

  const { getValues, handleSubmit, register, formState: { errors } } = useForm<NewMeal>({
    resolver: zodResolver(newMealSchema)
  })

  console.log(errors)
  console.log(getValues())

  const { mutate: updateMealFn } = useMutation({
    mutationFn: async (updatedMeal: NewMeal) => await updateMeal(updatedMeal, mealId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] })
    }
  })

  function handleEditCurrentMeal(data: NewMeal) {
    console.log("Data sendo enviada: " + data.date)

    const updatedMeal: NewMeal = {
      ...data,
      name: data.name,
      description: data.description,
      date: data.date,
      time: data.time,
      is_on_diet: data.is_on_diet
    }

    updateMealFn(updatedMeal)
    console.log(updatedMeal)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hover:cursor-pointer hover:bg-zinc-700 flex bg-zinc-800 py-4 text-white items-center gap-2  font-bold justify-center rounded-sm"><PencilSimple weight="light" size={20} className="-ml-2" />Editar refeição</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editando uma refeição</DialogTitle>
          <DialogDescription>Edite os campos do item atual e em seguida salve</DialogDescription>
        </DialogHeader>
        <form className="max-w-[28.5rem] space-y-4" onSubmit={handleSubmit(handleEditCurrentMeal)}>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-lg">Nome</label>
            <input className="border rounded-sm py-3 px-4" placeholder="Insira o nome da refeição" {...register("name")} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-lg">Descrição</label>
            <textarea className="border rounded-sm px-3 py-3" rows={4} placeholder="Descreva o que veio na sua alimentação. Ex.:Pão integral, alface, tomate..."  {...register("description")} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-medium text-lg">Data</label>
              <input
                className="border rounded-sm py-3 px-4"
                placeholder="Insira o nome da refeição"
                {...register("date", {
                  setValueAs: (v) => new Date(v).toLocaleDateString("pt-BR")
                })}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium text-lg">Hora</label>
              <input className="border rounded-sm py-3 px-4" placeholder="Insira o nome da refeição"  {...register("time")} />
            </div>

          </div>

          <div className="flex flex-col gap-2">

            <label className="font-medium text-lg">Está dentro da dieta?</label>

            <div className="flex gap-4">

              <div className="relative w-full flex items-center justify-center py-4 ">
                <input
                  type="radio"
                  className="hover:cursor-pointer absolute appearance-none bg-zinc-200/80 rounded-md size-full checked:bg-green-mid border-2 border-transparent checked:border-2 checked:border-green-dark z-0"

                  value={1}
                  {...register("is_on_diet", {
                    setValueAs: (v) => Boolean(Number(v)),
                  })}
                />
                <div className="flex gap-3 items-center ">
                  <div className="size-3 rounded-full relative bg-green-800" />
                  <label className="relative font-bold text-md">Sim</label>
                </div>
              </div>

              <div className="relative w-full flex items-center justify-center py-4 ">
                <input
                  type="radio"
                  className="hover:cursor-pointer absolute appearance-none  bg-zinc-200/80 rounded-md size-full checked:bg-red-mid border-2 border-transparent checked:border-2 checked:border-red-dark z-0"

                  value={0}

                  {...register("is_on_diet", {
                    setValueAs: (v) => Boolean(v),

                    valueAsNumber: true
                  })} />

                <div className="flex gap-3 items-center ">
                  <div className="size-3 rounded-full relative bg-red-800" />
                  <label className="relative font-bold text-md ">Não</label>
                </div>
              </div>

            </div>
          </div>


          <button className="flex items-center justify-center bg-zinc-900 w-full py-3 text-white font-medium rounded-md cursor-pointer hover:bg-zinc-800 transition-colors duration-100 mt-8 mb-2" type="submit">
            Salvar aterações
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}