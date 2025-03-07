import { useMutation } from "@tanstack/react-query";
import { DietStats } from "./components/diet-stats";
import { Header } from "./components/header";
import { MealsIndex } from "./components/meals";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { newMealSchema, type NewMeal } from "./api/schemas/meals-schema";
import { mealsServices } from "./api/services/meals-services";
import { queryClient } from "./lib/react-query";

export function App() {
  const { createNewMeal } = mealsServices

  const { getValues, handleSubmit, register } = useForm<NewMeal>({
    resolver: zodResolver(newMealSchema)
  })

  const { mutate: handleNewMeal } = useMutation({
    mutationFn: createNewMeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] })
    }
  })

  // console.log(errors)
  console.log(getValues())

  function handleSubmitNewMeal(data: NewMeal) {
    // console.log("enviado")
    handleNewMeal(data)
    console.log(data)
    // console.log(typeof data.isOnDiet)
  }

  /*
    ! COORRIGIR O PROBLEMA DAS DATAS NA HORA DE EDITAR OS ITENS
  */

  return (
    <div className='max-w-[720px] mx-auto my-0 pb-8 flex flex-col space-y-10'>
      <Header />
      <div className="space-y-8 flex flex-col px-6">
        <DietStats />
        <div className="flex flex-col gap-2">
          <span className="text-xl">Refeições</span>
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center bg-zinc-900 text-white font-medium justify-center py-4 rounded-[6px] text-xl cursor-pointer hover:bg-zinc-800 transition-colors duration-100">
                + Nova refeição
              </button>
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Adicionar nova refeição</DialogTitle>
                <DialogDescription>Insira as informações e crie a nova refeição</DialogDescription>
              </DialogHeader>
              <form className="max-w-[28.5rem] space-y-4" onSubmit={handleSubmit(handleSubmitNewMeal)}>

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
                  Cadastrar refeição
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <MealsIndex />
    </div >
  )
}

