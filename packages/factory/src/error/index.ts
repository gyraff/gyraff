import { ApplicationError, ApplicationErrorConstructorParamsType } from '@gyraff/error';

export class ComposableFactoryError extends ApplicationError {
    constructor(params: ApplicationErrorConstructorParamsType) {
        super(params, {
            message: 'GYRAFF_FACTORY_ERROR',
        });
    }
}
