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
exports.$Controller = void 0;
const factory_1 = require("@gyraff/factory");
function $Controller(InternalServerError) {
    return factory_1.ComposableFactory({
        View: null,
        requireValidation: true,
        init() {
            if (!this.View) {
                throw new InternalServerError('View factory is required');
            }
        },
        action(method) {
            return (ctx) => __awaiter(this, void 0, void 0, function* () {
                this.validate(method, ctx);
                const controller = this;
                if (!controller[method]) {
                    throw new InternalServerError('Controller action is undefined');
                }
                ctx.state.responseAlreadySent = false;
                const data = yield controller[method](ctx);
                if (!ctx.state.responseAlreadySent) {
                    const view = this.getView(ctx);
                    if (!view[method]) {
                        throw new InternalServerError('The view of the controller action is undefined');
                    }
                    view[method](data);
                }
            });
        },
        getView(ctx) {
            if (!this.View) {
                throw new InternalServerError('View factory is undefined');
            }
            return this.View({ ctx });
        },
        validate(method, ctx) {
            if (this.Validator) {
                const validator = this.Validator();
                if (validator[method]) {
                    validator[method](ctx);
                }
                else if (this.requireValidation) {
                    throw new InternalServerError('Request validation is required. Define the validation rules for the current controller action.');
                }
            }
            else if (this.requireValidation) {
                throw new InternalServerError('Request validation is required. Provide a validator.');
            }
        },
    });
}
exports.$Controller = $Controller;
//# sourceMappingURL=index.js.map