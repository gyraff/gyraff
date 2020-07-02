import {HttpError, HttpErrorConstructorInterface, HttpErrorConstructorParamsType} from '@gyraff/error';

export function $NotAcceptableError(): HttpErrorConstructorInterface {
    return class NotAcceptableError extends HttpError {
        constructor(params: HttpErrorConstructorParamsType = {}) {
            super(params, {
                message: 'NOT_ACCEPTABLE_ERROR',
                httpStatusCode: 406,
            });
        }
    };
}
