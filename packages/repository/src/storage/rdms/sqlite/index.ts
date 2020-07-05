import { SQLiteStorageInterface } from './contract';
import {RDMSStorage} from "../index";

export const SQLiteStorage = RDMSStorage.compose<SQLiteStorageInterface>({});
