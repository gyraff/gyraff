"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$View = void 0;
const validator_1 = require("@gyraff/validator");
const error_1 = require("@gyraff/error");
const factory_1 = require("@gyraff/factory");
function $View(config, ViewValidationError, InternalServerError) {
    function validate(data, schema, opts = {}) {
        try {
            const validator = validator_1.Validator({ opts });
            validator.validate(data, schema);
        }
        catch (e) {
            if (e instanceof validator_1.ValidatorError) {
                throw new ViewValidationError({ details: e.details });
            }
            throw e;
        }
    }
    function toJSON(i) {
        if (typeof i === 'object' && i.toJSON) {
            return i.toJSON();
        }
        return i;
    }
    return factory_1.ComposableFactory({
        init({ ctx }) {
            if (!ctx) {
                throw new Error('[ctx] is required');
            }
            this.ctx = ctx;
        },
        actionView(data, schema, responseParams = {}, schemaValidationOptions = {}) {
            const json = Array.isArray(data) ? data.map((item) => toJSON(item)) : toJSON(data);
            validate(json, schema, schemaValidationOptions);
            return this.renderActionView(Object.assign(Object.assign({}, responseParams), { body: { data: json } }));
        },
        renderActionView(response) {
            var _a;
            if ((_a = this.ctx) === null || _a === void 0 ? void 0 : _a.state.responseAlreadySent) {
                throw new InternalServerError('RESPONSE_ALREADY_SENT');
            }
            Object.assign(this.ctx, response);
            this.ctx.state.responseAlreadySent = true;
        },
        renderError(err) {
            const error = {
                message: err.message,
                name: err.name,
                code: 500,
                details: {},
            };
            if (err instanceof error_1.ApplicationError) {
                if (err instanceof error_1.HttpError)
                    error.code = err.httpStatusCode;
                error.details = err.details;
            }
            if (config.env !== 'production' && !(err instanceof error_1.ApplicationError)) {
                error.message = 'INTERNAL_SERVER_ERROR';
            }
            this.renderActionView({
                status: error.code,
                body: {
                    error,
                },
            });
        },
    });
}
exports.$View = $View;
//# sourceMappingURL=index.js.map