import { ApplicationError, ApplicationErrorConstructorParamsType } from '@gyraff/error';

export class ModelError extends ApplicationError {
    constructor(params: ApplicationErrorConstructorParamsType) {
        super(params, {
            message: 'GYRAFF_MODEL_ERROR',
        });
    }
}
