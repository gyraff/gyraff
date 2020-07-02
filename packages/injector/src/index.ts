import * as ts from 'typescript';
import glob from 'glob';
import { join, resolve as resolvePath } from 'path';
import { cloneDeep } from 'lodash';
import { InjectorInterface } from './contract';
import Bottle from 'bottlejs';
import { InjectorError } from './error';

const bottle = new Bottle();

function getAST(fn: unknown): ts.SourceFile {
    if (typeof fn !== 'function') {
        throw new InjectorError('Invalid argument type of [fn]. Expected a function.');
    }
    const sourceFile = ts.createSourceFile('', fn.toString(), ts.ScriptTarget.ES2015, false);
    // We need to convert sourceFile to JSON to shortcut dealing with sourceFile directly.
    // JSON.stringify has issues with circular structures (TypeError: Converting circular structure to JSON)
    // cloneDeep do the same thing as JSON.parse(JSON.stringify())
    return cloneDeep(sourceFile);
}

function parse(fn: unknown): boolean | { fnName: string; fnArgs: string[] } {
    if (typeof fn === 'function') {
        const ast = getAST(fn);
        const statement: any = ast.statements[0];
        if (statement.name) {
            const functionName = statement.name.escapedText;
            if (functionName && functionName[0] === '$') {
                const fnArgs = statement.parameters.map((i: any) => i.name.escapedText);
                return {
                    fnName: functionName.slice(1),
                    fnArgs,
                };
            }
        }
    }
    return false;
}

function register(fn: Function, name: string, args: string[]): void {
    bottle.factory(name, (container) => {
        const deps = args.map((dependency) => {
            const registeredNames = container.$list();
            if (!registeredNames.includes(dependency)) {
                throw new InjectorError(`Dependency [${dependency}] is not registered for the factory [${name}]`);
            }
            return container[dependency];
        });
        return fn(...deps);
    });
}

function resolve(fn: any): string | null {
    try {
        const result = parse(fn);
        if (typeof result === 'object') {
            const { fnName, fnArgs } = result;
            register(fn, fnName, fnArgs);
            return fnName;
        }
    } catch (e) {
        //throw e;
        console.log(`An error occurred while parsing source code: ${e.message}`);
    }
    return null;
}

async function processModule(module: string): Promise<string[]> {
    const registered: string[] = [];
    const exports = await import(module);
    for (const name in exports) {
        const exported = exports[name];
        const key = resolve(exported);
        if (key) registered.push(key);
    }
    return registered;
}

const injector: InjectorInterface = {
    parse,
    resolve,

    async autoResolve(dir) {
        const modules: string[] = await new Promise((resolve, reject) => {
            const absolutePath = resolvePath(dir);
            glob(join(absolutePath, `/**/*.?(js|ts)`), (err, files) => {
                if (err) reject(err);
                else {
                    const modules = files.filter((i) => i.indexOf(`.test.js`) + i.indexOf(`.test.ts`) === -2);
                    resolve(modules);
                }
            });
        });

        for (const module of modules) {
            await processModule(module);
        }
    },

    get(name) {
        if (!this.has(name)) {
            throw new InjectorError(`Provider of [${name}] has not been registered within the DI container`);
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

export { injector };
