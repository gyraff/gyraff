"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryError = void 0;
const error_1 = require("@gyraff/error");
class RepositoryError extends error_1.ApplicationError {
    constructor(params) {
        super(params, {
            message: 'GYRAFF_REPOSITORY_ERROR',
        });
    }
}
exports.RepositoryError = RepositoryError;
//# sourceMappingURL=index.js.map