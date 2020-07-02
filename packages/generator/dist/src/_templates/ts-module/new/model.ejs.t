---
to: <%if (!locals.skipModel) { %><%= outDir  %>/src/models/<%= nameSingularDashed %>.ts<%}%>
unless_exists: true
---
import { Model } from '@gyraff/model';

export function $<%= nameClass %>Model() {
    return Model.compose<{}>({
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
