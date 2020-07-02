import { config } from 'dotenv';
import { loader } from './src/config/loader';
import { existsSync } from 'fs';
import { injector } from '@gyraff/injector';
import { Logger } from '@gyraff/logger';

config();

export async function setup(configDir: string): Promise<void> {
    const applicationConfig = await loader(configDir);
    injector.value('applicationConfig', applicationConfig);
    await injector.autoResolve(`${__dirname}/src`);
    const config = injector.get('config');
    const logger = Logger(config);
    injector.value('logger', logger);
    if (!config.baseDir || !existsSync(config.baseDir)) {
        throw new Error('Application base directory has not been provided or does not exists');
    }
    const srcDir = `${config.baseDir}/src`;
    if (!existsSync(srcDir)) {
        throw new Error(`Application [src] directory does not exist under [${config.baseDir}] dir`);
    }
    await injector.autoResolve(srcDir);
}
