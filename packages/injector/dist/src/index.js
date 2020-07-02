"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.injector = void 0;
const ts = __importStar(require("typescript"));
const glob_1 = __importDefault(require("glob"));
const path_1 = require("path");
const lodash_1 = require("lodash");
const bottlejs_1 = __importDefault(require("bottlejs"));
const error_1 = require("./error");
const bottle = new bottlejs_1.default();
function getAST(fn) {
    if (typeof fn !== 'function') {
        throw new error_1.InjectorError('Invalid argument type of [fn]. Expected a function.');
    }
    const sourceFile = ts.createSourceFile('', fn.toString(), ts.ScriptTarget.ES2015, false);
    return lodash_1.cloneDeep(sourceFile);
}
function parse(fn) {
    if (typeof fn === 'function') {
        const ast = getAST(fn);
        const statement = ast.statements[0];
        if (statement.name) {
            const functionName = statement.name.escapedText;
            if (functionName && functionName[0] === '$') {
                const fnArgs = statement.parameters.map((i) => i.name.escapedText);
                return {
                    fnName: functionName.slice(1),
                    fnArgs,
                };
            }
        }
    }
    return false;
}
function register(fn, name, args) {
    bottle.factory(name, (container) => {
        const deps = args.map((dependency) => {
            const registeredNames = container.$list();
            if (!registeredNames.includes(dependency)) {
                throw new error_1.InjectorError(`Dependency [${dependency}] is not registered for the factory [${name}]`);
            }
            return container[dependency];
        });
        return fn(...deps);
    });
}
function resolve(fn) {
    try {
        const result = parse(fn);
        if (typeof result === 'object') {
            const { fnName, fnArgs } = result;
            register(fn, fnName, fnArgs);
            return fnName;
        }
    }
    catch (e) {
        console.log(`An error occurred while parsing source code: ${e.message}`);
    }
    return null;
}
function processModule(module) {
    return __awaiter(this, void 0, void 0, function* () {
        const registered = [];
        const exports = yield Promise.resolve().then(() => __importStar(require(module)));
        for (const name in exports) {
            const exported = exports[name];
            const key = resolve(exported);
            if (key)
                registered.push(key);
        }
        return registered;
    });
}
const injector = {
    parse,
    resolve,
    autoResolve(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const modules = yield new Promise((resolve, reject) => {
                const absolutePath = path_1.resolve(dir);
                glob_1.default(path_1.join(absolutePath, `/**/*.?(js|ts)`), (err, files) => {
                    if (err)
                        reject(err);
                    else {
                        const modules = files.filter((i) => i.indexOf(`.test.js`) + i.indexOf(`.test.ts`) === -2);
                        resolve(modules);
                    }
                });
            });
            for (const module of modules) {
                yield processModule(module);
            }
        });
    },
    get(name) {
        if (!this.has(name)) {
            throw new error_1.InjectorError(`Provider of [${name}] has not been registered within the DI container`);
        }
        return bottle.container[name];
    },
    has(name) {
        const names = bottle.container.$list();
        return names.includes(name);
    },
    value(name, val) {
        bottle.value(name, val);
    },
};
exports.injector = injector;
//# sourceMappingURL=index.js.map