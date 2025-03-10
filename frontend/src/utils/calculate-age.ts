export function calculateAge(birth: string): number {
  const birthDate = new Date(birth)
  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()

  const currentMonth = today.getMonth()
  const currentDay = today.getDate()


  if (currentMonth < birthDate.getMonth() || currentMonth === birthDate.getMonth() && currentDay < birthDate.getDate()) age--

  return age
}