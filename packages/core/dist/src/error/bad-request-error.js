"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$BadRequestError = void 0;
const error_1 = require("@gyraff/error");
function $BadRequestError() {
    return class BadRequestError extends error_1.HttpError {
        constructor(params = {}) {
            super(params, {
                message: 'BAD_REQUEST_ERROR',
                httpStatusCode: 400,
            });
        }
    };
}
exports.$BadRequestError = $BadRequestError;
//# sourceMappingURL=bad-request-error.js.map