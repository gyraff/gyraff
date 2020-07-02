import {HttpError, HttpErrorConstructorInterface, HttpErrorConstructorParamsType} from '@gyraff/error';

export function $NotFoundError(): HttpErrorConstructorInterface {
    return class NotFoundError extends HttpError {
        constructor(params: HttpErrorConstructorParamsType = {}) {
            super(params, {
                message: 'NOT_FOUND_ERROR',
                httpStatusCode: 404,
            });
        }
    };
}
