import { SQLiteStorage } from '@gyraff/repository';
import { getConnector, SQLiteStorageConnectorType } from '@gyraff/connector';
import { ApplicationConfigInterface } from '../../../../../../src/config/application/contract';

export function $booksRepositoryStorage() {
    const SQLiteStorageConnector: SQLiteStorageConnectorType = getConnector('SQLiteStorageConnector');
    return SQLiteStorage({
        tableName: 'books',
        SQLiteStorageConnector,
    });
}
