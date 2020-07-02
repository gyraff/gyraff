import { ApplicationError, ApplicationErrorConstructorParamsType } from '@gyraff/error';

export class InjectorError extends ApplicationError {
    constructor(params: ApplicationErrorConstructorParamsType) {
        super(params, {
            message: 'GYRAFF_INJECTOR_ERROR',
        });
    }
}
