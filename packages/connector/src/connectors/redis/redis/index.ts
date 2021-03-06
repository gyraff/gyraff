import { createClient, RedisClient } from 'redis';
import {RedisStorageConnectorFactoryType, RedisStorageConnectorInterface} from './contract';
import { StorageConnectorError } from '../../../error';
import { StorageConnector } from '../../connector';

export const RedisStorageConnector: RedisStorageConnectorFactoryType = StorageConnector.compose<RedisStorageConnectorInterface>({
    async createConnection() {
        return new Promise<RedisClient>((resolve, reject) => {
            const redis = createClient(this.getConfig());
            redis.on('ready', () => resolve(redis));
            redis.on('error', (err) => {
                reject(new StorageConnectorError(err.message));
            });
        });
    },
});
