"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectorError = void 0;
const error_1 = require("@gyraff/error");
class InjectorError extends error_1.ApplicationError {
    constructor(params) {
        super(params, {
            message: 'GYRAFF_INJECTOR_ERROR',
        });
    }
}
exports.InjectorError = InjectorError;
//# sourceMappingURL=index.js.map