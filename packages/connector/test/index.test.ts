import { setConfig, getConnector } from "../src";
import {MongoClient} from "mongodb";
import { config } from "./config";

describe('@gyraff/connector tests', () => {
    test('MongoDBStorageConnector', async () => {
        expect(() => {
            getConnector('MongoDBStorageConnector');
        }).toThrow('[config] is missing. Use first setConfig() to provide a configuration.');
        setConfig(config);
        const connector = getConnector('MongoDBStorageConnector');
        const connection = await connector.getConnection();
        expect(connection instanceof MongoClient).toBe(true);
    });
});