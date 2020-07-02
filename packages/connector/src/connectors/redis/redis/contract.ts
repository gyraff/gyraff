import { StorageConnectorFactoryType, StorageConnectorInterface } from '../../contract';
import { ClientOpts, RedisClient } from 'redis';

export interface RedisStorageConnectorInterface extends StorageConnectorInterface {
    getConnection(): Promise<RedisClient>;
    createConnection(): Promise<RedisClient>;
    getConfig(): ClientOpts;
    init(args: { config: ClientOpts }): void;
}

export type RedisStorageConnectorFactoryType = StorageConnectorFactoryType<RedisStorageConnectorInterface>;
