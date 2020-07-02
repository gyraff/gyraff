"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const lodash_1 = require("lodash");
const error_1 = require("./error");
const model_validator_error_1 = require("./error/model-validator-error");
const validator_1 = require("@gyraff/validator");
const factory_1 = require("@gyraff/factory");
const validator = validator_1.Validator();
exports.Model = factory_1.ComposableFactory({
    properties: {},
    schema: {},
    init({ properties }) {
        if (!this.schema || !Object.keys(this.schema).length) {
            throw new error_1.ModelError('Model schema is required');
        }
        if (typeof properties === 'object' && Object.keys(properties).length) {
            this.set(properties);
        }
    },
    set(properties) {
        if (!lodash_1.isPlainObject(properties) || !Object.keys(properties).length) {
            throw new model_validator_error_1.ModelValidatorError('Invalid model properties parameter');
        }
        const newProperties = lodash_1.merge(lodash_1.cloneDeep(this.properties), properties);
        try {
            validator.validate(newProperties, this.schema);
            this.properties = newProperties;
        }
        catch (e) {
            if (e instanceof validator_1.ValidatorError) {
                throw new model_validator_error_1.ModelValidatorError({
                    message: e.message,
                    details: Object.assign(Object.assign({}, e.details), { model: this.constructor.name }),
                });
            }
            throw e;
        }
    },
    setProperty(key, value) {
        this.set({ [key]: value });
        return this;
    },
    getProperty(key) {
        if (this.properties.hasOwnProperty(key)) {
            const property = this.properties[key];
            return lodash_1.cloneDeep(property);
        }
        return undefined;
    },
    toJSON() {
        return lodash_1.cloneDeep(this.properties);
    },
});
//# sourceMappingURL=index.js.map