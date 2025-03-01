// eslint-disable-next-line
import { Knex } from 'knex'

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
    }
  }
}