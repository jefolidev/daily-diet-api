import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary()
    table.uuid('account_id').references('id').inTable('accounts').onDelete("CASCADE")
    table.text('name').notNullable()
    table.date('birth').notNullable()
    table.integer('age').notNullable()
    table.enum('gender', ['man', 'woman']).notNullable()
    table.decimal('weight', 10, 3).notNullable()
    table.decimal('height', 10, 3).notNullable()
    table.decimal('imc', 10, 3).nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users")
}

