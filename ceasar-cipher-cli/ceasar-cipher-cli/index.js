const fs = require('fs')
const path = require('path')
const argv = require('minimist');

const encode = require('./encode')
const decode = require('./decode');
const cipherTransform = require('./cipher-transform');


const argvObj = argv(process.argv.slice(2));

const shift = argvObj.s || argvObj.shift;
const action = argvObj.a || argvObj.action;
const input = argvObj.i || argvObj.input;
const output = argvObj.o || argvObj.output;

if (!action || shift === undefined) {
    process.stderr.write('||----- Please, pass all required options\n')
    process.stderr.write('||----- -s or --shift for cipher shift - any positive number\n')
    process.stderr.write('||----- -a or --action for cipher action - encode or decode')
    process.exit(1)
}

if (shift === true) {
    process.stderr.write('||----- Please try again with a positive shift\n')
    process.exit(1) 
}
let inputPath = '';
let outputPath = '';

input && (inputPath = path.resolve(__dirname, input))
output && (outputPath = path.resolve(__dirname, output))

try {
    if(!!input) {
        inputPath = path.resolve(__dirname, input)
        if(!(fs.existsSync(inputPath))) throw new Error('wrong input path!')
    }
    if (!!output) {
        outputPath = path.resolve(__dirname, output)
        if(!(fs.existsSync(outputPath))) throw new Error('Wrong output path!')
    }
} catch (error) {
    process.stderr.write('||----- Oops! :)\n')
    process.stderr.write('||----- Please, make sure files are exist and paths are correct \n')
    process.stderr.write('||----- ' + error)
    process.exit(1)
}

const read = input ? fs.createReadStream(inputPath) : process.stdin
let write = output ? (fs.createWriteStream(outputPath, {flags: 'a'})) : process.stdout
const transform = new cipherTransform(action === 'encode' ? encode : decode, shift, !!input);

!input && (console.log('||---------- Please, type in string to ' + action))
!input && process.stdin.resume()

read
    .pipe(transform)
    .pipe(write);
    