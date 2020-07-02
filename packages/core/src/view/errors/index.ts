import {
    HttpError,
    HttpErrorConstructorInterface, HttpErrorConstructorParamsType,
} from '@gyraff/error';

export function $ViewError(): HttpErrorConstructorInterface {
    return class ViewError extends HttpError {
        constructor(params: HttpErrorConstructorParamsType = {}) {
            super(params, {
                message: 'GYRAFF_VIEW_ERROR',
                httpStatusCode: 500,
            });
        }
    };
}
