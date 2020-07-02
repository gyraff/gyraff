---
to: <%if (!locals.skipRepository) { %><%= outDir  %>/src/repositories/<%= namePluralDashed %>/index.js<%}%>
unless_exists: true
---
'use strict';
const { Repository } =  require('@gyraff/repository');

module.exports = function $<%= namePluralCamelized %>Repository(
    <%= nameClass %>Model,
    <%= namePluralCamelized %>RepositoryStorage,
) {
    return Repository.compose({
        Model: <%= nameClass %>Model,
        storage: <%= namePluralCamelized %>RepositoryStorage,

        // Add custom repository methods
    });
}
