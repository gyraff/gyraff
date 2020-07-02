export interface MigrationConfigInterface {
    [connector: string]: {
        dir: string;
        autoMigrate: boolean;
        seeds?: {
            dir: string;
            autoSeed: boolean;
        };
    };
}

export interface ConfigInterface {
    migration: MigrationConfigInterface;
}
