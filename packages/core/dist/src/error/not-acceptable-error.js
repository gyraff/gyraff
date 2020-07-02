"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$NotAcceptableError = void 0;
const error_1 = require("@gyraff/error");
function $NotAcceptableError() {
    return class NotAcceptableError extends error_1.HttpError {
        constructor(params = {}) {
            super(params, {
                message: 'NOT_ACCEPTABLE_ERROR',
                httpStatusCode: 406,
            });
        }
    };
}
exports.$NotAcceptableError = $NotAcceptableError;
//# sourceMappingURL=not-acceptable-error.js.map