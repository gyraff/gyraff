import { MySQLStorageInterface } from './contract';
import {RDMSStorage} from "../index";

export const MySQLStorage = RDMSStorage.compose<MySQLStorageInterface>({});
