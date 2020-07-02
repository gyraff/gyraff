import { Model } from '..';

describe('@gyraff/model tests', () => {
    test('Usage tests', async () => {
        expect(() => {
            Model();
        }).toThrow('Model schema is required');

        const TodoModel = Model.compose<{}>({
            schema: {
                type: 'object',
                properties: {
                    title: { type: 'string' },
                    status: { type: 'integer', enum: [0, 1] },
                },
                required: ['title', 'status'],
                additionalProperties: false,
            },
        });

        const todoModel = TodoModel();

        expect(() => {
            todoModel.set({
                description: 'my todo description',
            });
        }).toThrow();


        expect(() => {
            todoModel.set({});
        }).toThrow();

        expect(() => {
            todoModel.set({
                title: 'My title',
                status: 8,
            });
        }).toThrow();

        expect(() => {
            todoModel.set(['My title', 1]);
        }).toThrow('Invalid model properties parameter');

        todoModel.set({
            title: 'My title',
            status: 0,
        });

        expect(todoModel.toJSON()).toEqual({
            title: 'My title',
            status: 0,
        });

        todoModel.setProperty('status', 1);

        expect(todoModel.toJSON()).toEqual({
            title: 'My title',
            status: 1,
        });

        expect(() => {
            todoModel.setProperty('status', 9);
        }).toThrow();

        expect(todoModel.getProperty('title')).toEqual('My title');
    });
});


