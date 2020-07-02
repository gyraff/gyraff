import { Context } from 'koa';
import { ControllerFactoryType, ControllerInterface } from '../../../../../src/controller/contract';
import { BooksServiceInterface } from '../../services/books/contract';
import { BooksViewFactoryType } from '../../views/books/contract';
import { BooksValidatorFactoryType } from '../../validators/books/contract';

export interface BooksControllerInterface extends ControllerInterface {
    booksService: BooksServiceInterface | null;
    View: BooksViewFactoryType,
    Validator: BooksValidatorFactoryType,
    index(ctx: Context): Promise<any>;
    init(): void;
}

export type BooksControllerFactoryType = ControllerFactoryType<BooksControllerInterface>
