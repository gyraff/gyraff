/*
export type InstanceDescriptorType<T, V = {}> =
{} extends Required<V>
    ? {} extends Required<T>
        ? { [key: string]: never }
        : T
    : {} extends Required<T>
? Partial<V> & ThisType<V>
: Required<T> extends Required<V>
? Required<V> extends Required<T>
    ? Partial<T> & ThisType<T>
    : Partial<V> & Omit<T, keyof V> & ThisType<T>
: Required<V> extends Required<T>
? Partial<T> & ThisType<V>
: T & ThisType<V & T>;
*/

export type ObjectDescriptorType<T, V = {}> = {} extends Required<T>
    ? {} extends Required<V>
        ? { [key: string]: never }
        : Partial<V> & ThisType<V>
    : {} extends Required<V>
        ? T & ThisType<T>
        : Required<V> extends Required<T>
            ? Partial<T> & ThisType<V>
            : Required<T> extends Required<V>
                ? Partial<V> & Omit<T, keyof V> & ThisType<T>
                : T & ThisType<V & T>;

export type StaticsDescriptorType<S, W = {}> = {} extends Required<S>
    ? {} extends Required<W>
        ? { [key: string]: never }
        : Partial<W>
    : {} extends Required<W>
        ? S
        : Required<S> extends Required<W>
            ? Partial<W> & Omit<S, keyof W>
            : Required<W> extends Required<S>
                ? Partial<S>
                : S;

type extractArgument<T> = T extends { init(arg1: infer U, ...args: any[]): void } ? U : {};

export type factoryArgumentsType<T, S, V = extractArgument<T>> = {} extends Required<V>
    ? {} extends Required<S>
        ? {}
        : S
    : {} extends Required<S>
        ? V
        : S & V;

export type ComposableComposeType<T extends {}, S extends {} = {}, V = {}, W = {}> = <M extends {}, N extends {} = S>(
    objectDescriptor: ComposableInterface<M, N> | ObjectDescriptorType<M, T>,
    staticsDescriptor?: StaticsDescriptorType<N, S>,
) => ComposableInterface<T & M, S & N, W> & S & N;

/*
export type ComposableInterfacee<
    T extends {},
    S extends {} = {},
    V = {},
    W = factoryArgumentsType<T, V>
> = {} extends Required<W>
    ? { (): T; compose: ComposableComposeType<T, S, V, W> }
    : {} extends W
    ? { (args?: W): T; compose: ComposableComposeType<T, S, V, W> }
    : { (args: W): T; compose: ComposableComposeType<T, S, V, W> };


export type ComposableInterface<T extends {}, S extends {} = {}, V = {}, W = factoryArgumentsType<T, V>> = {
    (args?: W): T;
    compose: ComposableComposeType<T, S, V, W>;
};
 */

export type ComposableInterface<T extends {},
    S extends {} = {},
    V = {},
    W = factoryArgumentsType<T, V>> = InitializerType<W, T> & { compose: ComposableComposeType<T, S, V, W> };

export type InitializerType<W, T> = {} extends Required<W>
    ? { (): T }
    : {} extends W
        ? { (args?: W): T }
        : { (args: W): T };

export interface ComposableFactoryInterface<T extends {}, S extends {} = {}> {
    (objectDescriptor: ObjectDescriptorType<T>, staticsDescriptor?: StaticsDescriptorType<S>): ComposableInterface<T, S> & S;
    compose<M extends {}, N extends {} = {}>(...args: ComposableInterface<any, any>[]): ComposableInterface<M, N>;
}
