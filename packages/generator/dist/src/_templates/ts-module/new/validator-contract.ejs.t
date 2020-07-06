---
to: <%if (!locals.skipValidator) { %><%= outDir  %>/src/validators/<%= namePluralDashed %>/contract.ts<%}%>
unless_exists: true
---
import { ValidatorFactoryType, ValidatorInterface } from '@gyraff/validator';
import {
    ControllerValidatorFactoryType,
    ControllerValidatorInterface,
} from '@gyraff/core';
import { Context } from 'koa';


export interface <%= namePluralCamelized %>ValidatorInterface extends ControllerValidatorInterface {
    index(ctx: Context): void,
}

export type <%= namePluralCamelized %>ValidatorFactoryType = ControllerValidatorFactoryType<<%= namePluralCamelized %>ValidatorInterface>;
