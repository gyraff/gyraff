"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$AuthenticationError = void 0;
const error_1 = require("@gyraff/error");
function $AuthenticationError() {
    return class AuthenticationError extends error_1.HttpError {
        constructor(params = {}) {
            super(params, {
                message: 'AUTHENTICATION_ERROR',
                httpStatusCode: 401,
            });
        }
    };
}
exports.$AuthenticationError = $AuthenticationError;
//# sourceMappingURL=authentication-error.js.map