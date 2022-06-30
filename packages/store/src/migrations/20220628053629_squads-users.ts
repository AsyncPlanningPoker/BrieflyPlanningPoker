import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('squads-users', function (column: any) {
    column.uuid('id').primary();
    column.uuid('user').notNullable().references('id').inTable('users');
    column.uuid('squad').notNullable().references('id').inTable('squads');
    column.boolean('enabled').defaultTo('enabled', knex.raw(true));
    column.dateTime('updatedAt', { useTz: 'boolean' }).defaultTo(knex.fn.now());
    column.dateTime('createdAt', { useTz: 'boolean' }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('squads-users');
}
