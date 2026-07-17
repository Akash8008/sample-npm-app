const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, 'src');
const outDir = path.resolve(__dirname, 'dist');

function copyDirectory(source, destination) {
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }
}

fs.rmSync(outDir, { recursive: true, force: true });
copyDirectory(srcDir, outDir);
console.log('Build completed: dist/ generated.');
