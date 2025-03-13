import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import logo from '../../../assets/logo.png'
import { Input } from '../../../components/input'
import { useAuth } from '../../../hooks/use-auth'

const formLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export function LoginPage() {
  const { login, isAuthenticated } = useAuth()

  const navigate = useNavigate()
  const { handleSubmit, register } = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
  })

  function handleSubmitLogin({
    email,
    password,
  }: z.infer<typeof formLoginSchema>) {
    login(email, password)

    if (!isAuthenticated) {
      toast.error('Email e/ou senha incorreto(s), por favor tente novamente')
    }

    navigate('/meals')
  }

  return (
    <div className="mx-auto my-0 flex h-screen max-w-[720px] flex-col justify-center space-y-6 py-8">
      <div className="flex flex-col items-center gap-2">
        <img src={logo} alt="" />

        <div className="text-center">
          <h1 className="text-xl font-bold">Bem vindo de volta!</h1>
          <p>Insira seu login e retome de onde parou!</p>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(handleSubmitLogin)}>
        <fieldset>
          <h1 className="text-lg font-bold">Informações de cadastro</h1>

          <div className="flex gap-4">
            <div className="input-wrapper">
              <label>Email</label>
              <Input
                placeholder="Insira o email"
                type="email"
                {...register('email')}
              />
            </div>

            <div className="input-wrapper">
              <label>Senha</label>
              <Input placeholder="Insira a senha" {...register('password')} />
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          className="flex w-full justify-center rounded-sm bg-zinc-900 py-4 font-bold text-white transition-colors hover:cursor-pointer hover:bg-zinc-800"
        >
          Entrar
        </button>
      </form>

      <div className="gap flex w-full justify-center gap-1">
        <p>Não possui cadastro? </p>
        <NavLink className="underline hover:text-blue-950" to={'/signin'}>
          Cadastre-se!
        </NavLink>
      </div>
    </div>
  )
}
