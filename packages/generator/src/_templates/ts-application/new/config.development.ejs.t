---
to: <%= outDir  %>/<%= name %>/src/config/development.ts
unless_exists: true
---
import { EnvironmentConfigInterface } from "@gyraff/core";

export const config: EnvironmentConfigInterface = {
    port: 4000,
};
