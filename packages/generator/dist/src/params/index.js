"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.params = void 0;
const inflection_1 = __importDefault(require("inflection"));
function params({ args }) {
    const { name } = args;
    const namePluralDashed = inflection_1.default.pluralize(name);
    const namePluralUnderscored = namePluralDashed.replace('-', '_');
    const namePluralCamelized = inflection_1.default.camelize(namePluralUnderscored);
    const namePluralCamelizedU = inflection_1.default.camelize(namePluralUnderscored, true);
    const nameSingularDashed = inflection_1.default.singularize(name);
    const nameSingularUnderscored = nameSingularDashed.replace('-', '_');
    const nameClass = inflection_1.default.classify(nameSingularUnderscored);
    return {
        nameSingularUnderscored,
        nameSingularDashed,
        namePluralDashed,
        namePluralUnderscored,
        nameClass,
        namePluralCamelized,
        namePluralCamelizedU,
    };
}
exports.params = params;
//# sourceMappingURL=index.js.map