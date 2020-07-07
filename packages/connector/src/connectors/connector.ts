import { ComposableFactory } from '@gyraff/factory';
import { StorageConnectorError } from '../error';
import {StorageConnectorFactoryType, StorageConnectorInterface} from './contract';

export const StorageConnector: StorageConnectorFactoryType = ComposableFactory<StorageConnectorInterface>({
    config: null,

    connection: null,

    init({ config }) {
        if (!config) {
            throw new StorageConnectorError('[config] is required');
        }
        this.config = config;
    },

    getConfig() {
        return this.config;
    },

    async createConnection() {
        throw new StorageConnectorError(`Method not implemented`);
    },

    async getConnection() {
        if (!this.connection) {
            const conn = await this.createConnection();
            this.connection = conn;
        }
        return this.connection;
    },
});
