import { ConfigInterface } from '../config/contract';
import { Validator, ValidatorError } from '@gyraff/validator';
import {ViewFactoryType, ViewInterface} from './contract';
import { ApplicationError, HttpError, HttpErrorConstructorInterface } from '@gyraff/error';
import { ComposableFactory } from '@gyraff/factory';
import { Context } from 'koa';

export function $View(
    config: ConfigInterface,
    ViewValidationError: HttpErrorConstructorInterface,
    InternalServerError: HttpErrorConstructorInterface,
): ViewFactoryType {
    function validate(data: object, schema: object, opts: object = {}): void {
        try {
            const validator = Validator({ opts });
            validator.validate(data, schema);
        } catch (e) {
            if (e instanceof ValidatorError) {
                throw new ViewValidationError({ details: e.details });
            }
            throw e;
        }
    }

    function toJSON(i: any): object {
        if (typeof i === 'object' && i.toJSON) {
            return i.toJSON();
        }
        return i;
    }

    return ComposableFactory<ViewInterface>({
        init({ ctx }) {
            if (!ctx) {
                throw new Error('[ctx] is required');
            }
            this.ctx = ctx;
        },

        /**
         *
         * @param data
         * @param schema
         * @param responseParams
         * @param schemaValidationOptions
         */
        actionView(data, schema, responseParams = {}, schemaValidationOptions = {}) {
            const json = Array.isArray(data) ? data.map((item) => toJSON(item)) : toJSON(data);
            validate(json, schema, schemaValidationOptions);
            return this.renderActionView({
                ...responseParams,
                body: { data: json },
            });
        },

        /**
         *
         * @param response
         */
        renderActionView(response) {
            if (this.ctx?.state.responseAlreadySent) {
                throw new InternalServerError('RESPONSE_ALREADY_SENT');
            }
            Object.assign(this.ctx, response);
            (this.ctx as Context).state.responseAlreadySent = true;
        },

        /**
         *
         * @param err
         */
        renderError(err) {
            const error = {
                message: err.message,
                name: err.name,
                code: 500,
                details: {},
            };
            if (err instanceof ApplicationError) {
                if (err instanceof HttpError) error.code = err.httpStatusCode;
                error.details = err.details;
            }
            if (config.env !== 'production' && !(err instanceof ApplicationError)) {
                error.message = 'INTERNAL_SERVER_ERROR';
            }
            this.renderActionView({
                status: error.code,
                body: {
                    error,
                },
            });
        },
    });
}
