import { NavLink } from "react-router"
import logo from "../../../assets/logo.png"
import { Card } from "../../../components/diet-stats/components/card"
import { Input } from "../../../components/input"
import { Radio } from "../../../components/radio"

export function SignInPage() {
  return (
    <div className="max-w-[720px] mx-auto my-0 py-8 space-y-6">
      <div className="flex  flex-col items-center gap-2">
        <img src={logo} />

        <div>
          <h1 className="text-xl font-bold">Crie o seu cadastro e faça parte!</h1>
          <p>Insira algumas informações, é rapidinho!</p>
        </div>

      </div>

      <form className="space-y-6">
        <fieldset>
          <h1 className="text-lg font-bold">Informações de cadastro</h1>

          <div className="flex gap-4">
            <div className="input-wrapper">
              <label>Email</label>
              <Input
                placeholder="Insira o email"
                type="email"
              />
            </div>

            <div className="input-wrapper">
              <label>Senha</label>
              <Input
                placeholder="Insira a senha"
              />
            </div>
          </div>


        </fieldset>

        <fieldset className="space-y-4">
          <h1 className="text-lg font-bold">Informações pessoais</h1>

          <div className="flex gap-4 items-center">
            <div className="input-wrapper">
              <label>Nome</label>
              <Input placeholder="Insira seu nome" />
            </div>

            <div className="input-wrapper">
              <label>Nascimento</label>
              <input type="date" className="border rounded-sm py-3 px-4 text-zinc-500" />
            </div>
          </div>

          <div className="flex gap-4 my-4">
            <Radio slugText="Homem" checkedBgColor="blue-200" checkedBorderColor="blue-400" radioGroup="gender" name="man" />
            <Radio slugText="Mulher" checkedBgColor="blue-200" checkedBorderColor="blue-400" radioGroup="gender" name="woman" />
          </div>

          <div className="flex gap-4">
            <div className="input-wrapper">
              <label>Peso</label>
              <Input type="number" placeholder="Insira seu peso em gramas" />
            </div>

            <div className="input-wrapper">
              <label>Altura</label>
              <Input type="number" placeholder="Insira sua altura em cm" />
            </div>
          </div>

        </fieldset>

        <Card value={249} slug="Seu valor de IMC" />

        <button type="submit" className="flex w-full py-4 font-bold text-white rounded-sm justify-center bg-zinc-900 hover:bg-zinc-800 hover:cursor-pointer transition-colors">Criar usuário</button>
      </form>

      <div className="flex gap w-full justify-center gap-1">
        <p>Já possui cadastro? </p><NavLink className="underline hover:text-blue-950" to={"/login"}>Faça login!</NavLink>
      </div>
    </div>
  )
}