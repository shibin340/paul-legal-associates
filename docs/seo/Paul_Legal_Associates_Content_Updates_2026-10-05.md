# Meaningful content, authority paths and sitemap dates — 5 October 2026

The remaining Tier-A tax service lacked an article preparation path. Two supporting articles also needed current-law corrections. This release changes those existing articles and adds factual partner-to-service paths; it creates no new URL, experience claim or lawyer-review assertion.

## Evidence and amendments

| Existing URL | Problem | Implemented amendment |
|---|---|---|
| `/insights/labour-code-readiness-2026/` | Described implementation as pending; conflated the wage definition with a 50% basic-salary/CTC rule and implied automatic gig-worker PF/ESI coverage | States the verified 21 November 2025 commencement; distinguishes the statutory wage add-back calculation, appropriate government/rules, direct fixed-term staff and separate social-security schemes; adds a practical document list and four official sources |
| `/insights/gst-tax-litigation-advisory/` | Listed only the Income-tax Act, 1961 in an article published in August 2026; no preferred tax-service path | Explains the 2025 Act's 1 April 2026 commencement and savings for earlier/pending matters; adds notice/document preparation, two useful questions, an official transition source and the tax-service path |
| `/expertise/taxation-gst-fiscal-litigation/` | No selected supporting Insight | Links to the updated GST/tax article |
| `/insights/contract-drafting-agreement-review-mou-nda/` | Preferred-service anchor went to a broad corporate hub | Routes the specific drafting/review intent to the existing contract-drafting service |
| Three `/partners/` profiles | Visible practice descriptions but no focused links to matching services | Adds 3–4 relevant service paths based on existing visible specialisations; authored article selection and biographies stay intact |

Original article publication dates and authors remain intact. The visible label is **Content updated**, not a claim that the named advocate conducted a fresh legal review. Only two of 154 source article objects changed. The article-body split and full static HTML remain in place.

Primary sources checked on 5 October:

- [Ministry of Labour/PIB year-end review](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2209767&lang=1&reg=6).
- [Code on Wages, section 2(y), official Maharashtra-hosted statute](https://labour.maharashtra.gov.in/sites/default/files/2026-04/the-code-on-wages-2019-no-29-of-2019_0.pdf).
- [MoLE additional FAQs, 16 March 2026](https://www.labour.gov.in/static/uploads/2026/03/a4ccf4c6d97c4f1f36a6d83f8c64213d.pdf).
- [Maharashtra Labour Code publication directory](https://labour.maharashtra.gov.in/en/publication/new-labour-code). Its summary contains apparent date inconsistencies; the amendment does not repeat those dates or describe its listed draft state rules as final.
- [Income-tax Department transition FAQs](https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/objective-and-scope-new-act-faq).

## Sitemap modification dates

`src/pageUpdates.json` is an explicit editorial date registry. Seventeen URLs have reliable significant changes on 5 October: ten service guides (PRs #23/#25), Contact (#27), two corrected articles, the contract article's preferred destination, and three profile/service relationships. The other 222 sitemap URLs remain undated. No page is stamped merely because a build occurred.

The generator rejects invalid, future, nonexistent or held route entries. Article update dates are visible and agree with BlogPosting/WebPage `dateModified`; undated routes receive no invented schema modification date. The sitemap remains 239 URLs and the eight held maritime articles remain noindexed and excluded.

Maintenance: change a date only after a substantive content, schema or meaningful-link change; cite the PR in this register or the release ledger. Do not advance dates for formatting/builds alone. [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) supports truthful significant-modification dates.

## Validation and measurement

Production build passed: 247 prerendered HTML routes, 239 sitemap URLs, 8,252 internal-link occurrences and 12 hydration/navigation checks plus contact validation. Checks cover unique H1/title, canonicals, robots, schema, held exclusions, selected route-body loading and maintained modification dates. Six 390-pixel mobile routes are checked for visible content, current date labels, focused profile paths, navigation and overflow before merge.

Notify IndexNow once for the seven materially changed article/profile/tax URLs. Do not resubmit the ten unchanged guides or Contact. Google URL inspection is distinct from an indexing request; no unsupported request action is claimed.

Hypothesis: current useful supporting content, clear specific-intent anchors and factual expert/service paths help visitors and crawlers reach the right commercial landing. Measure subsequent Tier-A first crawl/indexation, query-to-landing distribution and actual enquiry events once an analytics collector is connected. Neither a submission nor a sitemap date guarantees indexing or rankings.

## Targeted property-support review — 7 October 2026 IST

Two existing checklists now distinguish record/search limitations from guarantees and refer readers to official sources. Purchase due diligence qualifies the search period, revenue entries, encumbrance/litigation scope, land-use route and society/lessor permissions. The RERA checklist removes the impossible dated experience narrative, qualifies registration/redevelopment exemptions, corrects separate-account terminology and connects designated-account checks with project/promoter-specific directions. No new URL, title/snippet experiment, author or advocate-review status was introduced.

Original publication dates and authors remain. Only these two article bodies changed; the other 152 source objects are identical. Four official resource paths per guide retain the existing preferred title-review/MahaRERA service CTA. Editorial dates use 6 October UTC (7 October IST) to match the generator's UTC future-date validation; all previous 18 dates stay unchanged. The sitemap now has 20 maintained dates and 219 undated entries. The reviewed IndexNow list contains exactly these two materially changed URLs.

The source/retrieval limits, commercial crawl-path diagnosis and current access blockers are in [cycle evidence](evidence/Cycle_2026-10-07.json). The build passes 247 static routes, 239 sitemap URLs, 8,101 internal links, twelve hydration/navigation paths and Contact checks. Verify production after deployment before marking the release complete. Measure first verified crawl/indexation, relevant query→service landings and intent actions when account reporting is restored; no ranking or lead uplift is inferred.
