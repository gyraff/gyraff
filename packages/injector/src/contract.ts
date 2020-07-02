export interface InjectorInterface {
    parse(fn: any): boolean | { fnName: string; fnArgs: string[] };
    resolve: (fn: any) => string | null;
    autoResolve: (dir: string) => void;
    get: (name: string) => any;
    has: (name: string) => boolean;
    value: (name: string, val: any) => void;
}
