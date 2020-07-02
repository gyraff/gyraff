---
to: <%if (!locals.skipController) { %><%= outDir  %>/src/controllers/<%= namePluralDashed %>/index.ts<%}%>
unless_exists: true
---
import { ControllerFactoryType } from '@gyraff/core';
import { Context } from 'koa';
import { <%= namePluralCamelized %>ServiceFactoryType } from '../../services/<%= namePluralDashed %>/contract';
import { <%= namePluralCamelized %>ControllerInterface } from './contract';
import { <%= namePluralCamelized %>ViewFactoryType } from '../../views/<%= namePluralDashed %>/contract';
import { <%= namePluralCamelized %>ValidatorFactoryType } from '../../validators/<%= namePluralDashed %>/contract';


export function $<%= namePluralCamelized %>Controller(
    Controller: ControllerFactoryType,
    <%= namePluralCamelized %>Service: <%= namePluralCamelized %>ServiceFactoryType,
    <%= namePluralCamelized %>View: <%= namePluralCamelized %>ViewFactoryType,
    <%= namePluralCamelized %>Validator: <%= namePluralCamelized %>ValidatorFactoryType,
) {
    return Controller.compose<<%= namePluralCamelized %>ControllerInterface>({
        <%= namePluralCamelizedU %>Service: null,
        Validator: <%= namePluralCamelized %>Validator,
        View: <%= namePluralCamelized %>View,
        init() {
            this.<%= namePluralCamelizedU %>Service = <%= namePluralCamelized %>Service();
        },
        async index(ctx: Context) {
            return this.<%= namePluralCamelizedU %>Service?.index(ctx.request.query);
        },
    });
}
