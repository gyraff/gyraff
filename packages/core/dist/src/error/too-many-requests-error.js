"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$TooManyRequestsError = void 0;
const error_1 = require("@gyraff/error");
function $TooManyRequestsError() {
    return class TooManyRequestsError extends error_1.HttpError {
        constructor(params = {}) {
            super(params, {
                message: 'TOO_MANY_REQUESTS_ERROR',
                httpStatusCode: 429,
            });
        }
    };
}
exports.$TooManyRequestsError = $TooManyRequestsError;
//# sourceMappingURL=too-many-requests-error.js.map