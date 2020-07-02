import { ApplicationError } from '@gyraff/error';

export class StorageConnectorError extends ApplicationError {
    constructor(params: any) {
        super(params, {
            message: 'GYRAFF_STORAGE_CONNECTOR_ERROR',
        });
    }
}
