// eslint-disable-next-line

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      birth: Date
      age: number
      gender: 'man' | 'woman'
      weight: number
      height: number
      imc: number
      created_at: Date
    },
    meals: {
      id: string
      name: string
      description?: string
      date: Date
      time: string
      is_on_diet: boolean
      user_id: string
      created_at: Date
    }
  }
}