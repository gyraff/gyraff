import {HttpError, HttpErrorConstructorInterface, HttpErrorConstructorParamsType} from '@gyraff/error';

export function $ForbiddenError(): HttpErrorConstructorInterface {
    return class ForbiddenError extends HttpError {
        constructor(params: HttpErrorConstructorParamsType = {}) {
            super(params, {
                message: 'FORBIDDEN_ERROR',
                httpStatusCode: 403,
            });
        }
    };
}
