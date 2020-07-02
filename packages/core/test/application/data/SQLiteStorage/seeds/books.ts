import Knex from 'knex';


export async function seed(knex: Knex) {
    return knex('books').insert([
        { title: 'book 1' },
        { title: 'book 2' },
        { title: 'book 3' },
    ]);
}