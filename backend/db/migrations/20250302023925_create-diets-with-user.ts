import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("meals", (table) => {
    table.uuid("id").primary(),
      table.string("name").notNullable(),
      table.string("description").nullable(),
      table.date("date").notNullable(),
      table.time("time").notNullable(),
      table.boolean("is_on_diet").notNullable(),
      table.uuid("user_id").notNullable().references("ide").inTable("users").onDelete("CASCADE"),
      table.timestamp("created_at").defaultTo(knex.fn.now())
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("meals")
}

