"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnector = exports.getConnectorsNames = exports.setConfig = exports.registerConnector = void 0;
const sqlite_1 = require("./connectors/rdms/sqlite/sqlite");
const ioredis_1 = require("./connectors/redis/ioredis");
const redis_1 = require("./connectors/redis/redis");
const mysql_1 = require("./connectors/rdms/mysql/mysql");
const error_1 = require("./error");
let config;
const connectors = {
    MySQLStorageConnector: mysql_1.MySQLStorageConnector,
    SQLiteStorageConnector: sqlite_1.SQLiteStorageConnector,
    IORedisStorageConnector: ioredis_1.IORedisStorageConnector,
    RedisStorageConnector: redis_1.RedisStorageConnector,
};
const connectorsInstances = {};
function registerConnector(name, connector) {
    if (connectors.hasOwnProperty(name)) {
        throw new error_1.StorageConnectorError(`The storage connector [${name}] already exists.`);
    }
    connectors[name] = connector;
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
        if (!config.connectors.hasOwnProperty(name)) {
            throw new error_1.StorageConnectorError(`The configuration of the connector [${name}] is undefined. 
            Make sure to save the configuration of the connector under [connectors.${name}] key in your application configuration file.`);
        }
        if (!connectors.hasOwnProperty(name)) {
            throw new error_1.StorageConnectorError(`No connector found with such name [${name}]. Make sure the connector name is correct.`);
        }
        const connectorConfig = config.connectors[name];
        connectorsInstances[name] = connectors[name]({ config: connectorConfig });
    }
    return connectorsInstances[name];
}
exports.getConnector = getConnector;
//# sourceMappingURL=index.js.map