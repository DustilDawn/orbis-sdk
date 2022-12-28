import esbuild from 'esbuild';
import fs from 'fs';

async function main() {
    await esbuild.build({
        entryPoints: ['./index.js'],
        sourceRoot: "./",
        globalName: 'orbisSdk',
        bundle: true,
        minify: true,
        outfile: './dist/orbis-sdk.js',
    });
}

await main();

// get the file size of the output file in kb in javascript 
const stats = fs.statSync('./dist/orbis-sdk.js');
const fileSizeInBytes = stats.size;
const fileSizeInKb = fileSizeInBytes / 1000.0;

// format the output file size to 2 decimal places and make it a string, and provide both kb and mb
// and append with the size unit
const fileSizeInKbString = fileSizeInKb.toFixed(2) + "kb";
const fileSizeInMbString = (fileSizeInKb / 1000.0).toFixed(2) + "mb";

console.log(fileSizeInKbString);
console.log(fileSizeInMbString);

// read the file and replace var orbisSdk to export const orbisSdk
const data = fs.readFileSync('./dist/orbis-sdk.js', 'utf8');
const result = data.replace(/var orbisSdk/g, 'export const orbisSdk');

// write the file
fs.writeFileSync('./dist/orbis-sdk.js', result, 'utf8');