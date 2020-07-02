import { RepositoryFactoryType, RepositoryInterface } from '@gyraff/repository';

export interface BooksRepositoryInterface extends RepositoryInterface {
    // TODO add methods here
}

export type BooksRepositoryFactoryType = RepositoryFactoryType<BooksRepositoryInterface>;
