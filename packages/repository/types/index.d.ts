import { RepositoryFactoryType } from '../src/contract';
import { SQLiteStorageFactoryType } from '../src/storage/rdms/sqlite/contract';
import { ApplicationError, ApplicationErrorInterface, ApplicationErrorConstructorParamsType } from '@gyraff/error';
import { MySQLStorageFactoryType } from "../src/storage/rdms/mysql/contract";

export { RepositoryInterface, RepositoryFactoryType } from '../src/contract';
export { StorageInterface, StorageFactoryType } from '../src/storage/contract';
export { SQLiteStorageInterface, SQLiteStorageFactoryType } from '../src/storage/rdms/sqlite/contract';
export { MySQLStorageInterface, MySQLStorageFactoryType } from '../src/storage/rdms/mysql/contract';
export const Repository: RepositoryFactoryType;
export const SQLiteStorage: SQLiteStorageFactoryType;
export const MySQLStorage: MySQLStorageFactoryType;
export class RepositoryError extends ApplicationError {
    new(params: ApplicationErrorConstructorParamsType): ApplicationErrorInterface;
}
export class RepositoryStorageError extends RepositoryError {}
export class ModelNotFoundError extends RepositoryError {}
