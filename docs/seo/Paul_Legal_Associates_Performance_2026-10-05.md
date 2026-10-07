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

## Production checkpoint — 7 October 2026 IST

PR #31 live shared bundle `/static/js/main.6fa74a4f.js` matches the tested SHA256 `7f9465ea718ae84a1a2f751a0b1991148a864febd6c616a6f8f5ae399bc0e618`:579,919 raw bytes and153,343 gzip bytes computed with Node24. The same-method pre-cycle bundle was579,794 raw /153,325 gzip; the18-byte gzip change is consistent with article metadata/content hashes, and the earlier approximately60% reduction is preserved. One public asset response showed gzip,155,625 encoded wire bytes, Cloudflare HIT and max-age=14400; computed gzip and wire size are separate observations. All18 unchanged commercial main bodies match before/after. Contact matches the source after decoding the specific Cloudflare email rewrite; the browser confirms the correct mailto. No new mobile/field-LCP/INP/CLS/TTFB measurement is claimed; local Chromium was unavailable, and prior controlled laboratory results remain labelled above. No further performance change is justified by this cycle evidence.

## POSH continuation delivery check — 7 October 2026 IST

The final live `/static/js/main.31cd47e3.js` is579634raw/153273computedgzip bytes (Node24), SHA256`0f4c1eb4e64baa3e4d8c99509876b8dd63bf412abfc9328e3b26e666c29b9b7a`, matching the tested build. This preserves the earlier approximately60% shared-bundle reduction. No unrelated article bodies returned to the shared browser entry. All152 unrelated source article objects remain identical;243 complete main hashes are unchanged, with only the two revised guides and two incidental recommendation sidebars different. Final CI/Pages and34 public page checks pass. No new controlled lab, mobile-browser or field-CWV improvement is claimed; current LCP/INP/CLS/TTFB field evidence still requires authorised GSC/CrUX reporting.

One public asset-header observation at20:27:17UTC returned200, gzip155551wire bytes, CFcacheHIT and max-age14400; Ray `a46767ec0d5e35c0-ORD`. This requested-gzip wire response is distinct from the computed Node24 gzip comparison. It does not establish Cloudflare zone policy, Brotli availability or field user metrics.

## Contact trust release — 7 October 2026 IST

PR36 changes Contact text and its real modification date. Current live shared bundle `/static/js/main.0fda0971.js` matches the tested build:579749raw/153318computedgzip bytes (Node24), SHA256`3a5d065b40a5551ed7b295f6771ede30ca10adf7dd92e89d86cd790b114b5b29`.246other main bodies are unchanged. The earlier delivery optimisation remains intact; no new lab/mobile/field-CWV improvement is inferred. Exact public Contact/bundle/sitemap and prior POSH guide comparisons are in the existing cycle evidence.

## Recovery / registration release checkpoint — 7 October 2026 IST

PR39 public referenced main.9dbf9e48.js matches579970 raw/153340 computed gzip bytes(Node24), SHA2569dc018e695f4816b44069c3737f83851bee24f3338c8979c350b8ba9c18e1e4f. Earlier CycleA unchanged-bundle assertion was a scratch verifier selection error: it selected a leftover asset. Referenced-HTML selection is corrected and actual matched measurements supersede it. Article-body splitting remains intact. No fieldLCP/INP/CLS/TTFB dataset or new lab result was obtained; no further performance source change justified.
