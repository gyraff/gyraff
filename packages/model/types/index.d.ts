import { ApplicationError, ApplicationErrorInterface, ApplicationErrorConstructorParamsType } from '@gyraff/error';
import { ModelFactoryType } from '../src/contract';

export { ModelInterface, ModelFactoryType } from '../src/contract';
export const Model: ModelFactoryType;

export class ModelError extends ApplicationError {
    new(params: ApplicationErrorConstructorParamsType): ApplicationErrorInterface;
}

export class ModelValidatorError extends ModelError {}
