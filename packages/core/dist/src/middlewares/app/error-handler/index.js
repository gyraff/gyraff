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
exports.$ErrorsHandlerMiddleware = void 0;
const error_1 = require("@gyraff/error");
function $ErrorsHandlerMiddleware(View, logger) {
    return function ErrorsHandlerMiddleware(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.app.silent = true;
            try {
                yield next();
            }
            catch (err) {
                const errorString = err instanceof error_1.ApplicationError ? err.toString() : JSON.stringify(err, Object.getOwnPropertyNames(err));
                logger.error(errorString);
                if (!(err instanceof error_1.ApplicationError)) {
                    ctx.app.emit('error', err, ctx);
                }
                const viewInstance = View({ ctx });
                viewInstance.renderError(err);
            }
        });
    };
}
exports.$ErrorsHandlerMiddleware = $ErrorsHandlerMiddleware;
//# sourceMappingURL=index.js.map