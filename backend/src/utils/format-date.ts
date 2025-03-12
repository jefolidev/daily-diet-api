export function formatDateToCreateNewMeal(date: string) {
  const cleanedDate = date.trim()
  const dateParts = cleanedDate.split('-')

  const formattedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`

  if (dateParts.length !== 3) {
    throw new Error(
      `Invalid date format: ${cleanedDate}. Expected 'YYYY-MM-DD' format.`,
    )
  }

  const parsedDate = new Date(formattedDate)
  const timestamp = parsedDate.getTime()

  if (isNaN(timestamp)) {
    throw new Error(`Invalid date format: ${cleanedDate}, Data: ${date}`)
  }

  console.log('Formatted date:', formattedDate) // Log da data formatada
  console.log('Timestamp:', timestamp)

  return formattedDate
}
