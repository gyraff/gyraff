import { ViewFactoryType } from '../../../../../src/view/contract';
import { BooksViewInterface } from './contract';

export function $BooksView(View: ViewFactoryType) {
    return View.compose<BooksViewInterface>({
        index(data: any) {
            this.actionView(data, {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'number',
                        },
                        title: {
                            type: 'string',
                        },
                    },
                    required: ['id', 'title'],
                },
                // properties: {},
                // required: [],
                // additionalProperties: false,
            });
        },
    });
}
