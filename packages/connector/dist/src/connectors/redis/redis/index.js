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
exports.RedisStorageConnector = void 0;
const redis_1 = require("redis");
const error_1 = require("../../../error");
const connector_1 = require("../../connector");
exports.RedisStorageConnector = connector_1.StorageConnector.compose({
    createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const redis = redis_1.createClient(this.getConfig());
                redis.on('ready', () => resolve(redis));
                redis.on('error', (err) => {
                    reject(new error_1.StorageConnectorError(err.message));
                });
            });
        });
    },
});
//# sourceMappingURL=index.js.map