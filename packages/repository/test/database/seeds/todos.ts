import Knex from 'knex';


export async function seed(knex: Knex) {
    return knex('todos').insert([
        { id: 1, title: 'todo 1', status: 0 },
        { id: 2, title: 'todo 2', status: 0 },
        { id: 3, title: 'todo 3', status: 1 },
    ]);
}