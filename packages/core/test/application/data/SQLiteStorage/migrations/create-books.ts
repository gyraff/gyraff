import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('books', tbl => {
        tbl.increments('id');
        tbl.text('title').notNullable();
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('books');
}