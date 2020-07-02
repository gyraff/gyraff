import { ComposableInterface } from '@gyraff/factory';

export interface ModelInterface {
    properties: { [key: string]: any };
    schema: { [key: string]: any };
    set(properties: object): void;
    setProperty(key: string, value: any): ModelInterface;
    getProperty(key: string): any;
    toJSON(): object;
    init(args: { properties?: { [p: string]: any } }): void;
}

export type ModelFactoryType<T extends ModelInterface = ModelInterface> = ComposableInterface<T>;
