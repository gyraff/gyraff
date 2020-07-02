"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationError = void 0;
const error_1 = require("@gyraff/error");
class MigrationError extends error_1.ApplicationError {
    constructor(params) {
        super(params, {
            message: 'GYRAFF_MIGRATION_ERROR',
        });
    }
}
exports.MigrationError = MigrationError;
//# sourceMappingURL=index.js.map