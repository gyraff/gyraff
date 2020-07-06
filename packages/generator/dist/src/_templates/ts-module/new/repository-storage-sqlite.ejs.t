---
to: <%if (!locals.skipRepository) { %><%= outDir  %>/src/repositories/<%= namePluralDashed %>/storage/index.ts<%}%>
unless_exists: true
---
import { SQLiteStorage } from '@gyraff/repository';
import { getConnector, SQLiteStorageConnectorType } from '@gyraff/connector';
import { ApplicationConfigInterface } from '@gyraff/core';

export function $<%= namePluralCamelized %>RepositoryStorage(config: ApplicationConfigInterface) {
    const storageConnector: SQLiteStorageConnectorType = getConnector('SQLiteStorageConnector');
    return SQLiteStorage({
        tableName: '<%= namePluralUnderscored %>',
        storageConnector,
    });
}
