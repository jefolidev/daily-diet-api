import logo from '../../assets/logo.png'
import { useAuth } from '../../hooks/use-auth'

export function Header() {
  const { logout } = useAuth()
  return (
    <div className="flex w-full justify-between p-6">
      <img src={logo} alt="" />
      <button className="hover:cursor-pointer" onClick={() => logout()}>
        <div className="size-10 rounded-full bg-zinc-800" />
      </button>
    </div>
  )
}
