import {HttpError, HttpErrorConstructorInterface, HttpErrorConstructorParamsType} from '@gyraff/error';

export function $AuthenticationError(): HttpErrorConstructorInterface {
    return class AuthenticationError extends HttpError {
        constructor(params: HttpErrorConstructorParamsType = {}) {
            super(params, {
                message: 'AUTHENTICATION_ERROR',
                httpStatusCode: 401,
            });
        }
    };
}
