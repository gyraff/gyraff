import {Repository, SQLiteStorageInterface, StorageInterface} from '@gyraff/repository';
import { ModelFactoryType } from '@gyraff/model';
import { BooksRepositoryInterface } from './contract';

export function $BooksRepository(
    BookModel: ModelFactoryType,
    booksRepositoryStorage: StorageInterface,
) {
    return Repository.compose<BooksRepositoryInterface>({
        Model: BookModel,
        storage: booksRepositoryStorage,

        // TODO add here books repository methods
    });
}
