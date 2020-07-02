"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComposableFactory = void 0;
const lodash_1 = require("lodash");
const error_1 = require("./error");
function isCFF(obj) {
    return typeof obj === 'function' && typeof obj.__registry === 'object' && typeof obj.compose === 'function';
}
function ComposableFactoryFunction(registry) {
    const Factory = function (args) {
        const object = lodash_1.cloneDeep(registry.oDescriptor);
        const opts = args || {};
        for (const fn of registry.init)
            fn.call(object, opts);
        return object;
    };
    lodash_1.merge(Factory, registry.sDescriptor, { __registry: registry });
    Factory.compose = function (objectDescriptor, staticsDescriptor) {
        const curRegistry = lodash_1.cloneDeep(Factory.__registry);
        const curInits = curRegistry.init;
        const curInstance = curRegistry.oDescriptor;
        const curStatics = curRegistry.sDescriptor;
        if (isCFF(objectDescriptor)) {
            const objRegistry = lodash_1.cloneDeep(objectDescriptor.__registry);
            const objInits = objRegistry.init;
            const objInstance = objRegistry.oDescriptor;
            const objStatics = objRegistry.sDescriptor;
            curInits.push(...objInits);
            lodash_1.merge(curInstance, objInstance);
            lodash_1.merge(curStatics, objStatics);
            curInstance.init = curInits;
        }
        else if (typeof objectDescriptor === 'object') {
            const descriptor = objectDescriptor;
            if (descriptor.init) {
                curInits.push(descriptor.init);
                delete descriptor.init;
            }
            lodash_1.merge(curInstance, objectDescriptor);
            curInstance.init = curInits;
            lodash_1.merge(curStatics, staticsDescriptor || {});
        }
        else {
            throw new error_1.ComposableFactoryError('Invalid argument type');
        }
        return ComposableFactory(curInstance, curStatics);
    };
    return Factory;
}
function ComposableFactory(...[objectDescriptor, staticsDescriptor]) {
    if (typeof objectDescriptor !== 'object') {
        throw new error_1.ComposableFactoryError('Invalid [instanceDescriptor] parameter type');
    }
    const inits = [];
    const object = objectDescriptor;
    if (object.init) {
        const init = object.init;
        if (typeof init === 'function')
            inits.push(init);
        else if (Array.isArray(init) && init.length)
            inits.push(...init);
        delete object.init;
    }
    return ComposableFactoryFunction({
        oDescriptor: objectDescriptor,
        sDescriptor: staticsDescriptor || {},
        init: inits,
    });
}
exports.ComposableFactory = ComposableFactory;
ComposableFactory.compose = function (...args) {
    return args.reduce((acc, cur) => acc.compose(cur));
};
//# sourceMappingURL=index.js.map