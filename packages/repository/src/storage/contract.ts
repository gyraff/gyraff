import { ComposableInterface } from '@gyraff/factory';

export type StorageDataType = {
    [p: string]: any;
};

export interface StorageInterface {
    create: (data: object, options?: object) => Promise<StorageDataType | number>;
    createAll: (data: object[], options?: object) => Promise<StorageDataType[]>;
    update: (data: object, options?: object) => Promise<StorageDataType>;
    delete: (data: object, options?: object) => Promise<void>;
    deleteAll: (data: object[], options?: object) => Promise<void>;
    find: (filter: object, options?: object) => Promise<StorageDataType[]>;
    findById: (id: number, options?: object) => Promise<StorageDataType | null>;
    deleteById: (id: number, options?: object) => Promise<void>;
    deleteByIds: (ids: number[], options?: object) => Promise<void>;
    count: (where: object, options?: object) => Promise<number>;
    exists: (id: number, options?: object) => Promise<boolean>;
}

export type StorageFactoryType<T extends StorageInterface = StorageInterface> = ComposableInterface<T>;
