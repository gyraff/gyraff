"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ForbiddenError = void 0;
const error_1 = require("@gyraff/error");
function $ForbiddenError() {
    return class ForbiddenError extends error_1.HttpError {
        constructor(params = {}) {
            super(params, {
                message: 'FORBIDDEN_ERROR',
                httpStatusCode: 403,
            });
        }
    };
}
exports.$ForbiddenError = $ForbiddenError;
//# sourceMappingURL=forbidden-error.js.map