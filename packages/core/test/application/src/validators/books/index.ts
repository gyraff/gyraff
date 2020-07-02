import { Validator } from '@gyraff/validator';
import { BooksValidatorInterface } from './contract';
import { HttpErrorConstructorInterface } from '@gyraff/error';


export function $BooksValidator(UnprocessableEntityError: HttpErrorConstructorInterface) {
    return Validator.compose<BooksValidatorInterface>({
        index(ctx) {
            try {
                const data = ctx.request.query;
                this.validate(data, {
                    type: 'object',
                    properties: {
                        id: { number: 'string' },
                        title: { type: 'string' },
                    },
                    // required: [],
                    additionalProperties: false,
                });
            } catch (e) {
                throw new UnprocessableEntityError({ details: e.details });
            }
        },
    });
}
