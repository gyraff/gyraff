"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
exports.defaultConfig = {
    env: process.env.NODE_ENV || 'development',
    port: Number(process.env.GYRAFF_APP_PORT) || 3000,
    logger: {},
    baseDir: process.env.GYRAFF_BASE_DIR,
};
//# sourceMappingURL=default.js.map