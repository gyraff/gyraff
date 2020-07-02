---
to: <%= outDir  %>/<%= name %>/index.js
unless_exists: true
---
'use strict';
const { gyraff } = require('@gyraff/core');

async function application() {
    const dir = `${__dirname}/src/config`;
    await gyraff(dir);
}

module.exports = {
    application,
}

application();

