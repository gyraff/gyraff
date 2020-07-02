import { cloneDeep, merge } from 'lodash';
import {
    ComposableFactoryInterface,
    ComposableInterface,
    factoryArgumentsType,
} from './contract';
import { ComposableFactoryError } from './error';

function isCFF(obj: any): boolean {
    return typeof obj === 'function' && typeof obj.__registry === 'object' && typeof obj.compose === 'function';
}

function ComposableFactoryFunction<T extends {}, S extends {} = {}, V = {}, W = factoryArgumentsType<T, V>>(
    registry: any,
): ComposableInterface<T, S, V, W> {
    const Factory = function(args: W): T {
        const object = cloneDeep(registry.oDescriptor);
        const opts = args || {};
        for (const fn of registry.init) fn.call(object, opts);
        return object;
    } as ComposableInterface<T, S, V, W>;
    merge(Factory, registry.sDescriptor, { __registry: registry });
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    Factory.compose = function(objectDescriptor, staticsDescriptor) {
        const curRegistry = cloneDeep((Factory as any).__registry);
        const curInits = curRegistry.init;
        const curInstance = curRegistry.oDescriptor;
        const curStatics = curRegistry.sDescriptor;
        if (isCFF(objectDescriptor)) {
            const objRegistry = cloneDeep((objectDescriptor as any).__registry);
            const objInits = objRegistry.init;
            const objInstance = objRegistry.oDescriptor;
            const objStatics = objRegistry.sDescriptor;
            curInits.push(...objInits);
            merge(curInstance, objInstance);
            merge(curStatics, objStatics);
            curInstance.init = curInits;
        } else if (typeof objectDescriptor === 'object') {
            const descriptor: { [p: string]: any } = objectDescriptor;
            if (descriptor.init) {
                curInits.push(descriptor.init);
                delete descriptor.init;
            }
            merge(curInstance, objectDescriptor);
            curInstance.init = curInits;
            merge(curStatics, staticsDescriptor || {});
        } else {
            throw new ComposableFactoryError('Invalid argument type');
        }
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return ComposableFactory(curInstance, curStatics);
    };
    return Factory;
}

function ComposableFactory<T extends {}, S extends {} = {}>(
    ...[objectDescriptor, staticsDescriptor]: Parameters<ComposableFactoryInterface<T, S>>
): ReturnType<ComposableFactoryInterface<T, S>> {
    if (typeof objectDescriptor !== 'object') {
        throw new ComposableFactoryError('Invalid [instanceDescriptor] parameter type');
    }
    const inits: Function[] = [];
    const object: { [p: string]: any } = objectDescriptor;
    if (object.init) {
        const init: unknown = object.init;
        if (typeof init === 'function') inits.push(init);
        else if (Array.isArray(init) && init.length) inits.push(...init);
        delete object.init;
    }
    return ComposableFactoryFunction<T, S>({
        oDescriptor: objectDescriptor,
        sDescriptor: staticsDescriptor || {},
        init: inits,
    }) as ReturnType<ComposableFactoryInterface<T, S>>;
}

ComposableFactory.compose = function <T extends {}, S extends {} = {}>(
    ...args: ComposableInterface<any, any>[]
): ComposableInterface<T, S> {
    return args.reduce((acc, cur) => acc.compose(cur)) as ComposableInterface<T, S>;
};

export { ComposableFactory };
