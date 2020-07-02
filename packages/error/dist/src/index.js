"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationError = void 0;
class ApplicationError extends Error {
    constructor(params = {}, defaults = {}) {
        super();
        this.params = {};
        this.name = 'ApplicationError';
        this.message = 'APPLICATION_ERROR';
        this.stack = '';
        this.details = {};
        this.name = this.constructor.name;
        if (typeof params === 'string') {
            params = { message: params };
        }
        this.params = Object.assign(Object.assign({}, defaults), params);
        Object.assign(this, this.params);
        typeof Error.captureStackTrace === 'function'
            ? Error.captureStackTrace(this, this.constructor)
            : (this.stack = new Error(this.message).stack);
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            stack: this.stack,
            details: this.details,
        };
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }
}
exports.ApplicationError = ApplicationError;
//# sourceMappingURL=index.js.map