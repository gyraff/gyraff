import { cloneDeep, isPlainObject, merge } from 'lodash';
import { ModelFactoryType, ModelInterface } from './contract';
import { ModelError } from './error';
import { ModelValidatorError } from './error/model-validator-error';
import { Validator, ValidatorError } from '@gyraff/validator';
import { ComposableFactory } from '@gyraff/factory';

const validator = Validator();

export const Model: ModelFactoryType = ComposableFactory<ModelInterface>({
    properties: {},
    schema: {},
    init({ properties }) {
        if (!this.schema || !Object.keys(this.schema).length) {
            throw new ModelError('Model schema is required');
        }
        if (typeof properties === 'object' && Object.keys(properties).length) {
            this.set(properties);
        }
    },
    set(properties: object) {
        if (!isPlainObject(properties) || !Object.keys(properties).length) {
            throw new ModelValidatorError('Invalid model properties parameter');
        }
        const newProperties = merge(cloneDeep(this.properties), properties);
        try {
            validator.validate(newProperties, this.schema);
            this.properties = newProperties;
        } catch (e) {
            if (e instanceof ValidatorError) {
                throw new ModelValidatorError({
                    message: e.message,
                    details: {
                        ...e.details,
                        model: this.constructor.name,
                    },
                });
            }
            throw e;
        }
    },
    setProperty(key: string, value: any): ModelInterface {
        this.set({ [key]: value });
        return this;
    },
    getProperty(key: string): any {
        if (this.properties.hasOwnProperty(key)) {
            const property = this.properties[key];
            return cloneDeep(property);
        }
        return undefined;
    },
    toJSON(): object {
        return cloneDeep(this.properties);
    },
});
