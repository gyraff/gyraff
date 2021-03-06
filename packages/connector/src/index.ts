import { SQLiteStorageConnector } from './connectors/rdms/sqlite/sqlite';
import { IORedisStorageConnector } from './connectors/redis/ioredis';
import { RedisStorageConnector } from './connectors/redis/redis';
import { MySQLStorageConnector } from './connectors/rdms/mysql/mysql';
import { MongoDBStorageConnector } from "./connectors/mongodb";
import { StorageConnectorFactoryType, StorageConnectorInterface } from './connectors/contract';
import { ConfigInterface } from './config/contract';
import { StorageConnectorError } from './error';

let config: ConfigInterface;

const connectors: { [name: string]: StorageConnectorFactoryType } = {
    MySQLStorageConnector,
    SQLiteStorageConnector,
    IORedisStorageConnector,
    RedisStorageConnector,
    MongoDBStorageConnector,
};

const connectorsInstances: { [name: string]: StorageConnectorInterface } = {};

export function registerConnector(name: string, connector: StorageConnectorFactoryType): void {
    if (connectors.hasOwnProperty(name)) {
        throw new StorageConnectorError(`The storage connector [${name}] already exists.`);
    }
    connectors[name] = connector;
}

export function setConfig(cfg: ConfigInterface): void {
    if (!cfg) throw new StorageConnectorError('[config] is required.');
    if (config) throw new StorageConnectorError('Already configured.');
    config = cfg;
}

export function getConnectorsNames(): string[] {
    return Object.keys(connectors);
}

export function getConnector(name: string): StorageConnectorInterface {
    if (!connectorsInstances[name]) {
        if (!config) {
            throw new StorageConnectorError(`[config] is missing. Use first setConfig() to provide a configuration.`);
        }
        if (!config.connectors.hasOwnProperty(name)) {
            throw new StorageConnectorError(`The configuration of the connector [${name}] is undefined. 
            Make sure to save the configuration of the connector under [connectors.${name}] key in your application configuration file.`);
        }
        if (!connectors.hasOwnProperty(name)) {
            throw new StorageConnectorError(`No connector found with such name [${name}]. Make sure the connector name is correct.`);
        }
        const connectorConfig = config.connectors[name];
        connectorsInstances[name] = connectors[name]({ config: connectorConfig });
    }
    return connectorsInstances[name];
}
