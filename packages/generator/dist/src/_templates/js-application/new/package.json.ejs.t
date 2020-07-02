---
to: <%= outDir  %>/<%= name %>/package.json
unless_exists: true
---
{
  "name": "<%= name %>",
  "devDependencies": {
    "eslint": "6.6.0",
    "eslint-config-airbnb-base": "14.0.0",
    "eslint-config-google": "0.14.0",
    "eslint-config-standard": "14.1.0",
    "eslint-plugin-import": "2.18.2",
    "eslint-plugin-promise": "4.2.1",
    "eslint-plugin-standard": "4.0.1",
    "jest": "24.9.0"
  },
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "@gyraff/core": "1.0.45"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "MIT",
  "description": ""
}