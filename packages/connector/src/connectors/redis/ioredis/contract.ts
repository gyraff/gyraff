import { StorageConnectorFactoryType, StorageConnectorInterface } from '../../contract';
import { Redis, RedisOptions } from 'ioredis';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IORedisStorageConnectorInterface extends StorageConnectorInterface {
    getConnection(): Promise<Redis>;
    createConnection(): Promise<Redis>;
    getConfig(): RedisOptions;
    init(args: { config: RedisOptions }): void;
}

export type IORedisStorageConnectorFactoryType = StorageConnectorFactoryType<IORedisStorageConnectorInterface>;
