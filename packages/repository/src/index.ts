import { RepositoryInterface } from './contract';
import { ModelNotFoundError } from './error/model-not-found';
import { ModelFactoryType, ModelInterface } from '@gyraff/model';
import { ComposableFactory } from '@gyraff/factory';
import { StorageDataType, StorageInterface } from './storage/contract';

export const Repository = ComposableFactory<RepositoryInterface>({
    storage: null,
    Model: null,

    init() {
        if (!this.storage) throw new Error('[storage] property is required');
        if (!this.Model) throw new Error('[Model] property is required');
    },

    async create(model: ModelInterface, options = {}) {
        let rawData = await (this.storage as StorageInterface).create(model.toJSON(), options);
        if (typeof rawData === 'number') {
            rawData = (await (this.storage as StorageInterface).findById(rawData, options)) as StorageDataType;
        }
        return (this.Model as ModelFactoryType)({ properties: rawData });
    },

    async createAll(models: ModelInterface[], options = {}) {
        const rawData = await (this.storage as StorageInterface).createAll(
            models.map((i: ModelInterface) => i.toJSON()),
            options,
        );
        return rawData.map((i: object) => (this.Model as ModelFactoryType)({ properties: i }));
    },

    async findById(id: number, options = {}) {
        const rawData = await this.storage?.findById(id, options);
        if (rawData) {
            return (this.Model as ModelFactoryType)({ properties: rawData });
        }
        return null;
    },

    async find(filter = {}, options = {}) {
        const rawData = await this.storage?.find(filter, options);
        if (rawData?.length) {
            return rawData.map((i: object) => (this.Model as ModelFactoryType)({ properties: i }));
        }
        return rawData as ModelInterface[];
    },

    async update(model: ModelInterface, options = {}) {
        const rawData = await this.storage?.update(model.toJSON(), options);
        return (this.Model as ModelFactoryType)({ properties: rawData });
    },

    async delete(model: ModelInterface, options = {}) {
        await this.storage?.delete(model.toJSON(), options);
    },

    async deleteAll(models: ModelInterface[], options = {}) {
        await this.storage?.deleteAll(
            models.map((i) => i.toJSON()),
            options,
        );
    },

    async updateById(id: number, data: StorageDataType = {}, options = {}) {
        const model = await this.findById(id, options);
        if (model) {
            model.set(data);
            return this.update(model, options);
        }
        throw new ModelNotFoundError({ details: { id } });
    },

    async deleteById(id: number, options = {}) {
        const model = await this.findById(id, options);
        if (model) {
            return this.delete(model, options);
        }
        throw new ModelNotFoundError({ details: { id } });
    },

    async exists(id: number, options = {}) {
        const model = await this.findById(id, options);
        return !!model;
    },
});
