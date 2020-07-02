import {HttpError, HttpErrorConstructorInterface, HttpErrorConstructorParamsType} from '@gyraff/error';

export function $PayloadTooLargeError(): HttpErrorConstructorInterface {
    return class PayloadTooLargeError extends HttpError {
        constructor(params: HttpErrorConstructorParamsType = {}) {
            super(params, {
                message: 'PAYLOAD_TOO_LARGE_ERROR',
                httpStatusCode: 413,
            });
        }
    };
}
