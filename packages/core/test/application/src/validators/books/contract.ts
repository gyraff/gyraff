import { ValidatorFactoryType, ValidatorInterface } from '@gyraff/validator';
import {
    ControllerValidatorFactoryType,
    ControllerValidatorInterface,
} from '../../../../../src/controller/validator/contract';
import { Context } from 'koa';


export interface BooksValidatorInterface extends ControllerValidatorInterface {
    index(ctx: Context): void,
}

export type BooksValidatorFactoryType = ControllerValidatorFactoryType<BooksValidatorInterface>;