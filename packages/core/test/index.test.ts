import { application } from './application';
import { injector } from '@gyraff/injector';
import { unlink } from 'fs';
import { config } from './application/src/config/default';

jest.setTimeout(160000);

beforeAll( async () => {
    await application();
});

beforeEach(async () => {
    await new Promise((resolve, reject) => {
        const connector: any = config.connectors?.SQLiteStorageConnector;
        const dbPath = connector.connection.filename as string;
        unlink(dbPath, () => {
            resolve();
        });
    });
});

describe('@gyraff/core', () => {
    test('basic request/response', async () => {
        const controller = injector.get('BooksController')();
        const ctx: {[k:string]:any} = {
            state: {},
            request: {
                query: {
                    id: 1,
                },
            },
        };
        await controller.action('index')(ctx);
        expect(ctx.body).toEqual({ "data": [{"id":1,"title":"book 1"}] });
    });

    test('Validate request parameters', async () => {
        try {
            const controller = injector.get('BooksController')();
            const ctx = {
                state: {},
                request: {
                    query: {
                        id: 1,
                        published: true
                    },
                },
            };
            await controller.action('index')(ctx);
        } catch (e) {
            expect(e.name).toEqual('UnprocessableEntityError');
            expect(e.httpStatusCode).toEqual(422);
            expect(e.message).toEqual('UNPROCESSABLE_ENTITY_ERROR');
            expect(e.details["0"].message).toBe("Additional properties not allowed: published");
        }
    });

});


