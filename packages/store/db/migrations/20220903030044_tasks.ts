import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tasks', function (column: any) {
    column.uuid('id').primary();
    column.uuid('squad').notNullable().references('id').inTable('squads');
    column.string('name').notNullable();
    column.string('description');
    column.integer('maxRounds').notNullable();
    column.decimal('percentual', 14, 2).notNullable();
    column.integer('points');
    column.boolean('finished').defaultTo(false);
    column.boolean('active').defaultTo(true);
    column.boolean('enabled').defaultTo(true);
    column.dateTime('updatedAt', { useTz: 'boolean' }).defaultTo(knex.fn.now());
    column.dateTime('createdAt', { useTz: 'boolean' }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tasks');
}
