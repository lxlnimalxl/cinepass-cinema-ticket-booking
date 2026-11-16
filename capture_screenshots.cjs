const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DIST_DIR = path.join(__dirname, 'dist');
const OUTPUT_DIR = path.join(__dirname, 'screenshots');
const PORT = 4192;

function startServer() {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.json': 'application/json'
  };

  const server = http.createServer((req, res) => {
    let filePath = path.join(DIST_DIR, req.url.split('?')[0]);
    if (filePath.endsWith(path.sep) || (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory())) {
      filePath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end('Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`Static server running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function run() {
  const server = await startServer();
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1024, deviceScaleFactor: 2 });

    // 1. Home Movie Feed
    console.log('Capturing 01-movie-feed-home.png...');
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '01-movie-feed-home.png'), fullPage: false });

    // 2. Open 3D Navigation Drawer
    console.log('Capturing 05-3d-navigation-drawer.png...');
    await page.evaluate(() => {
      const menuBtn = document.querySelector('button[aria-label="Open Navigation Menu"]');
      if (menuBtn) menuBtn.click();
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '05-3d-navigation-drawer.png'), fullPage: false });

    // Close drawer
    await page.evaluate(() => {
      const closeBtn = document.querySelector('button');
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    // 3. Movie Detail Page (PDP)
    console.log('Capturing 02-movie-detail-pdp.png...');
    await page.evaluate(() => {
      const playBtn = document.querySelector('button[title="View Movie Details & Trailer"]');
      if (playBtn) playBtn.click();
    });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '02-movie-detail-pdp.png'), fullPage: false });

    // 4. Seat Selection Matrix View
    console.log('Capturing 03-seat-selection-matrix.png...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const confirmBtn = btns.find(b => b.textContent.includes('Confirm'));
      if (confirmBtn) confirmBtn.click();
    });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '03-seat-selection-matrix.png'), fullPage: false });

    // 5. Confirmed Boarding Pass Ticket View
    console.log('Capturing 04-confirmed-ticket-pass.png...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const buyBtn = btns.find(b => b.textContent.includes('Confirm') && b.className.includes('bg-[#00C853]'));
      if (buyBtn) buyBtn.click();
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '04-confirmed-ticket-pass.png'), fullPage: false });

    // 6. Saved Watchlist View
    console.log('Capturing 06-saved-watchlist.png...');
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800));
    await page.evaluate(() => {
      const menuBtn = document.querySelector('button[aria-label="Open Navigation Menu"]');
      if (menuBtn) menuBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const savedBtn = btns.find(b => b.textContent.includes('Saved'));
      if (savedBtn) savedBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '06-saved-watchlist.png'), fullPage: false });

    // 7. Notifications & Promos View
    console.log('Capturing 07-notifications-promos.png...');
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800));
    await page.evaluate(() => {
      const notifBtn = document.querySelector('button[aria-label="Open Notifications"]');
      if (notifBtn) notifBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '07-notifications-promos.png'), fullPage: false });

    // 8. Settings View
    console.log('Capturing 08-settings-view.png...');
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800));
    await page.evaluate(() => {
      const menuBtn = document.querySelector('button[aria-label="Open Navigation Menu"]');
      if (menuBtn) menuBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const settBtn = btns.find(b => b.textContent.includes('Setting'));
      if (settBtn) settBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '08-settings-view.png'), fullPage: false });

    console.log('All 8 high-resolution screenshots captured successfully!');
  } finally {
    await browser.close();
    server.close();
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
