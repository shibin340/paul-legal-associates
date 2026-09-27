const fs = require('fs');
const path = require('path');
const Module = require('module');
const ts = require('typescript');

const ORIGIN = 'https://paullegalassociates.com';
const BRAND = 'Paul Legal Associates';
const buildDir = path.resolve(__dirname, '../build');
const indexPath = path.join(buildDir, 'index.html');

// The application data is TypeScript, but it contains only data and type imports.
// Compile it in memory so the route inventory cannot drift from the live UI.
const dataPath = path.resolve(__dirname, '../src/data/index.ts');
const compiled = ts.transpileModule(fs.readFileSync(dataPath, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
}).outputText;
const dataModule = new Module(dataPath, module);
dataModule.filename = dataPath;
dataModule.paths = Module._nodeModulePaths(path.dirname(dataPath));
dataModule._compile(compiled, dataPath);
const { PRACTICE_AREAS, TEAM_MEMBERS, ARTICLES } = dataModule.exports;

const core = require('../src/seo-core.json');

const servicePages = PRACTICE_AREAS.map(area => ({
  route: `/expertise/${area.slug}`,
  title: `${area.title} Lawyers in Navi Mumbai | ${BRAND}`,
  description: `${area.title}: ${area.shortDesc} Paul Legal Associates, Navi Mumbai.`
}));
const partnerPages = TEAM_MEMBERS.map(member => ({
  route: `/partners/${member.slug}`,
  title: `${member.name} - ${member.specialisation} | ${BRAND}`,
  description: `${member.name}, ${member.title} at ${BRAND}. ${member.specialisation}.`
}));
const articlePages = ARTICLES.map(article => ({
  route: `/insights/${article.slug}`,
  title: `${article.title} | ${BRAND}`,
  description: article.excerpt,
  type: 'article'
}));
const pages = [...core, ...servicePages, ...partnerPages, ...articlePages];

// These eight newer maritime articles were not in the submitted sitemap.
// Keep them out of sitemap discovery until their legal text is reviewed.
const awaitingArticleReview = new Set([
  'commercial-vessel-acquisition-legal-due-diligence',
  'vessel-sale-moa-legal-review',
  'third-party-payment-vessel-acquisition',
  'vessel-title-mortgages-maritime-liens',
  'panama-flag-vessel-ownership-transfer',
  'vessel-purchase-payment-escrow-direct-payment',
  'vessel-sale-closing-checklist-conditions-precedent',
  'vessel-acquisition-post-closing-registration'
].map(slug => `/insights/${slug}`));

const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[c]);
const concise = text => text.replace(/\s+/g, ' ').trim();
const canonical = route => ORIGIN + (route === '/' ? '/' : route + '/');

function replaceOne(html, pattern, replacement, label) {
  const matches = [...html.matchAll(pattern)];
  if (matches.length !== 1) {
    throw new Error(`Expected one ${label} in the HTML template, found ${matches.length}`);
  }
  return html.replace(pattern, replacement);
}

function renderHead(template, page) {
  const url = canonical(page.route);
  const title = escapeHtml(page.title);
  const description = escapeHtml(concise(page.description));
  const replacements = [
    [/<link rel="canonical"[^>]*>/g, `<link rel="canonical" href="${url}" />`, 'canonical'],
    [/<title>[^<]*<\/title>/g, `<title>${title}</title>`, 'title'],
    [/<meta name="description"[^>]*>/g, `<meta name="description" content="${description}" />`, 'description'],
    [/<meta property="og:type"[^>]*>/g, `<meta property="og:type" content="${page.type || 'website'}" />`, 'og:type'],
    [/<meta property="og:url"[^>]*>/g, `<meta property="og:url" content="${url}" />`, 'og:url'],
    [/<meta property="og:title"[^>]*>/g, `<meta property="og:title" content="${title}" />`, 'og:title'],
    [/<meta property="og:description"[^>]*>/g, `<meta property="og:description" content="${description}" />`, 'og:description'],
    [/<meta name="twitter:title"[^>]*>/g, `<meta name="twitter:title" content="${title}" />`, 'twitter:title'],
    [/<meta name="twitter:description"[^>]*>/g, `<meta name="twitter:description" content="${description}" />`, 'twitter:description']
  ];
  return replacements.reduce(
    (html, [pattern, replacement, label]) => replaceOne(html, pattern, replacement, label),
    template
  );
}

if (!fs.existsSync(indexPath)) throw new Error('Run the React build before generating routes.');
const template = fs.readFileSync(indexPath, 'utf8');
const seen = new Set();
for (const page of pages) {
  if (!/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)?)?$/.test(page.route)) {
    throw new Error(`Invalid route: ${page.route}`);
  }
  if (seen.has(page.route)) throw new Error(`Duplicate route: ${page.route}`);
  seen.add(page.route);
  const destination = page.route === '/'
    ? indexPath
    : path.join(buildDir, page.route.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, renderHead(template, page));
}

const sitemapPages = pages.filter(page => !awaitingArticleReview.has(page.route));
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapPages.map(page => `  <url><loc>${canonical(page.route)}</loc></url>`),
  '</urlset>',
  ''
].join('\n');
fs.writeFileSync(path.join(buildDir, 'sitemap.xml'), sitemap);
console.log(`Generated ${pages.length} route files and ${sitemapPages.length} apex sitemap URLs.`);
