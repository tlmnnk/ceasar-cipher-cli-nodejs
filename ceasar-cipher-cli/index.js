const fs = require('fs')
const path = require('path')
const argv = require('minimist');

const encode = require('./encode')
const decode = require('./decode');
const cipherTransform = require('./cipher-transform')


const argvObj = argv(process.argv.slice(2));

const shift = argvObj.s || argvObj.shift;
const action = argvObj.a || argvObj.action;
const input = argvObj.i || argvObj.input;
const output = argvObj.o || argvObj.output;

if (!action || !shift) {
    process.stderr.write('||----- Please, pass all required options\n')
    process.stderr.write('||----- -s or --shift for cipher shift - any positive number\n')
    process.stderr.write('||----- -a or --action for cipher action - encode or decode')
    process.exit(1)
}

let readPath = '';
let writePath = '';

try {
    input && (readPath = path.join(__dirname, input));
    output && (writePath = path.join(__dirname, output));
} catch (error) {
    process.stderr.write('||----- Error\n')
    process.stderr.write('||----- Please, make sure files are exist\n')
    process.stderr.write('||----- Error info: ' + error)
    process.exit(1)
}
console.log('after');
const read = input ? fs.createReadStream(readPath) : process.stdin
const transform = new cipherTransform(action === 'encode' ? encode : decode, shift);
const write = output ? fs.createWriteStream(writePath, {flags: 'a'}) : process.stdout;


read
    .pipe(transform)
    .pipe(write);


// process.stdin.on('data', function(chunk) {
//     console.log('chank = ', chunk.toString());
//     const arr = chunk.toString().split(' ').slice(2)
//     const lastEl = arr[arr.length - 1];
//     arr[arr.length - 1]= lastEl.slice(0, lastEl.indexOf('\r'))

//     console.log(argv(arr));
//     //console.log('You typed - ', str.slice(0, str.indexOf('\n')));
// });

