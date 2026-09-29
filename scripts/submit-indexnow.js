// Only a reviewed, changed URL list triggers this after a successful deployment.
const fs = require('fs');
const path = require('path');

const ORIGIN = 'https://paullegalassociates.com';
const HOST = new URL(ORIGIN).host;
const root = path.resolve(__dirname, '..');
const changes = JSON.parse(fs.readFileSync(path.join(root, 'indexnow/changed-urls.json'), 'utf8'));
const keyFile = changes.keyFile;

function validate() {
  if (!/^([A-Za-z0-9-]{8,128})\.txt$/.test(keyFile)) throw new Error('Invalid IndexNow key filename.');
  const key = keyFile.slice(0, -4);
  const localKey = fs.readFileSync(path.join(root, 'public', keyFile), 'utf8').trim();
  if (localKey !== key) throw new Error('Published key file does not match its filename.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(changes.date) || !changes.reason) {
    throw new Error('Record a date and a substantive update reason.');
  }
  if (!Array.isArray(changes.urls) || changes.urls.length < 1 || changes.urls.length > 100) {
    throw new Error('Include between 1 and 100 changed URLs.');
  }
  if (new Set(changes.urls).size !== changes.urls.length) throw new Error('Duplicate URL.');
  const sitemap = fs.readFileSync(path.join(root, 'build/sitemap.xml'), 'utf8');
  for (const url of changes.urls) {
    const parsed = new URL(url);
    if (parsed.origin !== ORIGIN || !parsed.pathname.endsWith('/') || parsed.search || parsed.hash ||
        !sitemap.includes(`<loc>${url}</loc>`)) {
      throw new Error(`Invalid or nonindexable sitemap URL: ${url}`);
    }
  }
  if (!fs.existsSync(path.join(root, 'build', keyFile))) {
    throw new Error('Key file missing from generated site build.');
  }
  return key;
}

async function fetchWithTimeout(url, options = {}) {
  return fetch(url, { ...options, signal: AbortSignal.timeout(15000) });
}

const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

async function verifyProductionKey(key) {
  const url = `${ORIGIN}/${keyFile}`;
  for (let attempt = 1; attempt <= 24; attempt += 1) {
    try {
      const response = await fetchWithTimeout(url, { headers: { 'Cache-Control': 'no-cache' } });
      if (response.status === 200 && (await response.text()).trim() === key) {
        console.log(`IndexNow key verified at ${url}`);
        return;
      }
    } catch (error) {
      console.log(`Key check ${attempt}: ${error.message}`);
    }
    if (attempt < 24) await delay(10000);
  }
  throw new Error('Production key file was not verified; no IndexNow URLs submitted.');
}

async function verifyProductionPages() {
  for (const url of changes.urls) {
    const response = await fetchWithTimeout(url, { headers: { 'Cache-Control': 'no-cache' } });
    if (response.status !== 200 || new URL(response.url).href !== url) {
      throw new Error(`Page not published with HTTP 200 at canonical URL: ${url} (${response.status})`);
    }
    const html = await response.text();
    const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
    const robots = html.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)?.[1] || '';
    if (canonical !== url || !/\bindex\b/i.test(robots) || /noindex/i.test(robots)) {
      throw new Error(`Page lacks a self canonical or indexable robots tag: ${url}`);
    }
    console.log(`Verified published page: ${url}`);
  }
}

async function main() {
  const key = validate();
  console.log(`Validated ${changes.urls.length} reviewed IndexNow URLs (${changes.date}).`);
  if (process.argv[2] === '--check') return;
  if (process.argv[2] !== '--submit') throw new Error('Use --check or --submit.');
  await verifyProductionKey(key);
  await verifyProductionPages();
  const response = await fetchWithTimeout('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key, keyLocation: `${ORIGIN}/${keyFile}`, urlList: changes.urls })
  });
  console.log(`IndexNow response: HTTP ${response.status}; URLs: ${changes.urls.length}`);
  if (response.status !== 200 && response.status !== 202) {
    throw new Error(`IndexNow did not accept the request: ${response.status} ${(await response.text()).slice(0, 200)}`);
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
