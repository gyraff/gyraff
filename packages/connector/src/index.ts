import { SQLiteStorageConnector } from './connectors/rdms/sqlite';
import { IORedisStorageConnector } from './connectors/redis/ioredis';
import { RedisStorageConnector } from './connectors/redis/redis';
import { StorageConnectorFactoryType, StorageConnectorInterface } from './connectors/contract';
import { ConfigInterface } from './config/contract';
import { StorageConnectorError } from './error';

let config: ConfigInterface;

const connectors = {
    SQLiteStorageConnector,
    IORedisStorageConnector,
    RedisStorageConnector,
};

const connectorsInstances: { [name: string]: StorageConnectorInterface } = {};

export function registerConnector(name: string, connector: StorageConnectorFactoryType): void {
    const ctrs = connectors as any;
    if (ctrs[name]) {
        throw new StorageConnectorError(`A connector with name [${name}] already exists.`);
    }
    ctrs[name] = connector;
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
        const connectorsCfg = config.connectors as any;
        if (!connectorsCfg[name]) {
            throw new StorageConnectorError(`[config.connectors.${name}] has not been defined`);
        }
        if (!(connectors as any)[name]) {
            throw new StorageConnectorError(`[${name}] has not been defined`);
        }
        const connectorConfig = connectorsCfg[name];
        connectorsInstances[name] = (connectors as any)[name]({ config: connectorConfig });
    }
    return connectorsInstances[name];
}
