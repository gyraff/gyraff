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
const fs_1 = require("fs");
const supportedLang = ['js', 'ts'];
const baseDir = path_1.resolve(__dirname, './../../');
const generatorsPath = path_1.resolve(__dirname, '../src');
const hugen = `${baseDir}/node_modules/.bin/hygen`;
const [generator, action, name] = yargs_1.argv._;
let appLang;
let args = `--outDir ${process.env.PWD}`;
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
            
        gyraff module new <module name> [--skipModel] [--skipController] [--skipRepository] [--skipValidator] [--skipRoutes] [--skipView]
                
        Example: 
            
        gyraff module new user-notifications
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
if (!generator || !action || !name) {
    error('Syntax error.');
}
if (!['application', 'module'].includes(generator)) {
    error('Invalid command');
}
if (action !== 'new') {
    error('Invalid action');
}
validateName(name);
if (generator === 'application') {
    if (!yargs_1.argv.appLang) {
        error(`Missing application language.`);
    }
    if (!supportedLang.includes(yargs_1.argv.appLang)) {
        error(`Application language is invalid or not supported`);
    }
    appLang = yargs_1.argv.appLang;
}
else {
    let gyraffRC = {};
    try {
        const data = fs_1.readFileSync(`${process.env.PWD}/.gyraffrc`, 'utf8');
        gyraffRC = JSON.parse(data);
    }
    catch (e) {
        error(`[gyraffrc] file could not be found. Make sure you are in the application root directory.`);
    }
    if (!gyraffRC.appName || !gyraffRC.appLang)
        error('Invalid [gyraffrc] file.');
    const curDir = path_1.resolve('./');
    if (curDir.split('/').pop() !== gyraffRC.appName)
        error(`Invalid application directory!`);
    if (!supportedLang.includes(gyraffRC.appLang)) {
        error(`Application language is invalid or not supported`);
    }
    appLang = gyraffRC.appLang;
    args += ` --appName ${gyraffRC.appName}  --appLang ${gyraffRC.appLang}`;
    if (generator === 'module') {
        if (yargs_1.argv.skipModel)
            args += ` --skipModel`;
        if (yargs_1.argv.skipController)
            args += ` --skipController`;
        if (yargs_1.argv.skipRepository)
            args += ` --skipRepository`;
        if (yargs_1.argv.skipValidator)
            args += ` --skipValidator`;
        if (yargs_1.argv.skipView)
            args += ` --skipView`;
        if (yargs_1.argv.skipRoutes)
            args += ` --skipRoutes`;
    }
}
const cmd = `${hugen} ${appLang}-${generator} ${action} ${name} ${args}`;
child_process_1.exec(cmd, {
    cwd: generatorsPath,
}, (err, stdout) => {
    if (err)
        error(err.message);
    print('Done!');
});
//# sourceMappingURL=cli.js.map