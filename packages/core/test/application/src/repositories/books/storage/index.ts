import { SQLiteStorage } from '@gyraff/repository';
import { getConnector, KnexStorageConnectorInterface } from '@gyraff/connector';
import { ApplicationConfigInterface } from '../../../../../../src/config/application/contract';

export function $booksRepositoryStorage() {
    const knexStorageConnector: KnexStorageConnectorInterface = getConnector('SQLiteStorageConnector');
    return SQLiteStorage({
        tableName: 'books',
        knexStorageConnector,
    });
}
