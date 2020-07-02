---
to: <%if (!locals.skipView) { %><%= outDir  %>/src/views/<%= namePluralDashed %>.js<%}%>
unless_exists: true
---
'use strict';

module.exports = function $<%= namePluralCamelized %>View(View) {
    return View.compose({
        index(data) {
            this.actionView(data, {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        // Add object properties
                    },
                    required: [],
                    additionalProperties: false,
                },
            });
        },
    });
}
