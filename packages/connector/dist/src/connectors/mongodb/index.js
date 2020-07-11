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
exports.MongoDBStorageConnector = void 0;
const error_1 = require("../../error");
const connector_1 = require("../connector");
const mongodb_1 = require("mongodb");
exports.MongoDBStorageConnector = connector_1.StorageConnector.compose({
    createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const { uri, options } = this.getConfig();
                const client = new mongodb_1.MongoClient(uri, options);
                client.connect((err) => {
                    if (err)
                        reject(new error_1.StorageConnectorError(err.message));
                    else
                        resolve(client);
                });
            });
        });
    },
});
//# sourceMappingURL=index.js.map