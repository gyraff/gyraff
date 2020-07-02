---
to: <%= outDir  %>/<%= name %>/index.ts
unless_exists: true
---
import { gyraff } from '@gyraff/core';

export async function application() {
    const dir = `${__dirname}/src/config`;
    await gyraff(dir);
}

application();

