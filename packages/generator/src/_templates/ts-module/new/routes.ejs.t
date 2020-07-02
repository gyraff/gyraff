---
to: <%if (!locals.skipRoutes) { %><%= outDir  %>/src/routes/api/v1/<%= namePluralDashed %>.ts<%}%>
unless_exists: true
---
import {<%= namePluralCamelized %>ControllerFactoryType} from "../../../controllers/<%= namePluralDashed %>/contract";
import Router from "koa-router";

export function $<%= namePluralCamelized %>Router(<%= namePluralCamelized %>Controller: <%= namePluralCamelized %>ControllerFactoryType) {
    const controller = <%= namePluralCamelized %>Controller();
    return function <%= namePluralCamelizedU %>Router(router: Router) {
        router.get('/', controller.action('index'));
        router.get('/ping', (ctx) => {
            ctx.body = { pong: 1 };
        });
    }
}
