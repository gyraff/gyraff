---
to: <%= outDir  %>/src/services/<%= namePluralDashed %>.js
unless_exists: true
---
'use strict';
const { ComposableFactory } = require('@gyraff/factory');


module.exports = function $<%= namePluralCamelized %>Service(
    <%= nameClass %>Model,
    <%= namePluralCamelized %>Repository,
) {
    const <%= namePluralCamelizedU %>Repository = <%= namePluralCamelized %>Repository();
    return ComposableFactory({
        async index(params = {}) {
            return <%= namePluralCamelizedU %>Repository.find(params);
        },
    });
}
