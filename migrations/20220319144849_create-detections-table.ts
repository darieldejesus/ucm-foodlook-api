import { Knex } from "knex";

const TABLE_NAME = "detections";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (t) => {
    t.increments("id").primary();
    t.uuid("uuid").notNullable().index();
    t.integer("file_id").notNullable().index();
    t.string("status");
    t.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
