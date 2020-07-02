---
to: <%= outDir  %>/src/services/<%= namePluralDashed %>/index.ts
unless_exists: true
---
import { <%= namePluralCamelized %>ServiceInterface } from './contract';
import { ComposableFactory } from '@gyraff/factory';
import { ModelFactoryType } from '@gyraff/model';
import { <%= namePluralCamelized %>RepositoryFactoryType } from '../../repositories/<%= namePluralDashed %>/contract';


export function $<%= namePluralCamelized %>Service(
    <%= nameClass %>Model: ModelFactoryType,
    <%= namePluralCamelized %>Repository: <%= namePluralCamelized %>RepositoryFactoryType,
) {
    const <%= namePluralCamelizedU %>Repository = <%= namePluralCamelized %>Repository();
    return ComposableFactory<<%= namePluralCamelized %>ServiceInterface>({
        async index(params = {}) {
            return <%= namePluralCamelizedU %>Repository.find(params);
        },
    });
}
