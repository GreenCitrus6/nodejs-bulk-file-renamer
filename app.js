import yargs from 'yargs';
const path = require('node:path');
import * as fs from 'node:fs/promises';

const options = yargs 
    .usage("Usage: -i <input directory> -o <name format of target files> -n <target name format>")
    .option("i", { alias: "input", describe: "Directory containing the files to be renamed", type: "string", demandOption: true })
    .option("o", { alias: "old", describe: "Old name format, the format of files to be targeted", type: "string", demandOption: false })
    .option("n", { alias: "name", describe: "Targeted name format", type: "string", demandOption: true })
    .argv;


    const inputDirec = options.input;
    const oldName = options.old;
    const newName = options.name;

    const unallowedChars = new RegExp(/a/); //placeholder, will be characters that are not allowed in windows files names



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