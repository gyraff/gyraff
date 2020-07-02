"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$PayloadTooLargeError = void 0;
const error_1 = require("@gyraff/error");
function $PayloadTooLargeError() {
    return class PayloadTooLargeError extends error_1.HttpError {
        constructor(params = {}) {
            super(params, {
                message: 'PAYLOAD_TOO_LARGE_ERROR',
                httpStatusCode: 413,
            });
        }
    };
}
exports.$PayloadTooLargeError = $PayloadTooLargeError;
//# sourceMappingURL=payload-too-large-error.js.map