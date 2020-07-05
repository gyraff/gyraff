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
exports.RDMSStorage = void 0;
const factory_1 = require("@gyraff/factory");
const storage_error_1 = require("../error/storage-error");
exports.RDMSStorage = factory_1.ComposableFactory({
    tableName: null,
    storageConnector: null,
    init({ tableName, storageConnector }) {
        if (!tableName) {
            throw new storage_error_1.RepositoryStorageError('[tableName] is required');
        }
        if (!storageConnector) {
            throw new storage_error_1.RepositoryStorageError('[SQLiteStorageConnector] is required');
        }
        this.tableName = tableName;
        this.storageConnector = storageConnector;
    },
    create(data, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof data !== 'object') {
                throw new storage_error_1.RepositoryStorageError('Invalid [data] parameter type.');
            }
            const connection = yield this.storageConnector.getConnection();
            const [id] = yield connection(this.tableName).insert(data, ['id']);
            if (options.returnId === true)
                return id;
            return this.findById(id);
        });
    },
    createAll(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(data) || !data.length) {
                throw new storage_error_1.RepositoryStorageError('Invalid [data] parameter type. Expected a non-empty array.');
            }
            const ids = [];
            for (const item of data) {
                const id = (yield this.create(item, { returnId: true }));
                ids.push(id);
            }
            return this.find((builder) => {
                builder.where('id', 'in', ids);
            });
        });
    },
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof data !== 'object') {
                throw new storage_error_1.RepositoryStorageError('Invalid [data] parameter type.');
            }
            if (!data.id) {
                throw new storage_error_1.RepositoryStorageError('Missing [data.id] parameter.');
            }
            const connection = yield this.storageConnector.getConnection();
            yield connection(this.tableName)
                .where({ id: data.id })
                .update(data);
            return this.findById(data.id);
        });
    },
    delete(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof data !== 'object') {
                throw new storage_error_1.RepositoryStorageError('Invalid [data] parameter type.');
            }
            if (!data.id) {
                throw new storage_error_1.RepositoryStorageError('Missing [data.id] parameter.');
            }
            return this.deleteById(data.id);
        });
    },
    deleteAll(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(data) || !data.length) {
                throw new storage_error_1.RepositoryStorageError('Invalid [data] parameter type. Expected a non-empty array.');
            }
            const invalidItems = data.filter((i) => !i.id);
            if (invalidItems.length) {
                throw new storage_error_1.RepositoryStorageError('Missing ID property is one or more items');
            }
            yield this.deleteByIds(data.map((i) => i.id));
        });
    },
    deleteByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(ids) || !ids.length) {
                throw new storage_error_1.RepositoryStorageError('Invalid [ids] parameter type. Expected a non-empty array.');
            }
            const connection = yield this.storageConnector.getConnection();
            yield connection(this.tableName)
                .where('id', 'in', ids)
                .delete();
        });
    },
    find(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof filter !== 'object' && typeof filter !== 'function') {
                throw new storage_error_1.RepositoryStorageError('Invalid [data] parameter type.');
            }
            const connection = yield this.storageConnector.getConnection();
            return connection.table(this.tableName).where(filter);
        });
    },
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new storage_error_1.RepositoryStorageError('[id] is required');
            }
            const r = yield this.find({ id });
            if (r === null || r === void 0 ? void 0 : r.length)
                return r[0];
            return null;
        });
    },
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new storage_error_1.RepositoryStorageError('Missing [id] parameter.');
            }
            const connection = yield this.storageConnector.getConnection();
            yield connection(this.tableName)
                .where({ id })
                .delete();
        });
    },
    count(where) {
        return __awaiter(this, void 0, void 0, function* () {
            const a = yield this.find(where);
            return a.length;
        });
    },
    exists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const a = yield this.findById(id);
            return !!a;
        });
    },
});
//# sourceMappingURL=index.js.map