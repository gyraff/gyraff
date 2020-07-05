import { ComposableFactory } from '@gyraff/factory';
import { RDMSStorageInterface } from './contract';
import Knex from 'knex';
import { SQLiteStorageConnectorType } from '@gyraff/connector';
import { RepositoryStorageError } from '../error/storage-error';
import { StorageDataType } from '../contract';

export const RDMSStorage = ComposableFactory<RDMSStorageInterface>({
    tableName: null,
    storageConnector: null,

    init({ tableName, storageConnector }) {
        if (!tableName) {
            throw new RepositoryStorageError('[tableName] is required');
        }
        if (!storageConnector) {
            throw new RepositoryStorageError('[SQLiteStorageConnector] is required');
        }
        this.tableName = tableName;
        this.storageConnector = storageConnector;
    },

    async create(data: StorageDataType, options: { [p: string]: any } = {}) {
        if (typeof data !== 'object') {
            throw new RepositoryStorageError('Invalid [data] parameter type.');
        }
        const connection = await (this.storageConnector as SQLiteStorageConnectorType).getConnection();
        const [id] = await connection(this.tableName as string).insert(data, ['id']);
        if (options.returnId === true) return id;
        return this.findById(id) as StorageDataType;
    },

    async createAll(data: StorageDataType[]): Promise<StorageDataType[]> {
        if (!Array.isArray(data) || !data.length) {
            throw new RepositoryStorageError('Invalid [data] parameter type. Expected a non-empty array.');
        }

        // const connection = await this.SQLiteStorageConnector.getConnection();
        // const ids = await connection(this.tableName).insert(data, ['id']);
        const ids: number[] = [];
        for (const item of data) {
            const id = (await this.create(item, { returnId: true })) as number;
            ids.push(id);
        }
        return this.find((builder: Knex.QueryBuilder) => {
            builder.where('id', 'in', ids);
        });
    },

    async update(data: StorageDataType) {
        if (typeof data !== 'object') {
            throw new RepositoryStorageError('Invalid [data] parameter type.');
        }
        if (!data.id) {
            throw new RepositoryStorageError('Missing [data.id] parameter.');
        }
        const connection = await (this.storageConnector as SQLiteStorageConnectorType).getConnection();
        await connection(this.tableName as string)
            .where({ id: data.id })
            .update(data);
        return this.findById(data.id) as StorageDataType;
    },

    async delete(data: StorageDataType) {
        if (typeof data !== 'object') {
            throw new RepositoryStorageError('Invalid [data] parameter type.');
        }
        if (!data.id) {
            throw new RepositoryStorageError('Missing [data.id] parameter.');
        }
        return this.deleteById(data.id);
    },

    async deleteAll(data: StorageDataType[]) {
        if (!Array.isArray(data) || !data.length) {
            throw new RepositoryStorageError('Invalid [data] parameter type. Expected a non-empty array.');
        }
        const invalidItems = data.filter((i) => !i.id);
        if (invalidItems.length) {
            throw new RepositoryStorageError('Missing ID property is one or more items');
        }
        await this.deleteByIds(data.map((i) => i.id));
    },

    async deleteByIds(ids: number[]) {
        if (!Array.isArray(ids) || !ids.length) {
            throw new RepositoryStorageError('Invalid [ids] parameter type. Expected a non-empty array.');
        }
        const connection = await (this.storageConnector as SQLiteStorageConnectorType).getConnection();
        await connection(this.tableName as string)
            .where('id', 'in', ids)
            .delete();
    },

    async find(filter: object | Function) {
        if (typeof filter !== 'object' && typeof filter !== 'function') {
            throw new RepositoryStorageError('Invalid [data] parameter type.');
        }
        const connection = await (this.storageConnector as SQLiteStorageConnectorType).getConnection();
        return connection.table(this.tableName as string).where(filter);
    },

    async findById(id: number) {
        if (!id) {
            throw new RepositoryStorageError('[id] is required');
        }
        const r = await this.find({ id });
        if (r?.length) return r[0];
        return null;
    },

    async deleteById(id: number) {
        if (!id) {
            throw new RepositoryStorageError('Missing [id] parameter.');
        }
        const connection = await (this.storageConnector as SQLiteStorageConnectorType).getConnection();
        await connection(this.tableName as string)
            .where({ id })
            .delete();
    },

    async count(where: object) {
        const a = await this.find(where);
        return a.length;
    },

    async exists(id: number) {
        const a = await this.findById(id);
        return !!a;
    },
});
