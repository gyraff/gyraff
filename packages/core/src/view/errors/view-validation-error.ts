import { HttpErrorConstructorInterface, HttpErrorConstructorParamsType } from '@gyraff/error';

export function $ViewValidationError(ViewError: HttpErrorConstructorInterface): HttpErrorConstructorInterface {
    return class ViewValidationError extends ViewError {
        constructor(params?: HttpErrorConstructorParamsType) {
            super(params, {
                message: 'GYRAFF_VIEW_VALIDATION_ERROR',
                httpStatusCode: 500,
            });
        }
    };
}
