import {
    ApplicationErrorInterface,
    ApplicationErrorConstructorParamsType,
    ApplicationErrorParamsInterface,
    ApplicationErrorPropertiesInterface,
} from './contract';

export class ApplicationError extends Error implements ApplicationErrorInterface {
    /**
     *
     */
    protected params: { [p: string]: any } = {};

    /**
     *
     */
    name = 'ApplicationError';

    /**
     *
     */
    message = 'APPLICATION_ERROR';

    /**
     *
     */
    stack = '';

    /**
     *
     */
    details = {};

    /**
     *
     * @param params
     * @param defaults
     */
    constructor(params: ApplicationErrorConstructorParamsType = {}, defaults: ApplicationErrorParamsInterface = {}) {
        super();
        this.name = this.constructor.name;
        if (typeof params === 'string') {
            // eslint-disable-next-line no-param-reassign
            params = { message: params };
        }
        this.params = {
            ...defaults,
            ...params,
        };
        Object.assign(this, this.params);
        typeof Error.captureStackTrace === 'function'
            ? Error.captureStackTrace(this, this.constructor)
            : (this.stack = new Error(this.message).stack as string);
    }

    toJSON(): ApplicationErrorPropertiesInterface {
        return {
            name: this.name,
            message: this.message,
            stack: this.stack,
            details: this.details,
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}
