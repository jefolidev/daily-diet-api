import { Header } from "./components/header";
import { MealsIndex } from "./components/meals";

export function App() {

  return (
    <div className='max-w-[720px] mx-auto my-0 flex flex-col space-y-10'>
      <Header />
      <div className="space-y-8 flex flex-col px-6">
        <div className="text-zinc-900 gap-2 rounded-xl bg-green-light flex flex-col py-6 w-full items-center justify-center ">
          <h1 className="font-bold text-5xl">90,86%</h1>
          <p className="text-xl">das refeições dentro da dieta</p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xl">Refeições</span>
          <button className="flex items-center bg-zinc-900 text-white font-medium justify-center py-4 rounded-[6px] text-xl cursor-pointer hover:bg-zinc-800 transition-colors duration-100">
            + Nova refeição
          </button>
        </div>
      </div>

      <MealsIndex />
    </div>
  )
}

