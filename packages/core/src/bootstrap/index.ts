import { createServer, Server } from 'http';
import { userAgent } from 'koa-useragent';
import { Logger } from 'winston';
import bodyParser from 'koa-bodyparser';
import KoaLogger from 'koa-logger';
import Koa, { Middleware } from 'koa';
import { ConfigInterface } from '../config/contract';
import { RouterInterface } from '../router/contract';
import { Migration } from '@gyraff/migration';
import { injector } from '@gyraff/injector';
import {BootstrapFactoryInterface, BootstrapInterface} from './contract';
import { setConfig } from '@gyraff/connector';

export function $Bootstrap(
    config: ConfigInterface,
    logger: Logger,
    router: RouterInterface,
    ErrorsHandlerMiddleware: Middleware,
): BootstrapFactoryInterface {
    async function initStorageConnectors(): Promise<void> {
        setConfig(config);
    }

    async function init(): Promise<void> {
        await initStorageConnectors();
        if (config.migration && Object.keys(config.migration).length) {
            logger.info('Running migration and seeding...');
            const migration = Migration(config);
            await migration.migrateAndSeed();
            logger.info('Migration succeeded.');
        }
    }

    function registerMiddlewares(app: Koa): void {
        app.use(ErrorsHandlerMiddleware);
        app.use(bodyParser());
        app.use(userAgent);
        app.use(KoaLogger());
    }

    async function applicationBootstrap(app: Koa): Promise<void> {
        if (injector.has('ApplicationBootstrap')) {
            const applicationBootstrap = injector.get('ApplicationBootstrap');
            if (typeof applicationBootstrap !== 'function') {
                throw new Error(`Application bootstrap file must export a function named [bootstrap].`);
            }
            await applicationBootstrap(app);
        }
    }

    return (): BootstrapInterface => ({
        async http(): Promise<{ app: Koa; server: Server }> {
            await init();

            const app = new Koa();
            app.proxy = true;

            const server: Server = createServer(app.callback());
            logger.info('New app instance created');

            logger.info('Registering built-in application middlewares...');
            registerMiddlewares(app);
            logger.info('Built-in application middlewares registered.');

            logger.info('Running application bootstrap if exists...');
            await applicationBootstrap(app);
            logger.info('Application bootstrapped.');

            logger.info('Registering application routes...');
            const routesDir = `${config.baseDir}/src/routes`;
            await router.init(app, routesDir);
            logger.info('Application routes registered.');

            return {
                app,
                server,
            };
        },

        async testing(): Promise<void> {
            await init();
        },
    });
}
