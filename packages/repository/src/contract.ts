import { StorageInterface } from '../types';
import { ModelFactoryType, ModelInterface } from '@gyraff/model';
import { ComposableInterface } from '@gyraff/factory';

// TODO Use ModelIdType = string | number

export interface RepositoryInterface {
    storage: StorageInterface | null;
    Model: ModelFactoryType | null;
    create(model: ModelInterface, options?: object): Promise<ModelInterface>;
    createAll(models: ModelInterface[], options?: object): Promise<ModelInterface[]>;
    update(model: ModelInterface, options?: object): Promise<ModelInterface>;
    delete(model: ModelInterface, options?: object): Promise<void>;
    deleteAll(models: ModelInterface[], options?: object): Promise<void>;
    findById(id: number, options?: object): Promise<ModelInterface | null>;
    find(filter?: object, options?: object): Promise<ModelInterface[]>;
    updateById(id: number, data?: object, options?: object): Promise<ModelInterface>;
    deleteById(id: number, options?: object): Promise<void>;
    exists(id: number, options?: object): Promise<boolean>;
    init(): void;
}

export type RepositoryFactoryType<T extends RepositoryInterface = RepositoryInterface> = ComposableInterface<T>;
