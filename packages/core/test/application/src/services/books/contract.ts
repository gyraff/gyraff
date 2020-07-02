import { ComposableInterface } from '@gyraff/factory';
import { ModelFactoryType } from '@gyraff/model';
import { BooksRepositoryInterface } from '../../repositories/books/contract';
import { BooksValidatorInterface } from '../../validators/books/contract';


export interface BooksServiceInterface {
    BookModel: ModelFactoryType | null;
    booksRepository: BooksRepositoryInterface | null;
    index(params: { [p: string]: any }): Promise<any>;
    init(): void;
}

export type BooksServiceFactoryType = ComposableInterface<BooksServiceInterface>
