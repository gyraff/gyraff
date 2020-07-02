import {HttpError, HttpErrorConstructorInterface, HttpErrorConstructorParamsType} from '@gyraff/error';

export function $BadRequestError(): HttpErrorConstructorInterface {
    return class BadRequestError extends HttpError {
        constructor(params: HttpErrorConstructorParamsType = {}) {
            super(params, {
                message: 'BAD_REQUEST_ERROR',
                httpStatusCode: 400,
            });
        }
    };
}
