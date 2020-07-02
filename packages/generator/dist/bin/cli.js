#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
const yargs_1 = require("yargs");
const child_process_1 = require("child_process");
const os_1 = require("os");
const supportedLang = ['js', 'ts'];
const baseDir = path_1.resolve(__dirname, './../../');
const generatorsPath = path_1.resolve(__dirname, '../src');
const hugen = `${baseDir}/node_modules/.bin/hygen`;
const [generator, action, name] = yargs_1.argv._;
function print(lines, sanitize = true) {
    const text = sanitize
        ? lines
            .split(os_1.EOL)
            .map((i) => `${i.trim()}${os_1.EOL}`)
            .join('')
        : lines;
    console.log(text);
}
function help() {
    print(`
        Help:
        
        To create a new application run: 
            
        gyraff application new <application name>;
                
        Example: 
            
        gyraff application new my-awsome-app --appLang js
                
        To create a new module run: 
            
        gyraff module new <module name> --appName <application name> --appLang <application language> [--skipModel] [--skipController] [--skipRepository] [--skipValidator] [--skipRoutes] [--skipView]
                
        Example: 
            
        gyraff module new user-notifications --appName my-awsome-app --applang js
    `);
}
function error(message) {
    print(chalk_1.default.red.bgGreen.bold(`Error: ${message}`));
    help();
    process.exit(1);
}
function validateName(name) {
    if (!/^([a-z]+)((-?)([a-z]+))*$/.test(name)) {
        error('Application/Module name does not conform to the pattern of ([a-z]+)((-?)([a-z]+))*');
    }
}
print(chalk_1.default.green(figlet_1.default.textSync('Gyraff', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
})), false);
if (!generator || !action || !name)
    error('Syntax error.');
if (!['application', 'module'].includes(generator))
    error('Invalid command');
if (action !== 'new')
    error('Invalid action');
if (!yargs_1.argv.appLang)
    error(`Missing application language.`);
if (!supportedLang.includes(yargs_1.argv.appLang))
    error(`Application language is invalid or not supported`);
let cmd = `${hugen} ${yargs_1.argv.appLang}-${generator} ${action} ${name} --outDir ${process.env.PWD}`;
if (generator === 'module') {
    if (!yargs_1.argv.appName)
        error('appName parameter is required');
    validateName(yargs_1.argv.appName);
    const curDir = path_1.resolve('./');
    if (curDir.split('/').pop() !== yargs_1.argv.appName)
        error(`Invalid application directory!`);
    cmd += ` --appName ${yargs_1.argv.appName}`;
    if (yargs_1.argv.skipModel)
        cmd += ` --skipModel`;
    if (yargs_1.argv.skipController)
        cmd += ` --skipController`;
    if (yargs_1.argv.skipRepository)
        cmd += ` --skipRepository`;
    if (yargs_1.argv.skipValidator)
        cmd += ` --skipValidator`;
    if (yargs_1.argv.skipView)
        cmd += ` --skipView`;
    if (yargs_1.argv.skipRoutes)
        cmd += ` --skipRoutes`;
}
child_process_1.exec(cmd, {
    cwd: generatorsPath,
}, (err, stdout) => {
    if (err)
        error(err.message);
    print(stdout);
    print('Done!');
});
//# sourceMappingURL=cli.js.map