---
to: <%if (!locals.skipRepository) { %><%= outDir  %>/src/repositories/<%= namePluralDashed %>/storage/index.ts<%}%>
unless_exists: true
---
import { SQLiteStorage } from '@gyraff/repository';
import { getConnector, KnexStorageConnectorInterface } from '@gyraff/connector';
import { ApplicationConfigInterface } from '@gyraff/core';

export function $<%= namePluralCamelized %>RepositoryStorage(config: ApplicationConfigInterface) {
    const knexStorageConnector: KnexStorageConnectorInterface = getConnector('SQLiteStorageConnector');
    return SQLiteStorage({
        tableName: '<%= namePluralUnderscored %>',
        knexStorageConnector,
    });
}
