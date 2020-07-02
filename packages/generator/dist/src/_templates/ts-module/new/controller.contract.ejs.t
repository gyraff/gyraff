---
to: <%if (!locals.skipController) { %><%= outDir  %>/src/controllers/<%= namePluralDashed %>/contract.ts<%}%>
unless_exists: true
---
import { Context } from 'koa';
import {ControllerFactoryType, ControllerInterface} from '@gyraff/core';
import { <%= namePluralCamelized %>ServiceInterface } from '../../services/<%= namePluralDashed %>/contract';
import { <%= namePluralCamelized %>ViewFactoryType } from '../../views/<%= namePluralDashed %>/contract';
import { <%= namePluralCamelized %>ValidatorFactoryType } from '../../validators/<%= namePluralDashed %>/contract';

export interface <%= namePluralCamelized %>ControllerInterface extends ControllerInterface {
    <%= namePluralCamelizedU %>Service: <%= namePluralCamelized %>ServiceInterface | null;
    View: <%= namePluralCamelized %>ViewFactoryType,
    Validator: <%= namePluralCamelized %>ValidatorFactoryType,
    index(ctx: Context): Promise<any>;
    init(): void;
}

export type <%= namePluralCamelized %>ControllerFactoryType = ControllerFactoryType<<%= namePluralCamelized %>ControllerInterface>
