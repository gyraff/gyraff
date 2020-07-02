import { ControllerFactoryType } from '../../../../../src/controller/contract';
import { Context } from 'koa';
import { BooksServiceFactoryType } from '../../services/books/contract';
import { BooksControllerInterface } from './contract';
import { BooksViewFactoryType } from '../../views/books/contract';
import { BooksValidatorFactoryType } from '../../validators/books/contract';


export function $BooksController(
    Controller: ControllerFactoryType,
    BooksService: BooksServiceFactoryType,
    BooksView: BooksViewFactoryType,
    BooksValidator: BooksValidatorFactoryType,
) {
    return Controller.compose<BooksControllerInterface>({
        booksService: null,
        Validator: BooksValidator,
        View: BooksView,
        init() {
            this.booksService = BooksService();
        },
        async index(ctx: Context) {
            return this.booksService?.index(ctx.request.query);
        },
    });
}
