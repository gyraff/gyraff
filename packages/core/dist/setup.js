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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const dotenv_1 = require("dotenv");
const loader_1 = require("./src/config/loader");
const fs_1 = require("fs");
const injector_1 = require("@gyraff/injector");
const logger_1 = require("@gyraff/logger");
dotenv_1.config();
function setup(configDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const applicationConfig = yield loader_1.loader(configDir);
        injector_1.injector.value('applicationConfig', applicationConfig);
        yield injector_1.injector.autoResolve(`${__dirname}/src`);
        const config = injector_1.injector.get('config');
        const logger = logger_1.Logger(config);
        injector_1.injector.value('logger', logger);
        if (!config.baseDir || !fs_1.existsSync(config.baseDir)) {
            throw new Error('Application base directory has not been provided or does not exists');
        }
        const srcDir = `${config.baseDir}/src`;
        if (!fs_1.existsSync(srcDir)) {
            throw new Error(`Application [src] directory does not exist under [${config.baseDir}] dir`);
        }
        yield injector_1.injector.autoResolve(srcDir);
    });
}
exports.setup = setup;
//# sourceMappingURL=setup.js.map