"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.loader = void 0;
const lodash_1 = require("lodash");
const fs_1 = require("fs");
const exists = (dir) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        fs_1.access(dir, (err) => {
            if (err)
                resolve(false);
            else
                resolve(true);
        });
    });
});
function loader(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        const dirExists = yield exists(dir);
        if (!dirExists) {
            throw new Error(`Can not access directory ${dir}. Make sure to provide a working directory.`);
        }
        const env = process.env.NODE_ENV || 'development';
        let defaultConfig = {};
        try {
            const dc = yield Promise.resolve().then(() => __importStar(require(`${dir}/default`)));
            defaultConfig = dc.config || {};
        }
        catch (e) {
            throw new Error(`An error occurred while loading your application default config file: ${e.message}`);
        }
        let envConfig = {};
        try {
            const ec = yield Promise.resolve().then(() => __importStar(require(`${dir}/${env}`)));
            envConfig = ec.config || {};
        }
        catch (e) { }
        let envConfigLocal = {};
        try {
            const ecl = yield Promise.resolve().then(() => __importStar(require(`${dir}/${env}.local`)));
            envConfigLocal = ecl.config || {};
        }
        catch (e) { }
        return lodash_1.merge({}, defaultConfig, envConfig, envConfigLocal);
    });
}
exports.loader = loader;
//# sourceMappingURL=loader.js.map