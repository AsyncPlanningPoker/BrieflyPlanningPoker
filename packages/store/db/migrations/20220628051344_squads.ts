import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('squads', function (column: any) {
    column.uuid('id').primary();
    column.string('name', 25).notNullable();
    column.integer('currentMaxRounds').notNullable();
    column.decimal('currentPercentual', 14, 2).notNullable();
    column.boolean('enabled').defaultTo(true);
    column.dateTime('updatedAt', { useTz: 'boolean' }).defaultTo(knex.fn.now());
    column.dateTime('createdAt', { useTz: 'boolean' }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('squads');
}
