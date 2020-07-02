import { ApplicationConfigInterface } from './application/contract';

export const defaultConfig: ApplicationConfigInterface = {
    env: process.env.NODE_ENV || 'development',
    port: Number(process.env.GYRAFF_APP_PORT) || 3000,
    logger: {},
    baseDir: process.env.GYRAFF_BASE_DIR as string,
};
