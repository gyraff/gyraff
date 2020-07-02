"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$UnsupportedMediaTypeError = void 0;
const error_1 = require("@gyraff/error");
function $UnsupportedMediaTypeError() {
    return class UnsupportedMediaTypeError extends error_1.HttpError {
        constructor(params = {}) {
            super(params, {
                message: 'UNSUPPORTED_MEDIA_TYPE_ERROR',
                httpStatusCode: 415,
            });
        }
    };
}
exports.$UnsupportedMediaTypeError = $UnsupportedMediaTypeError;
//# sourceMappingURL=unsupported-media-type-error.js.map