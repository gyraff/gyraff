import Router = require('koa-router');
import * as winston from 'winston';
import { injector } from '@gyraff/injector';
import { ApplicationErrorConstructorInterface } from '@gyraff/error';
import glob from 'glob';
import { join, relative, resolve as resolvePath } from 'path';
import { RouterInterface } from './contract';

module.exports = function $router(
    logger: winston.Logger,
    NotFoundError: ApplicationErrorConstructorInterface,
): RouterInterface {
    async function registerRoutes(router: Router, files: string[], dir: string): Promise<Router> {
        for (const file of files) {
            const fileRouter = new Router();
            const module = await import(`${dir}/${file}`);
            if (Object.keys(module).length !== 1) {
                throw new Error(`Invalid route file. A route file must export only one service factory.`);
            }
            const fn = Object.values(module).pop();
            const r = injector.parse(fn);
            if (typeof r === 'boolean') {
                throw new Error(`Route definition seems to be invalid, filename [${file}]`);
            }
            const { fnName } = r;
            injector.get(fnName)(fileRouter);
            const routePath = file.slice(0, -3);
            router.use(`/${routePath}`, fileRouter.routes());
        }
        return router;
    }
    return {
        async init(app, dir): Promise<void> {
            const routeFiles: string[] = await new Promise((resolve, reject) => {
                const absolutePath = resolvePath(dir);
                glob(join(absolutePath, '/**/*.?(js|ts)'), (err, files) => {
                    if (err) reject(err);
                    else {
                        const modules = files.map((i) => relative(absolutePath, i));
                        resolve(modules);
                    }
                });
            });
            const api = await registerRoutes(new Router(), routeFiles, dir);
            app.use(api.routes());
            app.use(api.allowedMethods());

            // Catch all non existing routes
            app.use((ctx) => {
                logger.warn('Route not found:', ctx.request.toJSON());
                throw new NotFoundError({
                    message: 'Invalid URI. The resource you are requesting does not exist!',
                });
            });
        },
    };
};
