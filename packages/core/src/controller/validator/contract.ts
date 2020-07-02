import { Context } from 'koa';
import { ComposableInterface } from '@gyraff/factory';

export interface ControllerValidatorInterface {
    [method: string]: (ctx: Context) => void;
}

export type ControllerValidatorFactoryType<
    T extends ControllerValidatorInterface = ControllerValidatorInterface
> = ComposableInterface<T>;
