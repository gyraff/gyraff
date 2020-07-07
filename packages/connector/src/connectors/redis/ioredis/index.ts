import IORedis, { Redis } from 'ioredis';
import {IORedisStorageConnectorFactoryType, IORedisStorageConnectorInterface} from './contract';
import { StorageConnectorError } from '../../../error';
import { StorageConnector } from '../../connector';

export const IORedisStorageConnector: IORedisStorageConnectorFactoryType = StorageConnector.compose<IORedisStorageConnectorInterface>({
    async createConnection() {
        return new Promise<Redis>((resolve, reject) => {
            const redis = new IORedis(this.getConfig());
            redis.on('ready', () => resolve(redis));
            redis.on('error', (err) => {
                reject(new StorageConnectorError(err.message));
            });
        });
    },
});
