import {HttpError, HttpErrorConstructorInterface, HttpErrorConstructorParamsType} from '@gyraff/error';

export function $InternalServerError(): HttpErrorConstructorInterface {
    return class InternalServerError extends HttpError {
        constructor(params: HttpErrorConstructorParamsType = {}) {
            super(params, {
                message: 'INTERNAL_SERVER_ERROR',
                httpStatusCode: 500,
            });
        }
    };
}
