import ZSchema from 'z-schema';
import { ComposableInterface } from '@gyraff/factory';

export interface ValidatorInterface {
    validator: ZSchema | null;
    validate: (data: object, schema: object, throwException?: boolean) => boolean;
    getLastErrorDetails: () => ZSchema.SchemaErrorDetail[] | null;
    getLastError: () => ZSchema.SchemaError | null;
    init(args: { opts?: ZSchema.Options }): void;
}

export type ValidatorFactoryType<T extends ValidatorInterface = ValidatorInterface> = ComposableInterface<T>;
