import { BooksControllerFactoryType } from "../../../controllers/books/contract";
import Router from "koa-router";

export function $BooksRouter(BooksController: BooksControllerFactoryType) {
    const controller = BooksController();
    return function booksRouter(router: Router) {
        router.get('/', controller.action('index'));
    }
}