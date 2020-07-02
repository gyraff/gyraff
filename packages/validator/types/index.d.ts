import { ApplicationError, ApplicationErrorInterface, ApplicationErrorConstructorParamsType } from '@gyraff/error';
import { ValidatorFactoryType } from '../src/contract';

export { ValidatorInterface, ValidatorFactoryType } from '../src/contract';
export class ValidatorError extends ApplicationError {
    new(params: ApplicationErrorConstructorParamsType): ApplicationErrorInterface;
}
export const Validator: ValidatorFactoryType;
