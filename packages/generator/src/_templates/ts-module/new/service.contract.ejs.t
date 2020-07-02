---
to: <%= outDir  %>/src/services/<%= namePluralDashed %>/contract.ts
unless_exists: true
---
import { ComposableInterface } from '@gyraff/factory';
import { ModelFactoryType } from '@gyraff/model';
import { <%= namePluralCamelized %>RepositoryInterface } from '../../repositories/<%= namePluralDashed %>/contract';

export interface <%= namePluralCamelized %>ServiceInterface {
    index(params: { [p: string]: any }): Promise<any>;
}

export type <%= namePluralCamelized %>ServiceFactoryType = ComposableInterface<<%= namePluralCamelized %>ServiceInterface>
