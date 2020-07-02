"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelError = void 0;
const error_1 = require("@gyraff/error");
class ModelError extends error_1.ApplicationError {
    constructor(params) {
        super(params, {
            message: 'GYRAFF_MODEL_ERROR',
        });
    }
}
exports.ModelError = ModelError;
//# sourceMappingURL=index.js.map