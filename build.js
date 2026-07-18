const fs = require('fs');
const path = require('path');

const sourceFiles = [
  path.join(__dirname, 'index.js'),
  path.join(__dirname, 'db.js'),
  path.join(__dirname, 'routes', 'users.js'),
  path.join(__dirname, 'models', 'User.js'),
];
const outDir = path.join(__dirname, 'dist');

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(path.join(outDir, 'routes'), { recursive: true });
fs.mkdirSync(path.join(outDir, 'models'), { recursive: true });

for (const sourceFile of sourceFiles) {
  const relativePath = path.relative(__dirname, sourceFile);
  const outFile = path.join(outDir, relativePath);
  fs.copyFileSync(sourceFile, outFile);
}

// generate a server.js entry that starts the app (some Dockerfiles expect dist/server.js)
const serverFile = path.join(outDir, 'server.js');
const serverContents = "const app = require('./index');\n" +
	"const PORT = process.env.PORT || 3000;\n" +
	"app.listen(PORT, () => {\n" +
	"  console.log('Server is running on http://localhost:' + PORT);\n" +
	"});\n";
fs.writeFileSync(serverFile, serverContents, { encoding: 'utf8' });

console.log('Build completed: MongoDB app files were copied into dist/.');
