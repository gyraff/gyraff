import Knex from 'knex';
import {RDMSStorageConnectorFactoryType, RDMSStorageConnectorInterface} from './contract';
import { StorageConnectorError } from '../../error';
import { StorageConnector } from '../connector';

export const RDMSStorageConnector: RDMSStorageConnectorFactoryType = StorageConnector.compose<RDMSStorageConnectorInterface>({
    async createConnection() {
        const connection = Knex(this.getConfig());

        // Verify the connection before proceeding
        try {
            await connection.raw('SELECT now();');
            return connection;
        } catch (error) {
            throw new StorageConnectorError(
                `Unable to connect via Knex. Ensure a valid connection. Error message: ${error.message}`,
            );
        }
    },
});
