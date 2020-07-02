import ZSchema from 'z-schema';
import { ComposableFactory } from '@gyraff/factory';
import { ValidatorInterface } from './contract';
import { ValidatorError } from './error';

export const Validator = ComposableFactory<ValidatorInterface>({
    validator: null,
    init({ opts = {} }) {
        this.validator = new ZSchema({
            ...opts,
            // forceProperties: true,
            breakOnFirstError: true,
        });
    },
    validate(data, schema, throwException = true) {
        const valid = (this.validator as ZSchema).validate(data, schema);
        if (!valid && throwException) {
            const error = (this.validator as ZSchema).getLastError();
            throw new ValidatorError({
                details: {
                    ...error.details,
                },
            });
        }
        return valid;
    },
    getLastErrorDetails() {
        const e = this.validator?.getLastError();
        if (e) {
            return e.details;
        }
        return null;
    },
    getLastError() {
        const e = this.validator?.getLastError();
        if (e) {
            return e;
        }
        return null;
    },
});
