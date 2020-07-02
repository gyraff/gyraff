import { BooksServiceInterface } from './contract';
import { ComposableFactory } from '@gyraff/factory';
import { ModelFactoryType } from '@gyraff/model';
import { BooksRepositoryFactoryType } from '../../repositories/books/contract';


export function $BooksService(
    BookModel: ModelFactoryType,
    BooksRepository: BooksRepositoryFactoryType,
) {
    return ComposableFactory<BooksServiceInterface>({
        BookModel,
        booksRepository: null,
        init() {
            this.booksRepository = BooksRepository();
        },
        async index(params = {}) {
            return this.booksRepository?.find(params);
        },
    });
}
