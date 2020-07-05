import Knex from 'knex';
import { StorageConnectorFactoryType, StorageConnectorInterface } from '../contract';

export interface RDMSStorageConnectorInterface extends StorageConnectorInterface {
    getConnection(): Promise<Knex>;
    createConnection(): Promise<Knex>;
    getConfig(): Knex.Config;
    init(args: { config: Knex.Config }): void;
}

export type RDMSStorageConnectorFactoryType<T extends RDMSStorageConnectorInterface = RDMSStorageConnectorInterface>
    = StorageConnectorFactoryType<T>;
