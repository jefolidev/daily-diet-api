import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { NavLink } from "react-router"
import { userAccountSchema, type UserAccount } from "../../../api/schemas/account-schema"
import { usersSchema, type UserType } from "../../../api/schemas/users-schema"
import { usersServices } from "../../../api/services/users-services"
import logo from "../../../assets/logo.png"
import { Input } from "../../../components/input"
import { Radio } from "../../../components/radio"
import { calculateAge } from "../../../utils/calculate-age"
import { calculateImc } from "../../../utils/calculate-imc"
import { ImcCard } from "./componentes/imc-card"

type UserWithAccount = UserType & UserAccount

export function SignInPage() {
  const [height, setHeight] = useState<string | undefined>()
  const [weight, setWeight] = useState<string | undefined>()

  const [imc, setImc] = useState<number>(0)

  const { handleSubmit, register: register } = useForm<UserWithAccount>({
    resolver: zodResolver(usersSchema.and(userAccountSchema))
  })

  const { createNewUser } = usersServices

  const { mutate: handleCreateUserFn } = useMutation({
    mutationFn: createNewUser,
    onSuccess: () => { console.log("Usuário criado com sucesso") }
  })

  useMemo(() => {
    if (height && weight) {
      setImc(calculateImc(weight, height))
    }
  }, [height, weight])

  // console.log(getValues())
  console.log(imc)
  // console.log(errors)

  function handleSubmitUserCreate(data: UserWithAccount) {
    const newUser: UserWithAccount = {
      ...data,
      imc,
      age: calculateAge(data.birth)
    }

    console.log("Usuário enviado: " + newUser)
    handleCreateUserFn(newUser)
  }

  return (
    <div className="max-w-[720px] mx-auto my-0 py-8 space-y-6">
      <div className="flex  flex-col items-center gap-2">
        <img src={logo} />

        <div>
          <h1 className="text-xl font-bold">Crie o seu cadastro e faça parte!</h1>
          <p>Insira algumas informações, é rapidinho!</p>
        </div>

      </div>

      <form className="space-y-6" onSubmit={handleSubmit(handleSubmitUserCreate)}>
        <fieldset>
          <h1 className="text-lg font-bold">Informações de cadastro</h1>

          <div className="flex gap-4">
            <div className="input-wrapper">
              <label>Email</label>
              <Input
                placeholder="Insira o email"
                type="email"
                {...register("email")}
              />
            </div>

            <div className="input-wrapper">
              <label>Senha</label>
              <Input
                placeholder="Insira a senha"
                {...register("password")}
              />
            </div>
          </div>


        </fieldset>

        <fieldset className="space-y-4">
          <h1 className="text-lg font-bold">Informações pessoais</h1>

          <div className="flex gap-4 items-center">
            <div className="input-wrapper">
              <label>Nome</label>
              <Input placeholder="Insira seu nome" {...register("name")} />
            </div>

            <div className="input-wrapper">
              <label>Nascimento</label>
              <input type="date" className="border rounded-sm py-3 px-4 text-zinc-500" {...register("birth")} />
            </div>
          </div>

          <div className="flex gap-4 my-4">
            <Radio slugText="Homem" customClass="checked:bg-blue-300 checked:border-blue-400/60" value={"man"} {...register("gender")} />
            <Radio slugText="Mulher" customClass="checked:bg-pink-300 checked:border-pink-400/60" value={"woman"} {...register("gender")} />
          </div>

          <div className="flex gap-4">
            <div className="input-wrapper">
              <label>Peso</label>
              <Input type="number" placeholder="Insira seu peso em gramas"  {...register("weight", { valueAsNumber: true })} onChange={(e) => setWeight(e.target.value)} />
            </div>

            <div className="input-wrapper">
              <label>Altura</label>
              <Input type="number" placeholder="Insira sua altura em cm"  {...register("height", { valueAsNumber: true })} onChange={(e) => setHeight(e.target.value)} />
            </div>
          </div>

        </fieldset>

        <ImcCard imc={imc} />

        <button type="submit" className="flex w-full py-4 font-bold text-white rounded-sm justify-center bg-zinc-900 hover:bg-zinc-800 hover:cursor-pointer transition-colors">Criar usuário</button>
      </form>

      <div className="flex gap w-full justify-center gap-1">
        <p>Já possui cadastro? </p><NavLink className="underline hover:text-blue-950" to={"/login"}>Faça login!</NavLink>
      </div>
    </div>
  )
}