"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$UnprocessableEntityError = void 0;
const error_1 = require("@gyraff/error");
function $UnprocessableEntityError() {
    return class UnprocessableEntityError extends error_1.HttpError {
        constructor(params = {}) {
            super(params, {
                message: 'UNPROCESSABLE_ENTITY_ERROR',
                httpStatusCode: 422,
            });
        }
    };
}
exports.$UnprocessableEntityError = $UnprocessableEntityError;
//# sourceMappingURL=unprocessable-entity-error.js.map