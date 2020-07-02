"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorError = void 0;
const error_1 = require("@gyraff/error");
class ValidatorError extends error_1.ApplicationError {
    constructor(params) {
        super(params, {
            message: 'GYRAFF_VALIDATOR_ERROR',
        });
    }
}
exports.ValidatorError = ValidatorError;
//# sourceMappingURL=index.js.map