import {HttpError, HttpErrorConstructorInterface, HttpErrorConstructorParamsType} from '@gyraff/error';

export function $TooManyRequestsError(): HttpErrorConstructorInterface {
    return class TooManyRequestsError extends HttpError {
        constructor(params: HttpErrorConstructorParamsType = {}) {
            super(params, {
                message: 'TOO_MANY_REQUESTS_ERROR',
                httpStatusCode: 429,
            });
        }
    };
}
