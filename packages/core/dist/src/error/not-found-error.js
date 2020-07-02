"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$NotFoundError = void 0;
const error_1 = require("@gyraff/error");
function $NotFoundError() {
    return class NotFoundError extends error_1.HttpError {
        constructor(params = {}) {
            super(params, {
                message: 'NOT_FOUND_ERROR',
                httpStatusCode: 404,
            });
        }
    };
}
exports.$NotFoundError = $NotFoundError;
//# sourceMappingURL=not-found-error.js.map