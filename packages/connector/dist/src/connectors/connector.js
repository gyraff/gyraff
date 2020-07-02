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
exports.StorageConnector = void 0;
const factory_1 = require("@gyraff/factory");
const error_1 = require("../error");
exports.StorageConnector = factory_1.ComposableFactory({
    config: null,
    connection: null,
    init({ config }) {
        if (!config) {
            throw new error_1.StorageConnectorError('[config] is required');
        }
        this.config = config;
    },
    getConfig() {
        return this.config;
    },
    createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new error_1.StorageConnectorError(`Method not implemented`);
        });
    },
    getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connection) {
                const conn = yield this.createConnection();
                this.connection = conn;
            }
            return this.connection;
        });
    },
});
//# sourceMappingURL=connector.js.map