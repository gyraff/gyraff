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
exports.Migration = void 0;
const factory_1 = require("@gyraff/factory");
const connector_1 = require("@gyraff/connector");
const error_1 = require("./error");
exports.Migration = factory_1.ComposableFactory({
    config: null,
    init({ migration }) {
        if (typeof migration !== 'object') {
            throw new error_1.MigrationError('[migration] parameter is required');
        }
        if (!Object.keys(migration).length) {
            throw new error_1.MigrationError('At least one storage parameters for the migration');
        }
        this.config = migration;
    },
    migrate(connector, dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connector.getConnection();
            yield connection.migrate.latest({ directory: dir });
        });
    },
    seed(connector, dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connector.getConnection();
            yield connection.seed.run({ directory: dir });
        });
    },
    migrateAndSeed() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const connectorName in this.config) {
                const connector = connector_1.getConnector(connectorName);
                const { autoMigrate, dir, seeds } = this.config[connectorName];
                if (autoMigrate) {
                    if (!dir) {
                        throw new error_1.MigrationError(`[migration.${connectorName}.dir] is required`);
                    }
                    yield this.migrate(connector, dir);
                }
                if (seeds) {
                    const { autoSeed, dir } = seeds;
                    if (autoSeed) {
                        if (!dir) {
                            throw new error_1.MigrationError(`[migration.${connectorName}.seeder.dir] is required`);
                        }
                        yield this.seed(connector, dir);
                    }
                }
            }
        });
    },
});
//# sourceMappingURL=index.js.map