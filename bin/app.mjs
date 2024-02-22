#!/usr/bin/env node
import yargs from 'yargs';
// import { hideBin } from 'yargs/helpers';
import * as path from 'node:path';
import * as fsPromises from 'node:fs/promises';
import * as fs from 'node:fs';

const options = yargs
    .usage("Usage: -i <input directory> -n <New name for the files> -e <file extension to be used. DO NOT include a \".\"")
    .option("i", { alias: "input", describe: "Directory containing files to be renamed", type: "string", demandOption: true })
    .option("n", { alias: "name", describe: "The new name to be used", type: "string", demandOption: true })
    .option("e", { alias: "extension", describe: "File extension to be appended to the end of each file", type: "string", demandOption: false })
    .argv;

const inputDirec = options.input;
const newName = options.name;
const newExtension = options.extension;

const unallowedChars = new RegExp(/[<>:"/\\|?]/); 
//characters that are not allowed in windows files names

const fileList = fs.readdirSync(inputDirec);
const filePaths = [];
for (let file in fileList) {
    let fileName = `${inputDirec}\\${fileList[file]}`
    filePaths.push(fileName);
}

function checkNameValidity(nameForm) {
    if (nameForm.length > 100) {
        return false;
    }
    // if input contains any in unallow regex, return false
    if (unallowedChars.test(nameForm)) {
        return false;
    }
    return true;
}
// push new file paths to this array, then iterate over the current files and rename them accordingly
const newFilePaths = [];

if (checkNameValidity(newName)) {
    for (const file in fileList) {
        let newFileName = String(newName) + `-${file}`;
        let newFilePath = `${inputDirec}\\${newFileName}`;
        fsPromises.rename(filePaths[file], `${newFilePath}.${newExtension}`);
    }
} else {
    console.log('Error: Invalid File Name Format');
}


console.log(filePaths);
