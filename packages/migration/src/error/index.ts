import { ApplicationError, ApplicationErrorConstructorParamsType } from '@gyraff/error';

export class MigrationError extends ApplicationError {
    constructor(params: ApplicationErrorConstructorParamsType) {
        super(params, {
            message: 'GYRAFF_MIGRATION_ERROR',
        });
    }
}
