import Knex from 'knex';
import { RDMSStorageConnector } from '../index';
import { StorageConnectorError } from '../../../error';

export const SQLiteStorageConnector = RDMSStorageConnector.compose<{}>({
    async createConnection() {
        const config = this.getConfig();
        const connection = Knex(config);

        // Verify the connection before proceeding
        try {
            await connection.raw('SELECT date("now");'); // SELECT now();
            return connection;
        } catch (error) {
            throw new StorageConnectorError('Unable to connect via Knex. Ensure a valid connection.');
        }
    },
});
