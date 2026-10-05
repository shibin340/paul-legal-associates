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
assert.equal(sitemap.length, 239, 'Unexpected change to the reviewed sitemap inventory');
const serviceTopics = require('../src/serviceTopics.json');
const heldArticleRoutes = new Set(require('../src/seo-awaiting-review.json').map(slug => `/insights/${slug}/`));
const serviceSlugs = serviceTopics.flatMap(topic => topic.members);
assert.equal(serviceSlugs.length, 83, 'Topic map must cover all 83 practices');
assert.equal(new Set(serviceSlugs).size, 83, 'Practice assigned to multiple topics');
for (const topic of serviceTopics) {
  assert(topic.members.includes(topic.hub), `${topic.id}: missing topic hub`);
  assert(topic.featured.every(slug => topic.members.includes(slug)), `${topic.id}: featured service outside topic`);
}
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
  assert(d.querySelector('header a[href="/contact/"]'), `${route}: missing header contact path`);
  assert.equal(d.querySelectorAll('link[rel="canonical"]').length, 1, `${route}: canonical count`);
  assert.equal(d.querySelector('link[rel="canonical"]').href, origin + route, `${route}: canonical URL`);
  assert.equal(d.querySelector('meta[property="og:url"]').content, origin + route, `${route}: og:url`);
  assert.equal(d.querySelectorAll('meta[name="description"]').length, 1, `${route}: description count`);
  const graphScript = d.querySelector('#seo-graph[type="application/ld+json"]');
  assert.equal(d.querySelectorAll('script[type="application/ld+json"]').length, 1, `${route}: structured-data script count`);
  assert(graphScript, `${route}: structured-data graph missing`);
  const graphDocument = JSON.parse(graphScript.textContent);
  assert.equal(graphDocument['@context'], 'https://schema.org', `${route}: schema context`);
  const graph = graphDocument['@graph'];
  assert(Array.isArray(graph), `${route}: @graph missing`);
  const findType = type => graph.filter(node => node['@type'] === type);
  const firm = findType('LegalService');
  const website = findType('WebSite');
  const webPage = findType('WebPage');
  assert.equal(firm.length, 1, `${route}: LegalService count`);
  assert.equal(website.length, 1, `${route}: WebSite count`);
  assert.equal(webPage.length, 1, `${route}: WebPage count`);
  assert.equal(firm[0]['@id'], origin + '/#firm', `${route}: firm entity ID`);
  assert.equal(website[0].publisher['@id'], firm[0]['@id'], `${route}: website publisher`);
  assert.equal(webPage[0].url, origin + route, `${route}: WebPage canonical mismatch`);
  assert.equal(webPage[0].isPartOf['@id'], website[0]['@id'], `${route}: website relationship`);
  assert.equal(new Set(graph.map(node => node['@id'])).size, graph.length, `${route}: duplicate entity IDs`);
  assert(!graphScript.textContent.includes('AggregateRating') && !graphScript.textContent.includes('sameAs'), `${route}: unverified ratings or profiles`);
  if (route.startsWith('/expertise/') && route !== '/expertise/' || route === '/finance-tax-regulatory-advisory/') {
    const service = findType('Service');
    assert.equal(service.length, 1, `${route}: Service count`);
    assert.equal(service[0].name, d.querySelector('h1').textContent.trim(), `${route}: service differs from visible H1`);
    assert.equal(service[0].provider['@id'], firm[0]['@id'], `${route}: service provider`);
    assert.equal(webPage[0].mainEntity['@id'], service[0]['@id'], `${route}: Service mainEntity`);
  }
  if (route.startsWith('/expertise/') && route !== '/expertise/') {
    const breadcrumb = findType('BreadcrumbList');
    assert.equal(breadcrumb.length, 1, `${route}: service breadcrumb count`);
    assert.deepEqual(breadcrumb[0].itemListElement.map(item => item.item), [origin + '/', origin + '/expertise/', origin + route], `${route}: breadcrumb URLs`);
    assert.equal(webPage[0].breadcrumb['@id'], breadcrumb[0]['@id']);
  }
  if (route.startsWith('/partners/') && route !== '/partners/') {
    const person = findType('Person');
    assert.equal(person.length, 1, `${route}: profile Person count`);
    assert.equal(person[0].name, d.querySelector('h1').textContent.trim(), `${route}: Person name`);
    assert.equal(person[0].url, origin + route, `${route}: Person profile URL`);
    assert.equal(webPage[0].mainEntity['@id'], person[0]['@id']);
    for (const a of d.querySelectorAll('nav[aria-label^="Selected insights by"] a')) {
      assert(sitemap.includes(origin + a.getAttribute('href')), `${route}: linked held article`);
    }
  }
  if (route.startsWith('/insights/') && route !== '/insights/') {
    const article = findType('BlogPosting');
    if (heldArticleRoutes.has(route)) {
      assert.equal(article.length, 0, `${route}: held article should not have BlogPosting schema`);
      assert(d.querySelector('meta[name="robots"]').content.includes('noindex'), `${route}: held article missing noindex`);
      assert(!sitemap.includes(origin + route), `${route}: held article in sitemap`);
    } else {
      assert.equal(article.length, 1, `${route}: BlogPosting count`);
      assert.equal(article[0].headline, d.querySelector('h1').textContent.trim(), `${route}: article headline`);
      assert.equal(article[0].publisher['@id'], firm[0]['@id'], `${route}: article publisher`);
      assert.equal(webPage[0].mainEntity['@id'], article[0]['@id'], `${route}: Article mainEntity`);
      const author = findType('Person');
      assert.equal(author.length, 1, `${route}: article author Person count`);
      assert.equal(article[0].author['@id'], author[0]['@id'], `${route}: article author relationship`);
      assert(d.querySelector(`main a[href="${new URL(author[0].url).pathname}"]`), `${route}: visible author profile link`);
      assert.equal(findType('BreadcrumbList').length, 1, `${route}: Insights breadcrumb count`);
    }
  }
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
  if (route === '/expertise/') assert.equal(d.querySelectorAll('nav[aria-label="Complete practice areas index"] a').length, 83);
  if (route === '/expertise/') assert(d.querySelector('main a[href="/finance-tax-regulatory-advisory/"]'), 'Finance advisory contextual link missing');
  if (route === '/insights/property-title-search-legal-due-diligence/') {
    assert(d.querySelector('nav[aria-label="Related legal service"] a[href="/expertise/property-title-verification-due-diligence/"]'), 'Title guide should point to its service');
  }
  if (route === '/insights/labour-code-readiness-2026/') {
    assert(d.querySelector('nav[aria-label="Related legal service"] a[href="/expertise/labour-employment-hr-workplace-compliance/"]'), 'Labour guide should point to its service');
  }
  if (route.startsWith('/expertise/') && route !== '/expertise/') {
    const slug = route.split('/')[2];
    assert(serviceSlugs.includes(slug), `${route}: practice omitted from topic map`);
    const breadcrumb = d.querySelector('nav[aria-label="Breadcrumb"]');
    assert(breadcrumb?.querySelector('a[href="/"]') && breadcrumb?.querySelector('a[href="/expertise/"]'), `${route}: breadcrumb path`);
    const related = d.querySelector('nav[aria-label="Related practice areas"]');
    assert(related, `${route}: related service navigation missing`);
    const siblingLinks = related.querySelectorAll('li a[href^="/expertise/"]');
    assert(siblingLinks.length >= 4 && siblingLinks.length <= 7, `${route}: unfocused related links (${siblingLinks.length})`);
    assert(related.querySelector('a[href="/expertise/"]'), `${route}: catalogue route missing`);
    const topic = serviceTopics.find(group => group.members.includes(slug));
    if (slug !== topic.hub) assert(related.querySelector(`a[href="/expertise/${topic.hub}/"]`), `${route}: parent hub missing`);
    const reading = d.querySelector('nav[aria-label="Related insights"]');
    if (reading) for (const link of reading.querySelectorAll('a')) {
      assert(sitemap.includes(origin + link.getAttribute('href')), `${route}: related reading held from indexing`);
    }
  }
  if (route === '/finance-tax-regulatory-advisory/') {
    assert(d.querySelector('main .finance-hero a[href="tel:+917977063567"]'), 'Finance hero call path missing');
    assert(d.querySelector('main .finance-hero a[href="/contact/"]'), 'Finance hero enquiry path missing');
    assert.equal(d.querySelectorAll('#finance-faq details').length, 10, 'Finance FAQ answers missing from initial HTML');
    assert(d.querySelector('#finance-faq').textContent.includes('Panvel office'), 'Local finance FAQ answer missing');
    assert(d.querySelector('meta[name="description"]').content.includes('Virtual CFO'), 'Finance description missing service intent');
  }
  if (route === '/expertise/property-title-verification-due-diligence/') {
    assert(d.getElementById('title-review-guide'), 'Title review guide missing');
    assert.equal(d.querySelectorAll('nav[aria-label="Related property guidance"] a').length, 4);
    assert.equal(d.title, 'Property Title Verification in Panvel | Paul Legal Associates');
  }
  if (route === '/expertise/property-real-estate/') {
    const guide = d.getElementById('property-service-guide');
    assert(guide, 'Property decision guide missing from initial HTML');
    assert(guide.parentElement.querySelector('a[href="/expertise/rera-maharera-legal-services/"]'), 'Property route to RERA missing');
  }
  if (route === '/expertise/rera-maharera-legal-services/') {
    const guide = d.getElementById('rera-service-guide');
    assert(guide, 'RERA decision guide missing from initial HTML');
    assert(guide.parentElement.querySelector('a[href="https://maharera.maharashtra.gov.in/"]'), 'Official MahaRERA source missing');
    assert(guide.parentElement.querySelector('a[href="/expertise/property-title-verification-due-diligence/"]'), 'Related title-review path missing');
  }
  if (route === '/expertise/corporate-commercial-advisory/') {
    const guide = d.getElementById('corporate-service-guide');
    assert(guide, 'Corporate decision guide missing from initial HTML');
    assert(guide.parentElement.querySelector('a[href="/expertise/contract-drafting-vetting-transaction-documentation/"]'), 'Corporate contract route missing');
  }
  if (route === '/expertise/commercial-litigation-arbitration/') {
    const guide = d.getElementById('commercial-dispute-guide');
    assert(guide, 'Dispute preparation guide missing from initial HTML');
    assert(guide.parentElement.querySelector('a[href="/expertise/arbitration-mediation-adr/"]'), 'Arbitration route missing');
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
  if (route === '/expertise/posh-compliance-internal-committee/') {
    assert(d.getElementById('posh-preparation-guide'), 'POSH preparation guide missing');
    assert.equal(d.querySelectorAll('nav[aria-label="Related POSH guidance"] a').length, 3);
    assert(d.querySelector('a[href="https://www.indiacode.nic.in/handle/123456789/2104"]'), 'India Code source missing');
    assert.equal(d.title, 'POSH Compliance for Employers in Navi Mumbai | Paul Legal Associates');
  }
  if (route === '/expertise/labour-employment-hr-workplace-compliance/') {
    assert(d.querySelector('nav[aria-label="Related workplace service"] a[href="/expertise/posh-compliance-internal-committee/"]'), 'Workplace service cross-link missing');
  }
  if (route === '/insights/') {
    assert.equal(d.querySelectorAll('nav[aria-label="Property and land guides"] a').length, 8);
    assert.equal(d.querySelectorAll('nav[aria-label="Workplace and business guides"] a').length, 4);
    assert(d.querySelector('nav[aria-label="Workplace and business guides"] a[href="/insights/posh-compliance-employers-mumbai-navi-mumbai/"]'), 'Employer POSH guide missing');
  }
  if (route === '/insights/posh-compliance-employers-mumbai-navi-mumbai/') {
    assert(d.querySelector('nav[aria-label="Related POSH service"] a[href="/expertise/posh-compliance-internal-committee/"]'), 'POSH article service link missing');
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
  const initialGraph = JSON.parse(w.document.querySelector('#seo-graph').textContent);
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
  assert.deepEqual(JSON.parse(w.document.querySelector('#seo-graph').textContent), initialGraph, `${route}: schema drift after hydration`);
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
    assert(w.document.body.textContent.includes('65 Remaining'), 'Practice expansion did not hydrate');
    assert.equal(w.document.querySelectorAll('nav[aria-label="Complete practice areas index"] a').length, 83);
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
  assert.equal(JSON.parse(w.document.querySelector('#seo-graph').textContent)['@graph'].find(node => node['@type'] === 'WebPage').url, origin + target, `${route}: navigation schema URL`);
  assert.equal(w.document.querySelectorAll('h1').length, 1);
  assert.equal(errors.length, 0, `${route}: ${errors.join('; ')}`);
  dom.window.close();
}

(async () => {
  for (const route of ['/', '/about/', '/expertise/', '/contact/', '/insights/', '/partners/', '/finance-tax-regulatory-advisory/', '/expertise/property-title-verification-due-diligence/', '/expertise/posh-compliance-internal-committee/', '/insights/naina-town-planning-scheme-rights/', '/insights/posh-compliance-employers-mumbai-navi-mumbai/', '/partners/sojan-paul/']) {
    await verifyHydration(route);
  }
  console.log(`PASS: ${pagePaths.length} initial HTML pages, ${links} internal link occurrences, ${sitemap.length} sitemap URLs; 12 hydration/navigation checks and contact validation.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
