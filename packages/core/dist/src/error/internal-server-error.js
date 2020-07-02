"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$InternalServerError = void 0;
const error_1 = require("@gyraff/error");
function $InternalServerError() {
    return class InternalServerError extends error_1.HttpError {
        constructor(params = {}) {
            super(params, {
                message: 'INTERNAL_SERVER_ERROR',
                httpStatusCode: 500,
            });
        }
    };
}
exports.$InternalServerError = $InternalServerError;
//# sourceMappingURL=internal-server-error.js.map