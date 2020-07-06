---
to: <%= outDir  %>/<%= name %>/jest.config.js
unless_exists: true
---
'use strict';
const path = require('path');

module.exports = {
    verbose: true,
    testEnvironment: 'node',
    rootDir: path.resolve('./test'),
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};


