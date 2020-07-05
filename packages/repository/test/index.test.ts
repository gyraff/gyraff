import { unlink } from 'fs';
import Knex from 'knex';
import { Model, ModelFactoryType, ModelInterface } from '@gyraff/model';
import { Repository, SQLiteStorage } from '../index';
import { RepositoryInterface } from '../src/contract';
import {getConnector, setConfig, SQLiteStorageConnectorType} from '@gyraff/connector';
import { StorageInterface } from '../src/storage/contract';


interface TodoRepositoryInterface extends RepositoryInterface {
    findByStatus(status: number): Promise<ModelInterface[]>
}

const dbDir = `${__dirname}/database`;
const dbFilename = `${dbDir}/database.db`;
const dbMigrations = `${dbDir}/migrations`;
const dbSeeds = `${dbDir}/seeds`;


const SQLiteConfig: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: dbFilename,
    },
    useNullAsDefault: true,
    debug: false,
    migrations: {
        directory: dbMigrations,
    },
    seeds: {
        directory: dbSeeds,
    },
};
setConfig({
    connectors: {
        SQLiteStorageConnector: SQLiteConfig,
    },
});

const connector: SQLiteStorageConnectorType = getConnector('SQLiteStorageConnector');

beforeEach(async () => {
    await new Promise((resolve, reject) => {
        unlink(dbFilename, () => {
            resolve();
        });
    });
    const knex = await connector.getConnection();
    await knex.initialize();
    await knex.migrate.latest();
    await knex.seed.run();
});

afterEach(async () => {
    const knex = await connector.getConnection();
    await knex.destroy();
});

const TodoModel = Model.compose<{}>({
    schema: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            status: { type: 'integer', enum: [0, 1] },
        },
        required: ['title', 'status'],
        additionalProperties: false,
    },
});

const TodoRepository = Repository.compose<TodoRepositoryInterface>({
    Model: TodoModel,
    storage: SQLiteStorage({
        tableName: 'todos',
        storageConnector: connector,
    }),
    async findByStatus(status: number): Promise<ModelInterface[]> {
        const r = await (this.storage as StorageInterface).find({ status: 1 });
        return r.map((i: any) => (this.Model as ModelFactoryType)({ properties: i }));
    },
});

describe('@gyraff/repository tests', () => {

    test('Repository.findByStatus (extended)', async () => {
        const repository = TodoRepository();
        const completed = await repository.findByStatus(1);
        expect(completed.map(i => i.toJSON())).toEqual([{ id: 3, title: 'todo 3', status: 1 }]);
    });

    test('Repository.update', async () => {
        const repository = TodoRepository();
        const model = await repository.findById(1) as ModelInterface;
        expect(model.toJSON()).toEqual({ id: 1, title: 'todo 1', status: 0 });

        model.set({ status: 1 });
        const returned = await repository.update(model);
        expect(returned.toJSON()).toEqual({ id: 1, title: 'todo 1', status: 1 });

        const updated = await repository.findById(1) as ModelInterface;
        expect(updated.toJSON()).toEqual({ id: 1, title: 'todo 1', status: 1 });
    });

    test('Repository.findById', async () => {
        const repository = TodoRepository();
        const model = await repository.findById(3) as ModelInterface;
        expect(model.toJSON()).toEqual({ id: 3, title: 'todo 3', status: 1 });
    });

    test('Repository.deleteById', async () => {
        const repository = TodoRepository();

        const model = await repository.findById(2) as ModelInterface;
        expect(model.toJSON()).toEqual({ id: 2, title: 'todo 2', status: 0 });

        await repository.deleteById(2);
        const deleted = await repository.findById(2);
        expect(deleted).toEqual(null);
    });


    test('Repository.create', async () => {
        const newModel = TodoModel({
            properties: {
                title: 'todo 4',
                status: 0,
            },
        });
        const repository = TodoRepository();
        const created = await repository.create(newModel);
        expect(created.toJSON()).toEqual({ id: 4, title: 'todo 4', status: 0 });
    });


    test('Repository.createAll', async () => {
        const models = [
            TodoModel({
                properties: {
                    title: 'todo 4',
                    status: 0,
                },
            }),
            TodoModel({
                properties: {
                    title: 'todo 5',
                    status: 0,
                },
            }),
        ];
        const repository = TodoRepository();
        const createdArray = await repository.createAll(models);
        expect(createdArray.map(i => i.toJSON())).toEqual([
            { id: 4, title: 'todo 4', status: 0 },
            { id: 5, title: 'todo 5', status: 0 },
        ]);
    });
});