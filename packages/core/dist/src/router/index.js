"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Router = require("koa-router");
const injector_1 = require("@gyraff/injector");
const glob_1 = __importDefault(require("glob"));
const path_1 = require("path");
module.exports = function $router(logger, NotFoundError) {
    function registerRoutes(router, files, dir) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const file of files) {
                const fileRouter = new Router();
                const module = yield Promise.resolve().then(() => __importStar(require(`${dir}/${file}`)));
                if (Object.keys(module).length !== 1) {
                    throw new Error(`Invalid route file. A route file must export only one service factory.`);
                }
                const fn = Object.values(module).pop();
                const r = injector_1.injector.parse(fn);
                if (typeof r === 'boolean') {
                    throw new Error(`Route definition seems to be invalid, filename [${file}]`);
                }
                const { fnName } = r;
                injector_1.injector.get(fnName)(fileRouter);
                const routePath = file.slice(0, -3);
                router.use(`/${routePath}`, fileRouter.routes());
            }
            return router;
        });
    }
    return {
        init(app, dir) {
            return __awaiter(this, void 0, void 0, function* () {
                const routeFiles = yield new Promise((resolve, reject) => {
                    const absolutePath = path_1.resolve(dir);
                    glob_1.default(path_1.join(absolutePath, '/**/*.?(js|ts)'), (err, files) => {
                        if (err)
                            reject(err);
                        else {
                            const modules = files.map((i) => path_1.relative(absolutePath, i));
                            resolve(modules);
                        }
                    });
                });
                const api = yield registerRoutes(new Router(), routeFiles, dir);
                app.use(api.routes());
                app.use(api.allowedMethods());
                app.use((ctx) => {
                    logger.warn('Route not found:', ctx.request.toJSON());
                    throw new NotFoundError({
                        message: 'Invalid URI. The resource you are requesting does not exist!',
                    });
                });
            });
        },
    };
};
//# sourceMappingURL=index.js.map