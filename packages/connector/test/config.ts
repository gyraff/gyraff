import {ConfigInterface} from "../src/config/contract";

export const config: ConfigInterface = {
    connectors: {
        MongoDBStorageConnector: {
            uri: 'mongodb://172.16.120.128',
            options: { useUnifiedTopology: true }
        }
    }
};