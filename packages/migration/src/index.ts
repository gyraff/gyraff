import { MigrationInterface } from './contract';
import { ComposableFactory } from '@gyraff/factory';
import { getConnector } from '@gyraff/connector';
import { MigrationError } from './error';
import { MigrationConfigInterface } from './config/contract';

export const Migration = ComposableFactory<MigrationInterface>({
    config: null,

    init({ migration }) {
        if (typeof migration !== 'object') {
            throw new MigrationError('[migration] parameter is required');
        }
        if (!Object.keys(migration).length) {
            throw new MigrationError('At least one storage parameters for the migration');
        }
        this.config = migration;
    },

    async migrate(connector, dir): Promise<void> {
        const connection = await connector.getConnection();
        await connection.migrate.latest({ directory: dir });
    },

    async seed(connector, dir): Promise<void> {
        const connection = await connector.getConnection();
        await connection.seed.run({ directory: dir });
    },

    async migrateAndSeed(): Promise<void> {
        for (const connectorName in this.config) {
            const connector = getConnector(connectorName);
            const { autoMigrate, dir, seeds } = (this.config as MigrationConfigInterface)[connectorName];
            if (autoMigrate) {
                if (!dir) {
                    throw new MigrationError(`[migration.${connectorName}.dir] is required`);
                }
                await this.migrate(connector, dir);
            }
            if (seeds) {
                const { autoSeed, dir } = seeds;
                if (autoSeed) {
                    if (!dir) {
                        throw new MigrationError(`[migration.${connectorName}.seeder.dir] is required`);
                    }
                    await this.seed(connector, dir);
                }
            }
        }
    },
});
