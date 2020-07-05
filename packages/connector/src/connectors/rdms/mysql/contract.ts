import {RDMSStorageConnectorFactoryType, RDMSStorageConnectorInterface} from "../contract";

export type MySQLStorageConnectorType = RDMSStorageConnectorInterface;

export type MySQLStorageConnectorFactoryType = RDMSStorageConnectorFactoryType<MySQLStorageConnectorType>