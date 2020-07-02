"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComposableFactoryError = void 0;
const error_1 = require("@gyraff/error");
class ComposableFactoryError extends error_1.ApplicationError {
    constructor(params) {
        super(params, {
            message: 'GYRAFF_FACTORY_ERROR',
        });
    }
}
exports.ComposableFactoryError = ComposableFactoryError;
//# sourceMappingURL=index.js.map