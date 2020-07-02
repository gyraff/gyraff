---
to: <%if (!locals.skipView) { %><%= outDir  %>/src/views/<%= namePluralDashed %>/index.ts<%}%>
unless_exists: true
---
import { ViewFactoryType } from '@gyraff/core';
import { <%= namePluralCamelized %>ViewInterface } from './contract';

export function $<%= namePluralCamelized %>View(View: ViewFactoryType) {
    return View.compose<<%= namePluralCamelized %>ViewInterface>({
        index(data: any) {
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
