const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, 'index.js');
const outDir = path.join(__dirname, 'dist');
const outFile = path.join(outDir, 'index.js');

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
fs.copyFileSync(sourceFile, outFile);

// generate a server.js entry that starts the app (some Dockerfiles expect dist/server.js)
const serverFile = path.join(outDir, 'server.js');
const serverContents = "const app = require('./index');\n" +
	"const PORT = process.env.PORT || 3000;\n" +
	"app.listen(PORT, () => {\n" +
	"  console.log('Server is running on http://localhost:' + PORT);\n" +
	"});\n";
fs.writeFileSync(serverFile, serverContents, { encoding: 'utf8' });

console.log('Build completed: dist/index.js and dist/server.js generated.');
