import { ComposableInterface } from '@gyraff/factory';
import { ConfigInterface, MigrationConfigInterface } from './config/contract';
import { StorageConnectorInterface } from '@gyraff/connector';

export interface MigrationInterface {
    config: MigrationConfigInterface | null;
    migrate: (connector: StorageConnectorInterface, dir: string) => Promise<void>;
    seed: (connector: StorageConnectorInterface, dir: string) => Promise<void>;
    init(args: ConfigInterface): void;
    migrateAndSeed(): Promise<void>;
}

export type MigrationFactoryType<T extends MigrationInterface = MigrationInterface> = ComposableInterface<T>;
