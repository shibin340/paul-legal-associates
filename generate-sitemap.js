const SitemapGenerator = require('sitemap-generator');
const path = require('path');

// Configure the crawler to target your live domain
const generator = SitemapGenerator('https://www.paullegalassociates.com', {
  stripQuerystring: true,
  filepath: path.resolve(__dirname, 'build', 'sitemap.xml'),
});

// Register logging events to track compilation progress in the terminal console
generator.on('add', (url) => {
  console.log(`Sitemap indexer successfully added: ${url}`);
});

generator.on('done', () => {
  console.log('Sitemap.xml generated and saved completely inside the build folder!');
});

// Execute the crawler script execution line
generator.start();