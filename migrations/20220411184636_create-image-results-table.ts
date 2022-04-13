import { Knex } from "knex";

const TABLE_NAME = "image_results";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (t) => {
    t.increments("id").primary();
    t.uuid("uuid").notNullable().index();
    t.integer("detection_id").notNullable();
    t.text("title").notNullable();
    t.text("url").notNullable();
    t.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
