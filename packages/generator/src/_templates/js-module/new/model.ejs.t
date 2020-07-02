---
to: <%if (!locals.skipModel) { %><%= outDir  %>/src/models/<%= nameSingularDashed %>.js<%}%>
unless_exists: true
---
'use strict';
const { Model } = require('@gyraff/model');

module.exports = function $<%= nameClass %>Model() {
    return Model.compose({
        schema: {
            type: 'object',
            properties: {
                // Add model properties
            },
            required: [],
            additionalProperties: false,
        },
    });
}
