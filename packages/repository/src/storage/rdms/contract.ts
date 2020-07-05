import { StorageInterface } from '../contract';
import { RDMSStorageConnectorInterface } from '@gyraff/connector';
import { ComposableInterface } from '@gyraff/factory';

export interface RDMSStorageInterface extends StorageInterface {
    tableName: string | null;
    storageConnector: RDMSStorageConnectorInterface | null;
    init(params: RDMSStorageFactoryInitParamsType): void;
}

export type RDMSStorageFactoryInitParamsType = {
    tableName: string;
    storageConnector: RDMSStorageConnectorInterface;
};

export type RDMSStorageFactoryType<T extends RDMSStorageInterface = RDMSStorageInterface> = ComposableInterface<T>;
