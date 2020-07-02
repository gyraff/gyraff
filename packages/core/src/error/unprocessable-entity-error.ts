import {HttpError, HttpErrorConstructorInterface, HttpErrorConstructorParamsType} from '@gyraff/error';

export function $UnprocessableEntityError(): HttpErrorConstructorInterface {
    return class UnprocessableEntityError extends HttpError {
        constructor(params: HttpErrorConstructorParamsType = {}) {
            super(params, {
                message: 'UNPROCESSABLE_ENTITY_ERROR',
                httpStatusCode: 422,
            });
        }
    };
}
