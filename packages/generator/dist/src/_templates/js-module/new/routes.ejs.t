---
to: <%if (!locals.skipRoutes) { %><%= outDir  %>/src/routes/api/v1/<%= namePluralDashed %>.js<%}%>
unless_exists: true
---
'use strict';

module.exports = function $<%= namePluralCamelized %>Router(<%= namePluralCamelized %>Controller) {
    const controller = <%= namePluralCamelized %>Controller();
    return function <%= namePluralCamelizedU %>Router(router) {
        router.get('/', controller.action('index'));
    }
}
