import { StorageInterface } from '../contract';
import { KnexStorageConnectorInterface } from '@gyraff/connector';
import { ComposableInterface } from '@gyraff/factory';

export interface SQLiteStorageInterface extends StorageInterface {
    tableName: string | null;
    knexStorageConnector: KnexStorageConnectorInterface | null;
    init(params: SQLiteStorageFactoryInitParamsType): void;
}

export type SQLiteStorageFactoryInitParamsType = {
    tableName: string;
    knexStorageConnector: KnexStorageConnectorInterface;
};

export type SQLiteStorageFactoryType<T extends SQLiteStorageInterface = SQLiteStorageInterface> = ComposableInterface<
    T
>;
