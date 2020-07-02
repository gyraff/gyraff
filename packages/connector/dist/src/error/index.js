"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageConnectorError = void 0;
const error_1 = require("@gyraff/error");
class StorageConnectorError extends error_1.ApplicationError {
    constructor(params) {
        super(params, {
            message: 'GYRAFF_STORAGE_CONNECTOR_ERROR',
        });
    }
}
exports.StorageConnectorError = StorageConnectorError;
//# sourceMappingURL=index.js.map