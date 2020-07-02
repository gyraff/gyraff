"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connector_1 = require("./src/connectors/connector");
Object.defineProperty(exports, "StorageConnector", { enumerable: true, get: function () { return connector_1.StorageConnector; } });
var src_1 = require("./src");
Object.defineProperty(exports, "getConnector", { enumerable: true, get: function () { return src_1.getConnector; } });
Object.defineProperty(exports, "getConnectorsNames", { enumerable: true, get: function () { return src_1.getConnectorsNames; } });
Object.defineProperty(exports, "registerConnector", { enumerable: true, get: function () { return src_1.registerConnector; } });
Object.defineProperty(exports, "setConfig", { enumerable: true, get: function () { return src_1.setConfig; } });
var error_1 = require("./src/error");
Object.defineProperty(exports, "StorageConnectorError", { enumerable: true, get: function () { return error_1.StorageConnectorError; } });
//# sourceMappingURL=index.js.map