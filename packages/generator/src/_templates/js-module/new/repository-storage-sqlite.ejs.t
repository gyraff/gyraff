---
to: <%if (!locals.skipRepository) { %><%= outDir  %>/src/repositories/<%= namePluralDashed %>/storage/index.js<%}%>
unless_exists: true
---
'use strict';
const { SQLiteStorage } = require('@gyraff/repository');
const { getConnector } = require('@gyraff/connector');


module.exports = function $<%= namePluralCamelized %>RepositoryStorage(config) {
    const storageConnector = getConnector('SQLiteStorageConnector');
    return SQLiteStorage({
        tableName: '<%= namePluralUnderscored %>',
        storageConnector,
    });
}
