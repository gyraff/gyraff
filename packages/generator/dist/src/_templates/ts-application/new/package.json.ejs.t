---
to: <%= outDir  %>/<%= name %>/package.json
unless_exists: true
---
{
  "name": "<%= name %>",
  "devDependencies": {
    "@types/express-useragent": "1.0.0",
    "@types/ioredis": "4.14.9",
    "@types/jest": "^25.2.1",
    "@types/koa": "2.11.3",
    "@types/koa-bodyparser": "4.3.0",
    "@types/koa-logger": "3.1.1",
    "@types/koa-router": "7.4.0",
    "@types/lodash": "^4.14.149",
    "@types/node": "^13.13.0",
    "@types/redis": "2.8.18",
    "@typescript-eslint/eslint-plugin": "^2.28.0",
    "@typescript-eslint/parser": "^2.28.0",
    "eslint": "^6.8.0",
    "eslint-config-prettier": "^6.10.1",
    "eslint-plugin-prettier": "^3.1.3",
    "jest": "^25.4.0",
    "jest-cli": "^25.2.4",
    "mkdirp": "^1.0.4",
    "prettier": "^2.0.4",
    "rimraf": "^3.0.2",
    "ts-jest": "^25.4.0",
    "ts-node": "^8.8.2",
    "typescript": "^3.8.3"
  },
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "@gyraff/core": "1.0.45"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "mkdirs": "mkdirp ./dist/data/logs && mkdirp ./dist/data/storage/SQLiteStorage/migrations && mkdirp ./dist/data/storage/SQLiteStorage/seeds",
    "tsc": "tsc && npm run mkdirs"
  },
  "author": "",
  "license": "MIT",
  "description": ""
}