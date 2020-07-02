import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('todos', tbl => {
        tbl.increments('id');
        tbl.text('title').notNullable();
        tbl.boolean('status');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('todos');
}