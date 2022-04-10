import { Knex } from "knex";

const TABLE_NAME = "presigned_urls";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (t) => {
    t.increments("id").primary();
    t.uuid("uuid").notNullable().index();
    t.string("name").notNullable();
    t.string("path").notNullable();
    t.string("url").notNullable();
    t.datetime("expire_at");
    t.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
