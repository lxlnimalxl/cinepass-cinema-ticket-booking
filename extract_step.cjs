const fs = require('fs');
const path = require('path');

const [,, stepOutputFile, customName] = process.argv;
const raw = fs.readFileSync(stepOutputFile, 'utf8');
const data = JSON.parse(raw);
const base64Str = data.result.base64;
const buf = Buffer.from(base64Str, 'base64');
const targetFile = customName || data.result.filename;
const dest = path.join(__dirname, 'src', 'assets', 'images', targetFile);
fs.writeFileSync(dest, buf);
console.log(`Saved ${targetFile} (${buf.length} bytes)`);
