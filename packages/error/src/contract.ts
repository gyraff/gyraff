export interface ApplicationErrorPropertiesInterface extends Error {
    name: string;
    message: string;
    stack: string;
    details: object;
}

export interface ApplicationErrorParamsInterface {
    message?: string;
    details?: object;
}

export type ApplicationErrorConstructorParamsType = ApplicationErrorParamsInterface | string;

export interface ApplicationErrorInterface extends ApplicationErrorPropertiesInterface {
    toJSON(): ApplicationErrorPropertiesInterface;
    toString(): string;
}

export interface ApplicationErrorConstructorInterface {
    new (
        params?: ApplicationErrorConstructorParamsType,
        defaults?: ApplicationErrorParamsInterface,
    ): ApplicationErrorInterface;
}
