import logo from "../../assets/logo.png"

export function Header() {
  return (
    <div className="w-full p-6  justify-between flex">
      <img src={logo} alt="" />
      <div className="size-10 rounded-full bg-zinc-800" />
    </div>
  )
}