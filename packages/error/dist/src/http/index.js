"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
const index_1 = require("../index");
class HttpError extends index_1.ApplicationError {
    constructor(params = {}, defaults = {}) {
        super(params, defaults);
        this.httpStatusCode = 500;
        this.httpStatusCode = this.params.httpStatusCode || this.httpStatusCode;
    }
    toJSON() {
        return {
            name: this.name,
            httpStatusCode: this.httpStatusCode,
            message: this.message,
            stack: this.stack,
            details: this.details,
        };
    }
}
exports.HttpError = HttpError;
//# sourceMappingURL=index.js.map