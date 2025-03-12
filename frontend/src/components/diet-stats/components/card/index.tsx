interface CardProps {
  value: number
  slug?: string
  variant?: 'default' | 'positive' | 'negative' | 'custom'
  color?: string
}

export function Card({ slug, color, value, variant = 'default' }: CardProps) {
  function chooseCardVariant() {
    switch (variant) {
      case 'positive':
        return (
          <div className="bg-green-light flex w-full flex-col items-center gap-2 rounded-md py-4">
            <h1 className="text-4xl font-bold">{value}</h1>
            <span>refeições dentro da dieta</span>
          </div>
        )

      case 'negative':
        return (
          <div className="bg-red-light flex w-full flex-col items-center gap-2 rounded-md py-4">
            <h1 className="text-4xl font-bold">{value}</h1>
            <span>refeições fora da dieta</span>
          </div>
        )

      case 'custom':
        return (
          <div
            className={`flex w-full flex-col items-center gap-2 rounded-md py-4 ${color}`}
          >
            <h1 className="text-4xl font-bold">{value}</h1>
            <span>{slug}</span>
          </div>
        )

      default:
        return (
          <div className="flex w-full flex-col items-center gap-2 rounded-md bg-zinc-200/80 py-4">
            <h1 className="text-4xl font-bold">{value}</h1>
            <span>{slug}</span>
          </div>
        )
    }
  }

  return chooseCardVariant()
}
