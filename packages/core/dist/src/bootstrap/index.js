"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Bootstrap = void 0;
const http_1 = require("http");
const koa_useragent_1 = require("koa-useragent");
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_1 = __importDefault(require("koa"));
const migration_1 = require("@gyraff/migration");
const injector_1 = require("@gyraff/injector");
const connector_1 = require("@gyraff/connector");
function $Bootstrap(config, logger, router, ErrorsHandlerMiddleware) {
    function initStorageConnectors() {
        return __awaiter(this, void 0, void 0, function* () {
            connector_1.setConfig(config);
        });
    }
    function init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield initStorageConnectors();
            if (config.migration && Object.keys(config.migration).length) {
                logger.info('Running migration and seeding...');
                const migration = migration_1.Migration(config);
                yield migration.migrateAndSeed();
                logger.info('Migration succeeded.');
            }
        });
    }
    function registerMiddlewares(app) {
        app.use(ErrorsHandlerMiddleware);
        app.use(koa_bodyparser_1.default());
        app.use(koa_useragent_1.userAgent);
        app.use(koa_logger_1.default());
    }
    function applicationBootstrap(app) {
        return __awaiter(this, void 0, void 0, function* () {
            if (injector_1.injector.has('ApplicationBootstrap')) {
                const applicationBootstrap = injector_1.injector.get('ApplicationBootstrap');
                if (typeof applicationBootstrap !== 'function') {
                    throw new Error(`Application bootstrap file must export a function named [bootstrap].`);
                }
                yield applicationBootstrap(app);
            }
        });
    }
    return () => ({
        http() {
            return __awaiter(this, void 0, void 0, function* () {
                yield init();
                const app = new koa_1.default();
                app.proxy = true;
                const server = http_1.createServer(app.callback());
                logger.info('New app instance created');
                logger.info('Registering built-in application middlewares...');
                registerMiddlewares(app);
                logger.info('Built-in application middlewares registered.');
                logger.info('Running application bootstrap if exists...');
                yield applicationBootstrap(app);
                logger.info('Application bootstrapped.');
                logger.info('Registering application routes...');
                const routesDir = `${config.baseDir}/src/routes`;
                yield router.init(app, routesDir);
                logger.info('Application routes registered.');
                return {
                    app,
                    server,
                };
            });
        },
        testing() {
            return __awaiter(this, void 0, void 0, function* () {
                yield init();
            });
        },
    });
}
exports.$Bootstrap = $Bootstrap;
//# sourceMappingURL=index.js.map