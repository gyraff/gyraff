import {ControllerFactoryType, ControllerInterface} from './contract';
import { Context } from 'koa';
import { ComposableFactory } from '@gyraff/factory';
import { HttpErrorConstructorInterface } from '@gyraff/error';

export function $Controller(InternalServerError: HttpErrorConstructorInterface): ControllerFactoryType {
    return ComposableFactory<ControllerInterface>({
        View: null,
        requireValidation: true,
        init() {
            if (!this.View) {
                throw new InternalServerError('View factory is required');
            }
        },
        action(method) {
            return async (ctx: Context): Promise<void> => {
                this.validate(method, ctx);
                const controller = (this as any);
                if (!controller[method]) {
                    throw new InternalServerError('Controller action is undefined');
                }
                ctx.state.responseAlreadySent = false;
                const data: object = await controller[method](ctx);
                if (!ctx.state.responseAlreadySent) {
                    const view = this.getView(ctx) as any;
                    if (!view[method]) {
                        throw new InternalServerError('The view of the controller action is undefined');
                    }
                    view[method](data);
                }
            };
        },
        getView(ctx: Context) {
            if (!this.View) {
                throw new InternalServerError('View factory is undefined');
            }
            return this.View({ ctx });
        },
        validate(method: string, ctx: Context): void {
            // Only validate the Request if a validator exists
            if (this.Validator) {
                const validator = this.Validator();
                // Only validate the Request is the current action method exists
                if (validator[method]) {
                    validator[method](ctx);
                } else if (this.requireValidation) {
                    throw new InternalServerError(
                        'Request validation is required. Define the validation rules for the current controller action.',
                    );
                }
            } else if (this.requireValidation) {
                throw new InternalServerError('Request validation is required. Provide a validator.');
            }
        },
    });
}
