export function calculateImc(weight: string, height: string) {
  const weightInKg = Number(weight) / 1000
  const heightInMeters = Number(height) / 100

  const imcCalc = weightInKg / (heightInMeters ^ 2)

  return imcCalc
}
