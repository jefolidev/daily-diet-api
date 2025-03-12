import { useMutation } from '@tanstack/react-query'
import { DietStats } from '../../components/diet-stats'
import { Header } from '../../components/header'
import { MealsIndex } from '../../components/meals'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog'
import { mealsServices } from '../../api/services/meals-services'
import { newMealSchema, type NewMeal } from '../../api/schemas/meals-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { queryClient } from '../../lib/react-query'
import { useForm } from 'react-hook-form'

export function MealsMain() {
  const { createNewMeal } = mealsServices

  const { getValues, handleSubmit, register } = useForm<NewMeal>({
    resolver: zodResolver(newMealSchema),
  })

  const { mutate: handleNewMeal } = useMutation({
    mutationFn: createNewMeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] })
    },
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
    TODO: Fazer cadastro e login de usuários
    TODO: Estudar JWT e Cookies
  */

  return (
    <div className="mx-auto my-0 flex max-w-[720px] flex-col space-y-10 pb-8">
      <Header />
      <div className="flex flex-col space-y-8 px-6">
        <DietStats />
        <div className="flex flex-col gap-2">
          <span className="text-xl">Refeições</span>
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex cursor-pointer items-center justify-center rounded-[6px] bg-zinc-900 py-4 text-xl font-medium text-white transition-colors duration-100 hover:bg-zinc-800">
                + Nova refeição
              </button>
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Adicionar nova refeição</DialogTitle>
                <DialogDescription>
                  Insira as informações e crie a nova refeição
                </DialogDescription>
              </DialogHeader>
              <form
                className="max-w-[28.5rem] space-y-4"
                onSubmit={handleSubmit(handleSubmitNewMeal)}
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
                        setValueAs: (v) =>
                          new Date(v).toLocaleDateString('pt-BR'),
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
                  <label className="text-lg font-medium">
                    Está dentro da dieta?
                  </label>

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
                        <label className="text-md relative font-bold">
                          Sim
                        </label>
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
                        <label className="text-md relative font-bold">
                          Não
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className="mt-8 mb-2 flex w-full cursor-pointer items-center justify-center rounded-md bg-zinc-900 py-3 font-medium text-white transition-colors duration-100 hover:bg-zinc-800"
                  type="submit"
                >
                  Cadastrar refeição
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <MealsIndex />
    </div>
  )
}
