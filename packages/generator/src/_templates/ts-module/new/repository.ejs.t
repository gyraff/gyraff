---
to: <%if (!locals.skipRepository) { %><%= outDir  %>/src/repositories/<%= namePluralDashed %>/index.ts<%}%>
unless_exists: true
---
import {Repository, SQLiteStorageInterface, StorageInterface} from '@gyraff/repository';
import { ModelFactoryType } from '@gyraff/model';
import { <%= namePluralCamelized %>RepositoryInterface } from './contract';

export function $<%= namePluralCamelized %>Repository(
    <%= nameClass %>Model: ModelFactoryType,
    <%= namePluralCamelized %>RepositoryStorage: StorageInterface,
) {
    return Repository.compose<<%= namePluralCamelized %>RepositoryInterface>({
        Model: <%= nameClass %>Model,
        storage: <%= namePluralCamelized %>RepositoryStorage,

        // Add custom repository methods
    });
}
