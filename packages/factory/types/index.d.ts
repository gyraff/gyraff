import { ApplicationErrorConstructorInterface } from '@gyraff/error';
import { ComposableFactoryInterface } from '..';
export { ComposableInterface, ComposableFactoryInterface } from '../src/contract';

export const ComposableFactoryError: ApplicationErrorConstructorInterface;
export function ComposableFactory<T extends {}, S extends {} = {}>(
    ...[objectDescriptor, staticsDescriptor]: Parameters<ComposableFactoryInterface<T, S>>
): ReturnType<ComposableFactoryInterface<T, S>>;
