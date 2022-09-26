import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tasks-messages', function (column: any) {
    column.uuid('id').primary();
    column.uuid('task').notNullable().references('id').inTable('tasks');
    column.uuid('user').notNullable().references('id').inTable('users');
    column.integer('currentRound').notNullable();
    column.string('message', 180).notNullable();
    column.boolean('enabled').defaultTo(true);
    column.dateTime('updatedAt', { useTz: 'boolean' }).defaultTo(knex.fn.now());
    column.dateTime('createdAt', { useTz: 'boolean' }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tasks-messages');
}
