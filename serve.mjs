import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PORT = 3000;

const mime = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.mjs': 'application/javascript', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.pdf': 'application/pdf',
};

createServer(async (req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath = join(__dirname, urlPath === '/' ? 'index.html' : urlPath);
  const contentType = mime[extname(filePath)] || 'application/octet-stream';
  try {
    const data = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch {
    try {
      const data = await readFile(join(filePath, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  }
}).listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
