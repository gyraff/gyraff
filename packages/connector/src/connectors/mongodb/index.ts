import {MongoDBConfigInterface, MongoDBConnectorInterface, MongoDBStorageConnectorFactoryType} from './contract';
import { StorageConnectorError } from '../../error';
import { StorageConnector } from '../connector';
import {MongoClient} from "mongodb";

export const MongoDBStorageConnector: MongoDBStorageConnectorFactoryType = StorageConnector.compose<MongoDBConnectorInterface>({
    async createConnection() {
        return new Promise<MongoClient>((resolve, reject) => {
            const { uri, options }: MongoDBConfigInterface = this.getConfig();
            const client = new MongoClient(uri, options);
            client.connect((err) => {
                if (err) reject(new StorageConnectorError(err.message));
                else resolve(client);
            });
        });
    },
});
