import { ApplicationError } from '../index';
import {
    HttpErrorConstructorParamsType,
    HttpErrorParamsInterface,
    HttpErrorInterface,
    HttpErrorPropertiesInterface,
} from './contract';

export class HttpError extends ApplicationError implements HttpErrorInterface {
    /**
     *
     */
    httpStatusCode = 500;

    constructor(params: HttpErrorConstructorParamsType = {}, defaults: HttpErrorParamsInterface = {}) {
        super(params, defaults);
        this.httpStatusCode = this.params.httpStatusCode || this.httpStatusCode;
    }

    toJSON(): HttpErrorPropertiesInterface {
        return {
            name: this.name,
            httpStatusCode: this.httpStatusCode,
            message: this.message,
            stack: this.stack,
            details: this.details,
        };
    }
}
