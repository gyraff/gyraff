import {RDMSStorageConnectorFactoryType, RDMSStorageConnectorInterface} from "../contract";

export type SQLiteStorageConnectorType = RDMSStorageConnectorInterface;

export type SQLiteStorageConnectorFactoryType = RDMSStorageConnectorFactoryType<SQLiteStorageConnectorType>