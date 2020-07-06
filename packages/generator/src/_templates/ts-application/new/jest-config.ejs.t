---
to: <%= outDir  %>/<%= name %>/jest.config.js
unless_exists: true
---
'use strict';

module.exports = {
    testEnvironment: 'node',
    verbose: true,
    preset: 'ts-jest',
};


