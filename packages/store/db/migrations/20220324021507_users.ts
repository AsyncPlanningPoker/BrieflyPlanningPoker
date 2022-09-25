import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (column: any) {
    column.uuid('id').primary();
    column.string('name', 55).notNullable();
    column.string('email').notNullable().unique();
    column.string('password').notNullable();
    column.boolean('enabled').defaultTo(true);
    column.dateTime('updatedAt', { useTz: 'boolean' }).defaultTo(knex.fn.now());
    column.dateTime('createdAt', { useTz: 'boolean' }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
