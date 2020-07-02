"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ViewValidationError = void 0;
function $ViewValidationError(ViewError) {
    return class ViewValidationError extends ViewError {
        constructor(params) {
            super(params, {
                message: 'GYRAFF_VIEW_VALIDATION_ERROR',
                httpStatusCode: 500,
            });
        }
    };
}
exports.$ViewValidationError = $ViewValidationError;
//# sourceMappingURL=view-validation-error.js.map