import {HttpError, HttpErrorConstructorInterface, HttpErrorConstructorParamsType} from '@gyraff/error';

export function $UnsupportedMediaTypeError(): HttpErrorConstructorInterface {
    return class UnsupportedMediaTypeError extends HttpError {
        constructor(params: HttpErrorConstructorParamsType = {}) {
            super(params, {
                message: 'UNSUPPORTED_MEDIA_TYPE_ERROR',
                httpStatusCode: 415,
            });
        }
    };
}
