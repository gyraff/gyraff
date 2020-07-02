import { Middleware } from 'koa';
import { HttpErrorConstructorInterface } from '@gyraff/error';

export function $RequireAuthenticationMiddleware(AuthenticationError: HttpErrorConstructorInterface): Middleware {
    return async function RequireAuthenticationMiddleware(ctx, next): Promise<void> {
        if (!ctx.state.user) {
            throw new AuthenticationError();
        }
        await next();
    };
}
