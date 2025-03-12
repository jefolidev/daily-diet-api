import { knexDb } from '../../database'
import type { MealType } from '../../schemas/meals-schema'
import { formatDateToCreateNewMeal } from '../../utils/format-date'

export async function selectAllMeals(): Promise<MealType[]> {
  const query = await knexDb('meals')
    .select(knexDb.raw("DATE(date / 1000, 'unixepoch') as date"), '*')
    .orderBy('date', 'desc')

  console.log('query de todas as refeições: ' + JSON.stringify(query, null, 2))

  return query
}
export async function insertMealIntoDB(mealData: MealType, accountId: string) {
  const userId = await knexDb('users')
    .select('account_id')
    .where({ account_id: accountId })
    .first()

  console.log('ID ACHADO NA TABELA USERS NO QUERIE' + userId.account_id)

  const newMeal = {
    ...mealData,
    id: crypto.randomUUID(),
    is_on_diet: Boolean(mealData.is_on_diet),
    user_id: userId.account_id,
    date: formatDateToCreateNewMeal(mealData.date),
  }
  const query = await knexDb('meals').insert(newMeal).returning('*')

  return query
}

export async function putMealById(
  mealData: Omit<MealType, 'user_id'>,
  mealId: string,
) {
  const updatedMeal = {
    ...mealData,
    date: formatDateToCreateNewMeal(mealData.date),
  }

  const query = await knexDb('meals')
    .where({ id: mealId })
    .update(updatedMeal)
    .returning('*')

  return query
}

export async function deleteMealById(id: string) {
  // console.log("refeição recebida no BAnco de dados" + id)
  const query = await knexDb('meals').del().where({ id })
  // console.log("linha sendo deletada: " + query)

  return query
}
