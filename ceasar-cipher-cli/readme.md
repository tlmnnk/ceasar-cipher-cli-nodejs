# Ceasar Cipher CLI

Command line Interface application with encripts or decripts text using the Ceasar's Cipher.
The programm encripts or decripts only english alphabet letters. Any other characters are unganged.

## How to install

1. Download from the repository.
2. Open the command line and go to the app folder.
3. Run "npm install"
5. You are all set to use the app

# How to use


After npm install **go to ceasar-cipher-cli folder** to run programm commands without attaching folder name to commands

```bash
$ cd ceasar-cipher-cli
```

After that enter the following into command line "node ceasar-cipher-cli [options]", where options are parametras which determine the operation of the app:

* -s, --shift: a shift
* -i, --input: an input file
* -o, --output: an output file
* -a, --action: an action encode/decode

The **action** option can rake values **encode** of **decode** and indicates what needs to be done with the incoming text: **encrypt** or **decrypt**.

The **shift** option must be a positive integer. It denotes a **shift** of letters for encryption or decryption.

**action** and **shift** options are **mandatory**: if one of them absent, there will be an error.

**input** and **output** options must be relative or absolute path to file or even filename if file is in app root folder.

If a file on any of the paths do not exists or path is incorrect, there will be an error.

If the **input** and/or **output** options are absent, then reading and/or writing will be carried out from/to the **command line**. To interrupt the process press **Ctrl+C**

Usage example:

```bash
$ node ceasar-cipher-cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

Before:

> input.txt This is secret. Message about "_" symbol!

After:

> output.txt Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!
