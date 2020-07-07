import { RDMSStorageConnector } from '../index';
import {MySQLStorageConnectorFactoryType} from "./contract";

export const MySQLStorageConnector: MySQLStorageConnectorFactoryType = RDMSStorageConnector.compose<{}>({});
