# Paul Legal Associates — Website

**React TypeScript** + **Tailwind CSS** website of Paul Legal Associates (Advocates), Navi Mumbai.

## Build and deployment

`npm ci && npm run build` creates the production files in `build/`. The postbuild
script renders the shared React components into a complete `index.html` for
each core, practice, partner and article route. Main content, headings and
contact links are available before JavaScript loads. The browser hydrates that
same markup to enable interactive controls. Each route has its own title,
description and single apex canonical, and the build generates `sitemap.xml`.
GitHub Actions deploys the build to
GitHub Pages when a change is merged into `main`; `public/CNAME` sets the
custom domain to `paullegalassociates.com`.

Core route metadata is in `src/seo-core.json`. Detail route metadata comes from
`src/data/index.ts`. Eight newer maritime articles are listed in
`scripts/generate-routes.js` as pending legal-content review and intentionally
omitted from the sitemap. Before adding an article to sitemap discovery, review
its factual accuracy and professional compliance, then remove it from that list.

The build also runs `scripts/verify-pages.js`: every initial HTML page is checked
for main content, a unique H1, canonical metadata, valid internal destinations,
contact links and explicit image dimensions. Ten representative pages are
hydrated in jsdom, including checks of client navigation, practice expansion
and empty-form validation. `npm run verify:seo` repeats these checks against an
existing build. These are technical checks; they do not verify legal claims,
Google indexing, real-device layout, WhatsApp delivery or enquiry conversions.

The complete practice index uses native `details`/`summary` and works without
JavaScript. Intro animations leave initial content visible; only off-screen
sections gain scroll-triggered animation after hydration. Phone and email links
remain available if JavaScript cannot run.
