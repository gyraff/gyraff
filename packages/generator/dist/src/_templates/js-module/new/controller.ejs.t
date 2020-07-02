---
to: <%if (!locals.skipController) { %><%= outDir  %>/src/controllers/<%= namePluralDashed %>.js<%}%>
unless_exists: true
---
'use strict';

module.exports = function $<%= namePluralCamelized %>Controller(
    Controller,
    <%= namePluralCamelized %>Service,
    <%= namePluralCamelized %>View,
    <%= namePluralCamelized %>Validator,
) {
    return Controller.compose({
        <%= namePluralCamelizedU %>Service: null,
        Validator: <%= namePluralCamelized %>Validator,
        View: <%= namePluralCamelized %>View,
        init() {
            this.<%= namePluralCamelizedU %>Service = <%= namePluralCamelized %>Service();
        },
        async index(ctx) {
            return this.<%= namePluralCamelizedU %>Service.index(ctx.request.query);
        },
    });
}
