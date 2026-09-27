# Paul Legal Associates — Website

**React TypeScript** + **Tailwind CSS** website of Paul Legal Associates (Advocates), Navi Mumbai.

## Build and deployment

`npm ci && npm run build` creates the production files in `build/`. The postbuild
script writes an `index.html` for each core, practice, partner and article route.
It gives each route its own title, description and single apex canonical, then
generates `sitemap.xml` from those routes. GitHub Actions deploys the build to
GitHub Pages when a change is merged into `main`; `public/CNAME` sets the
custom domain to `paullegalassociates.com`.

Core route metadata is in `src/seo-core.json`. Detail route metadata comes from
`src/data/index.ts`. Eight newer maritime articles are listed in
`scripts/generate-routes.js` as pending legal-content review and intentionally
omitted from the sitemap. Before adding an article to sitemap discovery, review
its factual accuracy and professional compliance, then remove it from that list.
