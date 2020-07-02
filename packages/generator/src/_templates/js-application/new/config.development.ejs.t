---
to: <%= outDir  %>/<%= name %>/src/config/development.js
unless_exists: true
---
'use strict';

module.exports = {
    config: {
        port: 4000,
    },
};
