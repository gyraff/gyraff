import { ApplicationError, ApplicationErrorConstructorParamsType } from '@gyraff/error';

export class ValidatorError extends ApplicationError {
    constructor(params: ApplicationErrorConstructorParamsType) {
        super(params, {
            message: 'GYRAFF_VALIDATOR_ERROR',
        });
    }
}
