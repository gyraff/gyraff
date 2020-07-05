import { ApplicationError, ApplicationErrorInterface, ApplicationErrorConstructorParamsType } from '@gyraff/error';
import { StorageConnectorFactoryType, StorageConnectorInterface } from '../src/connectors/contract';
import { ConfigInterface } from '../src/config/contract';

export { StorageConnectorFactoryType, StorageConnectorInterface } from '../src/connectors/contract';
export { ConfigInterface } from '../src/config/contract';
export { RDMSStorageConnectorInterface, RDMSStorageConnectorFactoryType } from '../src/connectors/rdms/contract';
export { MySQLStorageConnectorFactoryType, MySQLStorageConnectorType } from '../src/connectors/rdms/mysql/contract';
export { SQLiteStorageConnectorFactoryType, SQLiteStorageConnectorType } from '../src/connectors/rdms/sqlite/contract';
export {
    RedisStorageConnectorInterface,
    RedisStorageConnectorFactoryType,
} from '../src/connectors/redis/redis/contract';
export {
    IORedisStorageConnectorInterface,
    IORedisStorageConnectorFactoryType,
} from '../src/connectors/redis/ioredis/contract';
export const StorageConnector: StorageConnectorFactoryType;
export class StorageConnectorError extends ApplicationError {
    new(params: ApplicationErrorConstructorParamsType): ApplicationErrorInterface;
}
export function getConnector(name: string): StorageConnectorInterface;
export function setConfig(cfg: ConfigInterface): void;
export function registerConnector(name: string, connector: StorageConnectorFactoryType): void;
