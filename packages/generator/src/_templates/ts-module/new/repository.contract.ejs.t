---
to: <%if (!locals.skipRepository) { %><%= outDir  %>/src/repositories/<%= namePluralDashed %>/contract.ts<%}%>
unless_exists: true
---
import { RepositoryFactoryType, RepositoryInterface } from '@gyraff/repository';

export interface <%= namePluralCamelized %>RepositoryInterface extends RepositoryInterface {
    // TODO add methods here
}

export type <%= namePluralCamelized %>RepositoryFactoryType = RepositoryFactoryType<<%= namePluralCamelized %>RepositoryInterface>;
