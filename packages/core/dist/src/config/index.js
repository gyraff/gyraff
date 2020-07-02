"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$config = void 0;
const lodash_1 = require("lodash");
const default_1 = require("./default");
function $config(applicationConfig) {
    return lodash_1.merge({}, default_1.defaultConfig, applicationConfig);
}
exports.$config = $config;
//# sourceMappingURL=index.js.map