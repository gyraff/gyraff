import { StorageConnectorFactoryType, StorageConnectorInterface } from '../contract';
import { MongoClient, MongoClientOptions } from "mongodb";

export interface MongoDBConfigInterface {
    uri: string;
    options: MongoClientOptions;
}

export interface MongoDBConnectorInterface extends StorageConnectorInterface {
    getConnection(): Promise<MongoClient>;
    createConnection(): Promise<MongoClient>;
    getConfig(): MongoDBConfigInterface;
    init(args: { config: MongoDBConfigInterface }): void;
}

export type MongoDBStorageConnectorFactoryType = StorageConnectorFactoryType<MongoDBConnectorInterface>;
