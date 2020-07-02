"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const model_not_found_1 = require("./error/model-not-found");
const factory_1 = require("@gyraff/factory");
exports.Repository = factory_1.ComposableFactory({
    storage: null,
    Model: null,
    init() {
        if (!this.storage)
            throw new Error('[storage] property is required');
        if (!this.Model)
            throw new Error('[Model] property is required');
    },
    create(model, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let rawData = yield this.storage.create(model.toJSON(), options);
            if (typeof rawData === 'number') {
                rawData = (yield this.storage.findById(rawData, options));
            }
            return this.Model({ properties: rawData });
        });
    },
    createAll(models, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawData = yield this.storage.createAll(models.map((i) => i.toJSON()), options);
            return rawData.map((i) => this.Model({ properties: i }));
        });
    },
    findById(id, options = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const rawData = yield ((_a = this.storage) === null || _a === void 0 ? void 0 : _a.findById(id, options));
            if (rawData) {
                return this.Model({ properties: rawData });
            }
            return null;
        });
    },
    find(filter = {}, options = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const rawData = yield ((_a = this.storage) === null || _a === void 0 ? void 0 : _a.find(filter, options));
            if (rawData === null || rawData === void 0 ? void 0 : rawData.length) {
                return rawData.map((i) => this.Model({ properties: i }));
            }
            return rawData;
        });
    },
    update(model, options = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const rawData = yield ((_a = this.storage) === null || _a === void 0 ? void 0 : _a.update(model.toJSON(), options));
            return this.Model({ properties: rawData });
        });
    },
    delete(model, options = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.storage) === null || _a === void 0 ? void 0 : _a.delete(model.toJSON(), options));
        });
    },
    deleteAll(models, options = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.storage) === null || _a === void 0 ? void 0 : _a.deleteAll(models.map((i) => i.toJSON()), options));
        });
    },
    updateById(id, data = {}, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = yield this.findById(id, options);
            if (model) {
                model.set(data);
                return this.update(model, options);
            }
            throw new model_not_found_1.ModelNotFoundError({ details: { id } });
        });
    },
    deleteById(id, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = yield this.findById(id, options);
            if (model) {
                return this.delete(model, options);
            }
            throw new model_not_found_1.ModelNotFoundError({ details: { id } });
        });
    },
    exists(id, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = yield this.findById(id, options);
            return !!model;
        });
    },
});
//# sourceMappingURL=index.js.map