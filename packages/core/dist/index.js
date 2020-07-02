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
exports.gyraff = void 0;
const injector_1 = require("@gyraff/injector");
const setup_1 = require("./setup");
function gyraff(configDir) {
    return __awaiter(this, void 0, void 0, function* () {
        yield setup_1.setup(configDir);
        const bootstrap = injector_1.injector.get('Bootstrap')();
        const config = injector_1.injector.get('config');
        const { env, port } = config;
        if (env !== 'test') {
            const { server } = yield bootstrap.http();
            const logger = injector_1.injector.get('logger');
            server.listen(port, () => {
                logger.info(`App running on port ${port}...`);
            });
        }
        else {
            yield bootstrap.testing();
        }
    });
}
exports.gyraff = gyraff;
process.on('unhandledRejection', (error) => {
    console.log('unhandledRejection', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map