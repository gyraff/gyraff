import { Context } from 'koa';
import { ComposableInterface } from '@gyraff/factory';

export interface ViewInterface {
    ctx?: Context;
    actionView: (data: object, schema: object, responseParams?: object, schemaValidationOptions?: object) => void;
    renderActionView: (responseParams: object) => void;
    renderError: (err: Error) => void;
    init(args: { ctx: Context }): void;
}

export type ViewFactoryType<T extends ViewInterface = ViewInterface> = ComposableInterface<T>;
