import { Middleware } from 'koa';
import { HttpErrorConstructorInterface } from '@gyraff/error';
import {RequireMediaTypeMiddlewareType} from "./contract";

export function $RequireMediaTypeMiddleware(UnsupportedMediaTypeError: HttpErrorConstructorInterface): RequireMediaTypeMiddlewareType {
    return function RequireMediaTypeMiddleware(mediaType: string): Middleware {
        return async (ctx, next): Promise<void> => {
            if (['POST', 'PUT'].indexOf(ctx.request.method) > -1 && !ctx.request.is(mediaType)) {
                throw new UnsupportedMediaTypeError();
            }
            await next();
        };
    };
}
