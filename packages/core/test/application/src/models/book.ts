import { Model } from '@gyraff/model';

export function $BookModel() {
    return Model.compose<{}>({
        schema: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                title: { type: 'string' },
            },
            required: ['title'],
            additionalProperties: false,
        },
    });
}
