import { ApplicationErrorConstructorInterface } from '../src/contract';
import { HttpErrorConstructorInterface } from '..';

export {
    ApplicationErrorConstructorInterface,
    ApplicationErrorInterface,
    ApplicationErrorConstructorParamsType,
    ApplicationErrorPropertiesInterface,
    ApplicationErrorParamsInterface,
} from '../src/contract';

export {
    HttpErrorConstructorInterface,
    HttpErrorPropertiesInterface,
    HttpErrorInterface,
    HttpErrorParamsInterface,
    HttpErrorConstructorParamsType,
} from '../src/http/contract';

export const ApplicationError: ApplicationErrorConstructorInterface;

export const HttpError: HttpErrorConstructorInterface;
