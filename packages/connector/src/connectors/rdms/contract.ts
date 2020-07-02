import Knex from 'knex';
import { StorageConnectorFactoryType, StorageConnectorInterface } from '../contract';

export interface KnexStorageConnectorInterface extends StorageConnectorInterface {
    getConnection(): Promise<Knex>;
    createConnection(): Promise<Knex>;
    getConfig(): Knex.Config;
    init(args: { config: Knex.Config }): void;
}

export type KnexStorageConnectorFactoryType = StorageConnectorFactoryType<KnexStorageConnectorInterface>;
