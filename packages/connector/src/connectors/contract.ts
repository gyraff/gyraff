import { ComposableInterface } from '@gyraff/factory';

export interface StorageConnectorInterface {
    config: any;
    connection: any;
    getConfig(): any;
    getConnection(): Promise<any>;
    createConnection(): Promise<any>;
    init(args: { config: any }): void;
}

export type StorageConnectorFactoryType<
    T extends StorageConnectorInterface = StorageConnectorInterface
> = ComposableInterface<T>;
