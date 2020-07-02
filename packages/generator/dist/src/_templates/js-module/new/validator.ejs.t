---
to: <%if (!locals.skipValidator) { %><%= outDir  %>/src/validators/<%= namePluralDashed %>.js<%}%>
unless_exists: true
---
'use strict';
const { Validator } = require('@gyraff/validator');


module.exports = function $<%= namePluralCamelized %>Validator(UnprocessableEntityError) {
    return Validator.compose({
        index(ctx) {
            try {
                const data = ctx.request.query;
                this.validate(data, {
                    type: 'object',
                    properties: {
                        // Add object properties
                    },
                    required: [],
                    additionalProperties: false,
                });
            } catch (e) {
                throw new UnprocessableEntityError({ details: e.details });
            }
        },
    });
}
