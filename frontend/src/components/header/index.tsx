import logo from '../../assets/logo.png'

export function Header() {
  return (
    <div className="flex w-full justify-between p-6">
      <img src={logo} alt="" />
      <div className="size-10 rounded-full bg-zinc-800" />
    </div>
  )
}
