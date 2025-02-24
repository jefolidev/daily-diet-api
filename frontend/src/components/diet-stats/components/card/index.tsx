interface CardProps {
  value: number
  slug?: string
  variant?: "default" | "positive" | "negative"
}

export function Card({ slug, value, variant = "default" }: CardProps) {
  function chooseCardVariant() {
    switch (variant) {
      case "positive":
        return (<div className="w-full py-4 flex flex-col items-center gap-2 rounded-md bg-green-light">
          <h1 className="font-bold text-4xl">{value}</h1>
          <span>refeições dentro da dieta</span>
        </div>)

      case "negative":
        return (<div className="w-full py-4 flex flex-col items-center gap-2 rounded-md bg-red-light">
          <h1 className="font-bold text-4xl">{value}</h1>
          <span>refeições fora da dieta</span>
        </div>)

      default:
        return (
          <div className="w-full py-4 flex flex-col items-center gap-2 rounded-md bg-zinc-200/80">
            <h1 className="font-bold text-4xl">{value}</h1>
            <span>{slug}</span>
          </div>
        )

    }
  }

  return chooseCardVariant()
}