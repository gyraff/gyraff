import {
    ApplicationErrorPropertiesInterface,
    ApplicationErrorParamsInterface,
    ApplicationErrorInterface,
} from '../contract';

export interface HttpErrorPropertiesInterface extends ApplicationErrorPropertiesInterface {
    httpStatusCode: number;
}

export interface HttpErrorParamsInterface extends ApplicationErrorParamsInterface {
    httpStatusCode?: number;
}

export type HttpErrorConstructorParamsType = HttpErrorParamsInterface | string;

export interface HttpErrorInterface extends ApplicationErrorInterface, HttpErrorPropertiesInterface {
    toJSON(): HttpErrorPropertiesInterface;
}

export interface HttpErrorConstructorInterface {
    new (params?: HttpErrorConstructorParamsType, defaults?: HttpErrorParamsInterface): HttpErrorInterface;
}
