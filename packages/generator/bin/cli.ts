#!/usr/bin/env node

import { resolve } from 'path';
import chalk from 'chalk';
import figlet from 'figlet';
import { argv } from 'yargs';
import { exec } from 'child_process';
import { EOL } from 'os';

const supportedLang = ['js', 'ts'];
const baseDir = resolve(__dirname, './../../');
const generatorsPath = resolve(__dirname, '../src');
const hugen = `${baseDir}/node_modules/.bin/hygen`;
const [generator, action, name] = argv._;

function print(lines: string, sanitize = true): void {
    const text = sanitize
        ? lines
              .split(EOL)
              .map((i) => `${i.trim()}${EOL}`)
              .join('')
        : lines;
    console.log(text);
}

function help(): void {
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

function error(message: string): void {
    print(chalk.red.bgGreen.bold(`Error: ${message}`));
    help();
    process.exit(1);
}

function validateName(name: string): void {
    if (!/^([a-z]+)((-?)([a-z]+))*$/.test(name)) {
        error('Application/Module name does not conform to the pattern of ([a-z]+)((-?)([a-z]+))*');
    }
}

print(
    chalk.green(
        figlet.textSync('Gyraff', {
            font: 'Ghost',
            horizontalLayout: 'default',
            verticalLayout: 'default',
        }),
    ),
    false,
);

if (!generator || !action || !name) error('Syntax error.');
if (!['application', 'module'].includes(generator)) error('Invalid command');
if (action !== 'new') error('Invalid action');
if (!argv.appLang) error(`Missing application language.`);
if (!supportedLang.includes(argv.appLang as string)) error(`Application language is invalid or not supported`);

let cmd = `${hugen} ${argv.appLang}-${generator} ${action} ${name} --outDir ${process.env.PWD}`;

if (generator === 'module') {
    if (!argv.appName) error('appName parameter is required');
    validateName(argv.appName as string);
    const curDir = resolve('./');
    if (curDir.split('/').pop() !== argv.appName) error(`Invalid application directory!`);
    // if (!existsSync(`./${argv.appName}`)) error(`Application [${argv.appName}] is not found.`);
    cmd += ` --appName ${argv.appName}`;
    if (argv.skipModel) cmd += ` --skipModel`;
    if (argv.skipController) cmd += ` --skipController`;
    if (argv.skipRepository) cmd += ` --skipRepository`;
    if (argv.skipValidator) cmd += ` --skipValidator`;
    if (argv.skipView) cmd += ` --skipView`;
    if (argv.skipRoutes) cmd += ` --skipRoutes`;
}

exec(
    cmd,
    {
        cwd: generatorsPath,
    },
    (err, stdout) => {
        if (err) error(err.message);
        print(stdout);
        print('Done!');
    },
);
