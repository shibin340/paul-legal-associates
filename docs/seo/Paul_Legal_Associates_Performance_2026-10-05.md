# Article delivery optimisation — 5 October 2026

The shared JavaScript previously contained every article body. The editorial source remains unchanged. The build now generates metadata plus one hashed content file per article; direct article HTML embeds only that article for hydration. Other pages embed no article body. SPA navigation requests just the chosen article, with a reload/contact fallback on failure.

| Metric | Before | After | Interpretation |
|---|---:|---:|---|
| Shared JS raw bytes | 1540360 | 572247 | All browser routes |
| Shared JS gzip bytes | 386981 | 151427 | 60.9% reduction |
| mobile LCP ms | 2304.000 | 2076.000 | Median of three laboratory runs |
| mobile FCP ms | 1468.000 | 1312.000 | Median of three laboratory runs |
| mobile DOM ready ms | 2887.000 | 1305.600 | Median of three laboratory runs |
| mobile observed long-task blocking ms | 820.000 | 711.000 | Median of three laboratory runs |
| mobile CLS | 0.022 | 0.000 | Median of three laboratory runs |
| desktop LCP ms | 2288.000 | 2256.000 | Median of three laboratory runs |
| desktop FCP ms | 764.000 | 824.000 | Median of three laboratory runs |
| desktop DOM ready ms | 3489.700 | 2288.200 | Median of three laboratory runs |
| desktop observed long-task blocking ms | 109.000 | 118.000 | Median of three laboratory runs |
| desktop CLS | 0.005 | 0.005 | Median of three laboratory runs |

These are controlled local Chrome 153 measurements with gzip, cold cache, 150ms latency, 1.6 Mbps, mobile CPU 4× and desktop CPU 1×. External fonts were blocked identically. They are not production CrUX, INP or field Core Web Vitals. Local TTFB is excluded from conclusions; resource encoded-size readings were unavailable. The firm’s real-user CWV remains unknown.

Validation: npm run build passed 247 HTML pages, 239 sitemap URLs, 8,239 internal link occurrences and twelve hydration/navigation checks. SHA-256 comparison of all 247 generated `<main>` bodies found no difference. Direct article hydration makes no extra content request. SPA article navigation loads one body. Eight held articles stay noindexed and out of the sitemap.

Measurement: verify production bundle filename/bytes and representative direct/mobile/SPA articles after deployment. Monitor field CWV when CrUX/GA4 access is available; maintain conversion and indexation KPIs rather than treating lab scores as rankings.
