import { zodResolver } from '@hookform/resolvers/zod'
import { PencilSimple } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import {
  newMealSchema,
  type NewMeal,
} from '../../../../api/schemas/meals-schema'
import { mealsServices } from '../../../../api/services/meals-services'
import { useMeals } from '../../../../hooks/use-meals'
import { queryClient } from '../../../../lib/react-query'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../ui/dialog'

interface EditMealItemProsp {
  mealId: string
}

export function EditMealItem({ mealId }: EditMealItemProsp) {
  const { meals } = useMeals()
  const currentMeal = meals.find((meal) => meal.id === mealId)

  const { updateMeal } = mealsServices

  const {
    getValues,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NewMeal>({
    resolver: zodResolver(newMealSchema),
    defaultValues: {
      name: currentMeal?.name,
      description: currentMeal?.description,
      is_on_diet: currentMeal?.is_on_diet,
      date: currentMeal?.date,
      time: currentMeal?.time,
    },
  })

  console.log(errors)
  console.log(getValues())

  const { mutate: updateMealFn } = useMutation({
    mutationFn: async (updatedMeal: NewMeal) =>
      await updateMeal(updatedMeal, mealId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] })
    },
  })

  function handleEditCurrentMeal(data: NewMeal) {
    console.log('Data sendo enviada: ' + data.date)

    const updatedMeal: NewMeal = {
      ...data,
      name: data.name,
      description: data.description,
      date: data.date,
      time: data.time,
      is_on_diet: data.is_on_diet,
    }

    updateMealFn(updatedMeal)
    console.log(updatedMeal)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center gap-2 rounded-sm bg-zinc-800 py-4 font-bold text-white hover:cursor-pointer hover:bg-zinc-700">
          <PencilSimple weight="light" size={20} className="-ml-2" />
          Editar refeição
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editando uma refeição</DialogTitle>
          <DialogDescription>
            Edite os campos do item atual e em seguida salve
          </DialogDescription>
        </DialogHeader>
        <form
          className="max-w-[28.5rem] space-y-4"
          onSubmit={handleSubmit(handleEditCurrentMeal)}
        >
          <div className="flex flex-col gap-1">
            <label className="text-lg font-medium">Nome</label>
            <input
              className="rounded-sm border px-4 py-3"
              placeholder="Insira o nome da refeição"
              {...register('name')}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-medium">Descrição</label>
            <textarea
              className="rounded-sm border px-3 py-3"
              rows={4}
              placeholder="Descreva o que veio na sua alimentação. Ex.:Pão integral, alface, tomate..."
              {...register('description')}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-lg font-medium">Data</label>
              <input
                className="rounded-sm border px-4 py-3"
                placeholder="Insira o nome da refeição"
                {...register('date', {
                  setValueAs: (v) => new Date(v).toLocaleDateString('pt-BR'),
                })}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-lg font-medium">Hora</label>
              <input
                className="rounded-sm border px-4 py-3"
                placeholder="Insira o nome da refeição"
                {...register('time')}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">Está dentro da dieta?</label>

            <div className="flex gap-4">
              <div className="relative flex w-full items-center justify-center py-4">
                <input
                  type="radio"
                  className="checked:bg-green-mid checked:border-green-dark absolute z-0 size-full appearance-none rounded-md border-2 border-transparent bg-zinc-200/80 checked:border-2 hover:cursor-pointer"
                  value={1}
                  {...register('is_on_diet', {
                    setValueAs: (v) => Boolean(Number(v)),
                  })}
                />
                <div className="flex items-center gap-3">
                  <div className="relative size-3 rounded-full bg-green-800" />
                  <label className="text-md relative font-bold">Sim</label>
                </div>
              </div>

              <div className="relative flex w-full items-center justify-center py-4">
                <input
                  type="radio"
                  className="checked:bg-red-mid checked:border-red-dark absolute z-0 size-full appearance-none rounded-md border-2 border-transparent bg-zinc-200/80 checked:border-2 hover:cursor-pointer"
                  value={0}
                  {...register('is_on_diet', {
                    setValueAs: (v) => Boolean(v),

                    valueAsNumber: true,
                  })}
                />

                <div className="flex items-center gap-3">
                  <div className="relative size-3 rounded-full bg-red-800" />
                  <label className="text-md relative font-bold">Não</label>
                </div>
              </div>
            </div>
          </div>

          <button
            className="mt-8 mb-2 flex w-full cursor-pointer items-center justify-center rounded-md bg-zinc-900 py-3 font-medium text-white transition-colors duration-100 hover:bg-zinc-800"
            type="submit"
          >
            Salvar aterações
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
