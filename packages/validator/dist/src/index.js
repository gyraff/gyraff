"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const z_schema_1 = __importDefault(require("z-schema"));
const factory_1 = require("@gyraff/factory");
const error_1 = require("./error");
exports.Validator = factory_1.ComposableFactory({
    validator: null,
    init({ opts = {} }) {
        this.validator = new z_schema_1.default(Object.assign(Object.assign({}, opts), { breakOnFirstError: true }));
    },
    validate(data, schema, throwException = true) {
        const valid = this.validator.validate(data, schema);
        if (!valid && throwException) {
            const error = this.validator.getLastError();
            throw new error_1.ValidatorError({
                details: Object.assign({}, error.details),
            });
        }
        return valid;
    },
    getLastErrorDetails() {
        var _a;
        const e = (_a = this.validator) === null || _a === void 0 ? void 0 : _a.getLastError();
        if (e) {
            return e.details;
        }
        return null;
    },
    getLastError() {
        var _a;
        const e = (_a = this.validator) === null || _a === void 0 ? void 0 : _a.getLastError();
        if (e) {
            return e;
        }
        return null;
    },
});
//# sourceMappingURL=index.js.map