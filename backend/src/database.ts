import 'dotenv/config'
import knex, { type Knex } from 'knex'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: { filename: process.env.NODE_ENV },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations'
  }
}

export const knexDb = knex(config)