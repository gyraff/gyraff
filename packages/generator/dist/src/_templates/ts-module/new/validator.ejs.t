---
to: <%if (!locals.skipValidator) { %><%= outDir  %>/src/validators/<%= namePluralDashed %>/index.ts<%}%>
unless_exists: true
---
import { Validator } from '@gyraff/validator';
import { <%= namePluralCamelized %>ValidatorInterface } from './contract';
import { HttpErrorConstructorInterface } from '@gyraff/error';


export function $<%= namePluralCamelized %>Validator(UnprocessableEntityError: HttpErrorConstructorInterface) {
    return Validator.compose<<%= namePluralCamelized %>ValidatorInterface>({
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
