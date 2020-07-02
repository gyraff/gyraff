"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = require("winston");
function Logger(config) {
    if (!config) {
        throw new Error('Missing configuration object');
    }
    if (typeof config !== 'object') {
        throw new Error('Invalid configuration argument. Provide a valid configuration object.');
    }
    if (!config.logger) {
        throw Error('Configuration object does not have logging parameters. Logging parameters should be saved under the key [logger]');
    }
    return winston_1.createLogger(config.logger);
}
exports.Logger = Logger;
//# sourceMappingURL=index.js.map