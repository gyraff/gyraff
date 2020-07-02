"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ViewError = void 0;
const error_1 = require("@gyraff/error");
function $ViewError() {
    return class ViewError extends error_1.HttpError {
        constructor(params = {}) {
            super(params, {
                message: 'GYRAFF_VIEW_ERROR',
                httpStatusCode: 500,
            });
        }
    };
}
exports.$ViewError = $ViewError;
//# sourceMappingURL=index.js.map