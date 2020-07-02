import { Context } from 'koa';
import { ViewFactoryType, ViewInterface } from '../view/contract';
import { ComposableInterface } from '@gyraff/factory';
import { ControllerValidatorFactoryType } from './validator/contract';

export interface ControllerInterface {
    requireValidation: boolean;
    Validator?: ControllerValidatorFactoryType;
    View: ViewFactoryType | null;
    action(method: string): (ctx: Context) => void;
    getView(ctx: Context): ViewInterface;
    validate(method: string, ctx: Context): void;
    init(): void;
}

export type ControllerFactoryType<T extends ControllerInterface = ControllerInterface> = ComposableInterface<T>;
