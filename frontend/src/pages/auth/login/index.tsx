import { NavLink } from "react-router"
import logo from "../../../assets/logo.png"
import { Input } from "../../../components/input"

export function LoginPage() {
  return (
    <div className="max-w-[720px] mx-auto my-0 py-8 space-y-6 flex flex-col h-screen justify-center">
      <div className="flex  flex-col items-center gap-2">
        <img src={logo} />

        <div className="text-center">
          <h1 className="text-xl font-bold">Bem vindo de volta!</h1>
          <p>Insira seu login e retome de onde parou!</p>
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

        <button type="submit" className="flex w-full py-4 font-bold text-white rounded-sm justify-center bg-zinc-900 hover:bg-zinc-800 hover:cursor-pointer transition-colors">Entrar</button>
      </form>

      <div className="flex gap w-full justify-center gap-1">
        <p>Não possui cadastro? </p><NavLink className="underline hover:text-blue-950" to={"/signin"}>Cadastre-se!</NavLink>
      </div>
    </div>
  )
}