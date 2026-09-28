const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const build = path.resolve(__dirname, '../build');
const origin = 'https://paullegalassociates.com';
const readPage = route => fs.readFileSync(path.join(build, route.slice(1), 'index.html'), 'utf8');
const pagePaths = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filename = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(filename);
    else if (entry.name === 'index.html') {
      const relative = path.relative(build, path.dirname(filename));
      pagePaths.push(relative ? `/${relative}/` : '/');
    }
  }
}
walk(build);
const routes = new Set(pagePaths);
const sitemap = [...fs.readFileSync(path.join(build, 'sitemap.xml'), 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.equal(sitemap.length, new Set(sitemap).size, 'Duplicate sitemap URLs');
assert.equal(sitemap.length, 238, 'Unexpected change to the reviewed sitemap inventory');
let links = 0;
const titles = new Map();
for (const route of pagePaths) {
  const dom = new JSDOM(readPage(route), { url: origin + route });
  const d = dom.window.document;
  assert(d.title.trim(), `${route}: missing title`);
  assert(!titles.has(d.title), `${route}: duplicate title shared with ${titles.get(d.title)}`);
  titles.set(d.title, route);
  assert.equal(d.querySelectorAll('h1').length, 1, `${route}: H1`);
  assert(d.querySelector('main').textContent.trim().length > 100, `${route}: empty main`);
  assert(d.querySelector('header a[href="/"]'), `${route}: missing initial navigation`);
  assert(d.querySelector('header a[aria-label="Call Paul Legal Associates"][href="tel:+917977063567"]'), `${route}: missing mobile call path`);
  assert.equal(d.querySelectorAll('link[rel="canonical"]').length, 1, `${route}: canonical count`);
  assert.equal(d.querySelector('link[rel="canonical"]').href, origin + route, `${route}: canonical URL`);
  assert.equal(d.querySelector('meta[property="og:url"]').content, origin + route, `${route}: og:url`);
  assert.equal(d.querySelectorAll('meta[name="description"]').length, 1, `${route}: description count`);
  assert(d.querySelector('a[href="tel:+917977063567"]'), `${route}: call path`);
  assert(d.querySelector('a[href="mailto:info@paullegalassociates.com"]'), `${route}: email path`);
  assert(!d.querySelector('[style*="opacity:0"]'), `${route}: initially hidden content`);
  for (const img of d.querySelectorAll('img')) {
    assert(Number(img.getAttribute('width')) > 0 && Number(img.getAttribute('height')) > 0, `${route}: missing image dimensions`);
    assert(fs.existsSync(path.join(build, img.getAttribute('src').slice(1))), `${route}: missing image`);
  }
  for (const a of d.querySelectorAll('a[href]')) {
    const url = new URL(a.href);
    if (url.origin === origin) {
      assert(routes.has(url.pathname), `${route}: invalid/noncanonical link ${a.href}`);
      if (url.hash && url.pathname === route) assert(d.getElementById(url.hash.slice(1)), `${route}: missing fragment ${url.hash}`);
      links++;
    }
  }
  if (route === '/expertise/') assert.equal(d.querySelectorAll('nav[aria-label="Complete practice areas index"] a').length, 82);
  if (route === '/expertise/property-title-verification-due-diligence/') {
    assert(d.getElementById('title-review-guide'), 'Title review guide missing');
    assert.equal(d.querySelectorAll('nav[aria-label="Related property guidance"] a').length, 4);
    assert.equal(d.title, 'Property Title Verification in Panvel | Paul Legal Associates');
  }
  if (route === '/expertise/naina-town-planning-scheme-services/') {
    assert(d.getElementById('naina-preparation-guide'), 'NAINA preparation guide missing');
    assert.equal(d.querySelectorAll('nav[aria-label="Related NAINA guidance"] a').length, 3);
    assert(d.querySelector('a[href="https://cidco.maharashtra.gov.in/Page?Token=D4AAA8D3366"]'), 'CIDCO source missing');
  }
  if (route === '/expertise/land-acquisition-compensation-matters/') {
    assert(d.getElementById('acquisition-preparation-guide'), 'Land acquisition preparation guide missing');
    assert.equal(d.querySelectorAll('nav[aria-label="Related land acquisition guidance"] a').length, 3);
    assert(d.querySelector('a[href="https://raigad.gov.in/en/land-acquisition-department/"]'), 'Raigad source missing');
    assert.equal(d.title, 'Land Acquisition and Compensation in Raigad | Paul Legal Associates');
  }
  if (route === '/insights/') {
    assert.equal(d.querySelectorAll('nav[aria-label="Property and land guides"] a').length, 8);
    assert.equal(d.querySelectorAll('nav[aria-label="Workplace and business guides"] a').length, 4);
  }
  if (route.startsWith('/insights/') && route !== '/insights/') {
    assert(d.querySelector('main a[href="tel:+917977063567"]'), `${route}: article call path`);
  }
  if (route === '/contact/') assert(!d.querySelector('main').textContent.includes('[...]'), 'Truncated FAQ still visible');
  dom.window.close();
}
for (const url of sitemap) assert(routes.has(new URL(url).pathname) && url.startsWith(origin + '/'), `Missing sitemap page ${url}`);

async function verifyHydration(route) {
  const html = readPage(route);
  const bundle = html.match(/<script[^>]+src="([^\"]+\.js)"/)[1];
  const errors = [];
  const vc = new VirtualConsole();
  vc.on('error', (...e) => errors.push(e.map(String).join(' ')));
  vc.on('jsdomError', e => errors.push(e.message));
  const dom = new JSDOM(html, { url: origin + route, runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window;
  const initialHeading = w.document.querySelector('h1');
  const initialTitle = w.document.title;
  const opened = [];
  w.scrollTo = () => {};
  w.HTMLElement.prototype.scrollIntoView = () => {};
  w.matchMedia = () => ({ matches: false });
  w.IntersectionObserver = class { constructor(callback) { this.callback = callback; } observe() { this.callback([{ isIntersecting: true }]); } disconnect() {} };
  w.open = (...args) => { opened.push(args); return null; };
  w.eval(fs.readFileSync(path.join(build, bundle.slice(1)), 'utf8'));
  await new Promise(resolve => setTimeout(resolve, 120));
  assert.equal(w.document.querySelector('h1'), initialHeading, `${route}: React replaced the pre-rendered page`);
  assert.equal(w.document.title, initialTitle, `${route}: title drift after hydration`);
  assert.equal(errors.length, 0, `${route}: ${errors.join('; ')}`);
  if (route === '/') {
    const menu = w.document.querySelector('button[aria-label="Open menu"]');
    assert(!w.document.querySelector('[role="dialog"]'), 'Closed mobile menu exposed as a dialog');
    menu.click();
    await new Promise(resolve => setTimeout(resolve, 40));
    assert(w.document.querySelector('[role="dialog"]'), 'Mobile menu did not open');
    w.document.querySelector('button[aria-label="Close menu"]').click();
    await new Promise(resolve => setTimeout(resolve, 40));
    assert(!w.document.querySelector('[role="dialog"]'), 'Mobile menu did not close');
  }
  if (route === '/expertise/') {
    const btn = [...w.document.querySelectorAll('button')].find(b => b.textContent.includes('Show More Practice Areas'));
    btn.click();
    await new Promise(resolve => setTimeout(resolve, 40));
    assert(w.document.body.textContent.includes('64 Remaining'), 'Practice expansion did not hydrate');
    assert.equal(w.document.querySelectorAll('nav[aria-label="Complete practice areas index"] a').length, 82);
  }
  if (route === '/contact/') {
    const btn = [...w.document.querySelectorAll('button')].find(b => b.textContent.includes('Continue on WhatsApp'));
    btn.click();
    await new Promise(resolve => setTimeout(resolve, 40));
    assert.equal(w.document.querySelectorAll('[role="alert"]').length, 4, 'Contact validation did not hydrate');
    assert.equal(opened.length, 0, 'Empty form opened an external destination');
  }
  // Exercise client-side navigation using an existing, canonical internal link.
  const target = route === '/contact/' ? '/expertise/' : '/contact/';
  w.document.querySelector(`a[href="${target}"]`).dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
  await new Promise(resolve => setTimeout(resolve, 60));
  assert.equal(w.location.pathname, target, `${route}: client navigation`);
  assert.equal(w.document.querySelector('link[rel="canonical"]').href, origin + target, `${route}: navigation canonical`);
  assert.equal(w.document.querySelectorAll('h1').length, 1);
  assert.equal(errors.length, 0, `${route}: ${errors.join('; ')}`);
  dom.window.close();
}

(async () => {
  for (const route of ['/', '/about/', '/expertise/', '/contact/', '/insights/', '/partners/', '/finance-tax-regulatory-advisory/', '/expertise/property-title-verification-due-diligence/', '/insights/naina-town-planning-scheme-rights/', '/partners/sojan-paul/']) {
    await verifyHydration(route);
  }
  console.log(`PASS: ${pagePaths.length} initial HTML pages, ${links} internal link occurrences, ${sitemap.length} sitemap URLs; 10 hydration/navigation checks and contact validation.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
