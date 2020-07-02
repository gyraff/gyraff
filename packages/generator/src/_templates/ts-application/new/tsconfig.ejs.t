---
to: <%= outDir  %>/<%= name %>/tsconfig.json
unless_exists: true
---
{
  "compilerOptions": {
    "moduleResolution": "node",
    "module": "commonjs",
    "target": "es6",
    "sourceMap": true,
    "declaration": false,
    "esModuleInterop": true,
    "outDir": "./dist",
    "strict": true,
    "removeComments": true
  },
  "include": [
    "./"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "test",
    "src/**/*.test.ts"
  ]
}
