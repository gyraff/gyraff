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
exports.SQLiteStorageConnector = void 0;
const knex_1 = __importDefault(require("knex"));
const index_1 = require("../index");
const error_1 = require("../../../error");
exports.SQLiteStorageConnector = index_1.RDMSStorageConnector.compose({
    createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = this.getConfig();
            const connection = knex_1.default(config);
            try {
                yield connection.raw('SELECT date("now");');
                return connection;
            }
            catch (error) {
                throw new error_1.StorageConnectorError('Unable to connect via Knex. Ensure a valid connection.');
            }
        });
    },
});
//# sourceMappingURL=sqlite.js.map