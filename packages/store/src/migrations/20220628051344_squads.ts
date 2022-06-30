import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('squads', function (column: any) {
    column.uuid('id').primary();
    column.string('name').notNullable();
    column.integer('currentMaxRounds').notNullable();
    column.decimal('currentPercentual', 14, 2).notNullable();
    column.boolean('enabled').defaultTo('enabled', knex.raw(true));
    column.dateTime('updatedAt', { useTz: 'boolean' }).defaultTo(knex.fn.now());
    column.dateTime('createdAt', { useTz: 'boolean' }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('squads');
}
