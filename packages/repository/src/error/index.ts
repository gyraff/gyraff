import { ApplicationError, ApplicationErrorConstructorParamsType } from '@gyraff/error';

export class RepositoryError extends ApplicationError {
    constructor(params: ApplicationErrorConstructorParamsType) {
        super(params, {
            message: 'GYRAFF_REPOSITORY_ERROR',
        });
    }
}
