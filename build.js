const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, 'index.js');
const outDir = path.join(__dirname, 'dist');
const outFile = path.join(outDir, 'index.js');

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
fs.copyFileSync(sourceFile, outFile);

console.log('Build completed: dist/index.js generated.');
