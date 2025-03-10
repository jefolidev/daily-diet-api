import { useEffect, useState } from "react"
import { Card } from "../../../../components/diet-stats/components/card"

interface IMCComponentProps {
  imc: number,
}

enum IMC {
  SKINNY = 18.5,
  NORMAL = 24.9,
  OVERWEIGHT = 29.9,
  OBESE = 39.9,
  OVER_OBESE = 40
}

export function ImcCard({ imc }: IMCComponentProps) {
  const [status, setStatus] = useState<string>("")
  const [color, setColor] = useState<string>("")

  useEffect(() => {
    if (imc > IMC.SKINNY && imc <= IMC.NORMAL) {
      setStatus("Normal")
      setColor("bg-green-200")
    } else if (imc <= IMC.SKINNY) {
      setStatus("Abaixo do Peso")
      setColor("bg-red-300")
    } else if (imc <= IMC.OVERWEIGHT) {
      setStatus("Sobrepeso")
      setColor("bg-yellow-300")
    } else if (imc <= IMC.OBESE) {
      setStatus("Obesidade")
      setColor("bg-orange-300")
    } else if (imc >= IMC.OVER_OBESE) {
      setStatus("Obesidade grave")
      setColor("bg-red-500")
    } else {
      setStatus("Fora das faixas")
      setColor("black")
    }
  }, [imc])

  return <Card value={Number(imc.toFixed(1))} variant="custom" color={color} slug={`Seu valor de IMC (${status})`} />

}