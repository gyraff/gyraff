import {RDMSStorageFactoryInitParamsType, RDMSStorageFactoryType, RDMSStorageInterface} from '../contract';
import {SQLiteStorageConnectorType} from "@gyraff/connector";

export interface SQLiteStorageInterface extends RDMSStorageInterface {
    storageConnector: SQLiteStorageConnectorType | null;
    init(params: SQLiteStorageFactoryInitParamsInterface): void;
}

export interface SQLiteStorageFactoryInitParamsInterface extends RDMSStorageFactoryInitParamsType {
    storageConnector: SQLiteStorageConnectorType;
}

export type SQLiteStorageFactoryType = RDMSStorageFactoryType<SQLiteStorageInterface>;
