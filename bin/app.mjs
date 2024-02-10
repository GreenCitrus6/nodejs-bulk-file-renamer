#!/usr/bin/env node
import yargs from 'yargs';
// import { hideBin } from 'yargs/helpers';
import * as path from 'node:path';
// import * as fs from 'node:fs/promises';
import * as fs from 'node:fs';

const options = yargs
    .usage("Usage: -i <input directory> -o <name of files to be renamed> -n <new name of files>")
    .option("i", { alias: "input", describe: "Directory containing files to be renamed", type: "string", demandOption: true })
    .argv;

const inputDirec = options.input;
const oldName = options.old;
const newName = options.name;

const unallowedChars = new RegExp(/a/); //placeholder, will be characters that are not allowed in windows files names

const fileList = fs.readdirSync(inputDirec);
const filePaths = [];
for (let file in fileList) {
    let fileName = `${inputDirec}\\${fileList[file]}`
    filePaths.push(fileName);
}

console.log(filePaths);


/* 1. regex processing the name format to be used
        if this fails, then throw error that format is invalid

    2. create array of every file in the directory
3. for each item in the array, rename it according to the name format
 */

/* Renaming files in a directory: 
node . -i <input directory> -n <target name>
All files in the input directory will be renamed to the target name
in the format of [USER INPUT]-[NUMBER].extension
*/