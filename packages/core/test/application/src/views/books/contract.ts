import { ViewFactoryType, ViewInterface } from '../../../../../src/view/contract';

export interface BooksViewInterface extends ViewInterface {
    index(data: { [p: string]: any }): void
}

export type BooksViewFactoryType = ViewFactoryType<BooksViewInterface>;

