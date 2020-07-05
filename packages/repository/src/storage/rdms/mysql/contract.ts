import {RDMSStorageFactoryInitParamsType, RDMSStorageFactoryType, RDMSStorageInterface} from '../contract';
import {MySQLStorageConnectorType} from "@gyraff/connector";

export interface MySQLStorageInterface extends RDMSStorageInterface {
    storageConnector: MySQLStorageConnectorType | null;
    init(params: MySQLStorageFactoryInitParamsInterface): void;
}

export interface MySQLStorageFactoryInitParamsInterface extends RDMSStorageFactoryInitParamsType {
    storageConnector: MySQLStorageConnectorType;
}

export type MySQLStorageFactoryType = RDMSStorageFactoryType<MySQLStorageInterface>;
