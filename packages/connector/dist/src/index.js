"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnector = exports.getConnectorsNames = exports.setConfig = exports.registerConnector = void 0;
const sqlite_1 = require("./connectors/rdms/sqlite");
const ioredis_1 = require("./connectors/redis/ioredis");
const redis_1 = require("./connectors/redis/redis");
const error_1 = require("./error");
let config;
const connectors = {
    SQLiteStorageConnector: sqlite_1.SQLiteStorageConnector,
    IORedisStorageConnector: ioredis_1.IORedisStorageConnector,
    RedisStorageConnector: redis_1.RedisStorageConnector,
};
const connectorsInstances = {};
function registerConnector(name, connector) {
    const ctrs = connectors;
    if (ctrs[name]) {
        throw new error_1.StorageConnectorError(`A connector with name [${name}] already exists.`);
    }
    ctrs[name] = connector;
}
exports.registerConnector = registerConnector;
function setConfig(cfg) {
    if (!cfg)
        throw new error_1.StorageConnectorError('[config] is required.');
    if (config)
        throw new error_1.StorageConnectorError('Already configured.');
    config = cfg;
}
exports.setConfig = setConfig;
function getConnectorsNames() {
    return Object.keys(connectors);
}
exports.getConnectorsNames = getConnectorsNames;
function getConnector(name) {
    if (!connectorsInstances[name]) {
        if (!config) {
            throw new error_1.StorageConnectorError(`[config] is missing. Use first setConfig() to provide a configuration.`);
        }
        const connectorsCfg = config.connectors;
        if (!connectorsCfg[name]) {
            throw new error_1.StorageConnectorError(`[config.connectors.${name}] has not been defined`);
        }
        if (!connectors[name]) {
            throw new error_1.StorageConnectorError(`[${name}] has not been defined`);
        }
        const connectorConfig = connectorsCfg[name];
        connectorsInstances[name] = connectors[name]({ config: connectorConfig });
    }
    return connectorsInstances[name];
}
exports.getConnector = getConnector;
//# sourceMappingURL=index.js.map