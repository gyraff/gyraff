import { ViewFactoryType } from '../../../view/contract';
import * as winston from 'winston';
import { Middleware } from 'koa';
import { ApplicationError } from '@gyraff/error';

export function $ErrorsHandlerMiddleware(View: ViewFactoryType, logger: winston.Logger): Middleware {
    return async function ErrorsHandlerMiddleware(ctx, next): Promise<void> {
        // disable KOA error logging
        ctx.app.silent = true;
        try {
            await next();
        } catch (err) {
            // Log all errors by default
            const errorString =
                err instanceof ApplicationError ? err.toString() : JSON.stringify(err, Object.getOwnPropertyNames(err));
            logger.error(errorString);

            // Unexpected error
            if (!(err instanceof ApplicationError)) {
                ctx.app.emit('error', err, ctx);
            }

            // Send Http response
            const viewInstance = View({ ctx });
            viewInstance.renderError(err);
        }
    };
}
