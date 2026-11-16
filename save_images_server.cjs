const http = require('http');
const fs = require('fs');
const path = require('path');

const TARGET_DIR = path.join(__dirname, 'src', 'assets', 'images');
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url, 'http://127.0.0.1:9876');

  if (url.pathname === '/upload' && req.method === 'POST') {
    const filename = url.searchParams.get('filename') || 'image.png';
    const filePath = path.join(TARGET_DIR, filename);
    const writeStream = fs.createWriteStream(filePath);

    req.pipe(writeStream);

    writeStream.on('finish', () => {
      console.log(`Saved: ${filename} (${fs.statSync(filePath).size} bytes)`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, filename, size: fs.statSync(filePath).size }));
    });

    writeStream.on('error', (err) => {
      console.error(`Error saving ${filename}:`, err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    });
    return;
  }

  if (url.pathname === '/stop') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ stopped: true }));
    server.close();
    process.exit(0);
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(9876, '127.0.0.1', () => {
  console.log('Image receiver server running on http://127.0.0.1:9876');
});
