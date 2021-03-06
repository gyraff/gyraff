---
to: <%= outDir  %>/<%= name %>/src/config/default.ts
unless_exists: true
---
import { ApplicationConfigInterface } from '@gyraff/core';
import * as path from 'path';
import { existsSync, mkdirSync } from 'fs';
import { format, transports } from 'winston';

const baseDir = `${__dirname}/../../`;
const dataDir = `${baseDir}/data`;

const loggerConfig = () => {
    const logDir = process.env.GYRAFF_LOGS_DIR || `${dataDir}/logs`;
    if (!existsSync(logDir)) mkdirSync(logDir);
    const commonOptions = {
        format: format.combine(format.timestamp(), format.json())
    };
    return {
        transports: [
            new transports.File({
                ...commonOptions,
                filename: `${logDir}/combined.log`,
                level: 'silly',
            }),
            new transports.File({
                ...commonOptions,
                filename: `${logDir}/error.log`,
                level: 'error',
            }),
            new transports.Console({
                ...commonOptions,
                level: 'silly',
                format: format.combine(
                    format.colorize(),
                    format.timestamp(),
                    format.printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`),
                ),
            })
        ]
    }
}

export const config: ApplicationConfigInterface = {
    baseDir,
    logger: loggerConfig(),
    connectors: {
        SQLiteStorageConnector: {
            client: 'sqlite3',
            useNullAsDefault: true,
            debug: false,
            connection: {
                filename: `${baseDir}/data/storage/SQLiteStorage/app.db`,
            },
        },
        MySQLStorageConnector: {
            client: 'mysql',
            useNullAsDefault: true,
            debug: false,
            connection: {
                host: process.env.GYRAFF_MYSQL_HOST || 'localhost',
                user: process.env.GYRAFF_MYSQL_USER || 'root',
                password: process.env.GYRAFF_MYSQL_PASSWORD || 'password',
                database: process.env.GYRAFF_MYSQL_DATABASE || 'my-app-db'
            },
        },
    },
    migration: {
        SQLiteStorageConnector: {
            dir: process.env.GYRAFF_SQLITE_MIGRATION_DIR || path.normalize(`${__dirname}/../../data/storage/SQLiteStorage/migrations`),
            autoMigrate: true,
        },
        MySQLStorageConnector: {
            dir: process.env.GYRAFF_MYSQL_MIGRATION_DIR || path.normalize(`${__dirname}/../../data/storage/MySQLStorage/migrations`),
            autoMigrate: true,
        },
    },
};
