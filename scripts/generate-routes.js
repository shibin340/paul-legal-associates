const fs = require('fs');
const path = require('path');
process.env.NODE_ENV = 'production';
const React = require('react');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/server');
const { loadSource } = require('./load-source');

const ORIGIN = 'https://paullegalassociates.com';
const BRAND = 'Paul Legal Associates';
const buildDir = path.resolve(__dirname, '../build');
const indexPath = path.join(buildDir, 'index.html');

const { TEAM_MEMBERS, ARTICLES } = loadSource(path.resolve(__dirname, '../src/data/index.ts'));
const { PRACTICE_AREAS } = loadSource(path.resolve(__dirname, '../src/practiceAreas.ts'));
const { AppRoutes } = loadSource(path.resolve(__dirname, '../src/App.tsx'));
const { getServiceMetadata } = loadSource(path.resolve(__dirname, '../src/serviceMetadata.ts'));
const { createSeoGraph } = loadSource(path.resolve(__dirname, '../src/seoGraph.ts'));

const core = require('../src/seo-core.json');

const servicePages = PRACTICE_AREAS.map(area => ({
  route: `/expertise/${area.slug}`,
  ...getServiceMetadata(area)
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
const areasByRoute = new Map(PRACTICE_AREAS.map(area => [`/expertise/${area.slug}`, area]));
const membersByRoute = new Map(TEAM_MEMBERS.map(member => [`/partners/${member.slug}`, member]));
const articlesByRoute = new Map(ARTICLES.map(article => [`/insights/${article.slug}`, article]));

// Pending legal review: omit from the sitemap and prevent indexing until approved.
const awaitingArticleReview = new Set(
  require('../src/seo-awaiting-review.json').map(slug => `/insights/${slug}`)
);

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
  return html.replace(pattern, () => replacement);
}

function renderHead(template, page) {
  const url = canonical(page.route);
  const title = escapeHtml(page.title);
  const description = escapeHtml(concise(page.description));
  const replacements = [
    [/<link rel="canonical"[^>]*>/g, `<link rel="canonical" href="${url}" />`, 'canonical'],
    [/<title>[^<]*<\/title>/g, `<title>${title}</title>`, 'title'],
    [/<meta name="description"[^>]*>/g, `<meta name="description" content="${description}" />`, 'description'],
    [/<meta name="robots"[^>]*>/g, `<meta name="robots" content="${awaitingArticleReview.has(page.route) ? 'noindex, follow' : 'index, follow'}" />`, 'robots'],
    [/<meta property="og:type"[^>]*>/g, `<meta property="og:type" content="${page.type || 'website'}" />`, 'og:type'],
    [/<meta property="og:url"[^>]*>/g, `<meta property="og:url" content="${url}" />`, 'og:url'],
    [/<meta property="og:title"[^>]*>/g, `<meta property="og:title" content="${title}" />`, 'og:title'],
    [/<meta property="og:description"[^>]*>/g, `<meta property="og:description" content="${description}" />`, 'og:description'],
    [/<meta name="twitter:title"[^>]*>/g, `<meta name="twitter:title" content="${title}" />`, 'twitter:title'],
    [/<meta name="twitter:description"[^>]*>/g, `<meta name="twitter:description" content="${description}" />`, 'twitter:description']
  ];
  const head = replacements.reduce(
    (html, [pattern, replacement, label]) => replaceOne(html, pattern, replacement, label),
    template
  );
  const graph = createSeoGraph(page.route, {
    title: page.title,
    description: page.description,
    area: areasByRoute.get(page.route),
    member: membersByRoute.get(page.route),
    article: articlesByRoute.get(page.route),
    heldForReview: awaitingArticleReview.has(page.route)
  });
  const json = JSON.stringify(graph).replace(/</g, '\\u003c');
  return replaceOne(head, /<script id="seo-graph" type="application\/ld\+json">[\s\S]*?<\/script>/g,
    `<script id="seo-graph" type="application/ld+json">${json}</script>`, 'structured data');
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
  const location = page.route === '/' ? '/' : page.route + '/';
  const body = renderToString(React.createElement(
    StaticRouter, { location }, React.createElement(AppRoutes)
  ));
  if ((body.match(/<h1(?:\s|>)/g) || []).length !== 1 ||
      !body.includes('<main') || !body.includes('tel:+917977063567')) {
    throw new Error(`Missing main content, unique H1 or contact link on ${page.route}`);
  }
  fs.writeFileSync(destination, replaceOne(
    renderHead(template, page), /<div id="root"><\/div>/g,
    `<div id="root">${body}</div>`, 'React root'
  ));
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
console.log(`Pre-rendered ${pages.length} complete pages and ${sitemapPages.length} apex sitemap URLs.`);
