# Search/AI crawler and Bing evidence — 5 October 2026

The live robots file allows `User-agent: *`, has no Disallow, and references the apex sitemap. This permits Googlebot, Bingbot and OAI-SearchBot at the robots layer. Successful public curl/cloud-browser HTML fetches are recorded with release evidence. **These clients are not verified search crawlers**, and a user-agent label alone would not prove crawler identity.

## Actual limitations and security evidence

GitHub Actions HTML checks received Cloudflare 403 while independent public clients received HTTP 200 and complete content. PR #27 Contact Ray: `a45b5e6ea915f27a-IAD` at 09:23 UTC. PR #28 employment-article Ray: `a45c08a75b35c07e-IAD` at 11:19 UTC; other changed-URL Rays are in run 37302030413. PR #29 Ray: `a45c2ae6deddd300-ORD` at 11:43 UTC, independently verified against HTTP 200 and the deployed bundle. This is a client-specific restriction, not a confirmed site outage or proof that Googlebot/Bingbot/OAI-SearchBot is blocked.

Exact missing access: **Cloudflare zone Security Events/verified-bot request logs and current WAF/Bot/crawl-control/cache settings**. Use these Rays to identify the actual rule/action, then check genuine crawler requests. No WAF rule, bot setting, rate limit or challenge was changed and security was not weakened. A narrow verified-search-crawler treatment is appropriate only after inspecting the actual configuration/evidence.

Current primary guidance checked:

- [OpenAI bots](https://developers.openai.com/api/docs/bots): OAI-SearchBot serves search/discovery; GPTBot is a separate training crawler. Use the linked current [searchbot IP feed](https://openai.com/searchbot.json), not a stale hard-coded range.
- [Google crawler verification](https://developers.google.com/crawling/docs/crawlers-fetchers/verify-google-requests): use reverse/forward DNS or current published ranges.
- [Cloudflare verified bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/): verified identity and configured search/training policy must both be considered.
- [Google AI features](https://developers.google.com/search/docs/appearance/ai-features): ordinary crawlability, indexing, useful content and Search eligibility remain foundational. No speculative `llms.txt` or fake AI-ranking hack was added.

## IndexNow operation

Existing root key, reviewed changed-URL list, validation script and deployment workflow were preserved. Production key contents were checked. Batches this cycle:

| Release | Materially changed URLs | Response | Meaning |
|---|---:|---|---|
| PR #23 | 1 MahaRERA | HTTP 200 | Notification accepted; not proof of Bing indexing |
| PR #25 | 9 preparation guides | HTTP 200 | One distinct changed-URL batch |
| PR #26 | 0 unchanged content URLs | Workflow skipped | Article delivery optimisation did not resend unchanged pages |
| PR #27 | 1 Contact | HTTP 200 | One actual handoff/directions update |
| PR #28 | 7 article/profile/tax URLs | HTTP 200 | Two substantive corrections and relevant link relationships |
| PR #29 | 1 Finance advisory URL | HTTP 200 | Visible and structured breadcrumb added; unchanged article bodies not resubmitted |

The 30 September three-URL batch returned HTTP 202 pending key validation. Today's accepted batches do not establish whether Bing later crawled or indexed those earlier URLs. The Bing connector reports `notConfigured`; exact missing access is **the site's Bing Webmaster API/report connection**. Sitemap consumption, index coverage, keyword/click reporting and crawler dates remain unknown. Do not recreate the key or repeatedly submit unchanged lists. The docs-only record update must skip IndexNow.

Public asset evidence after PR #26: gzip compression observed; Cloudflare cache hit with `max-age=14400`. Long-lived immutable caching/Brotli settings are not verified through zone access. No cache/security change is inferred from a header.

Measure real search crawler success/challenge rates, Bing first crawl/indexing and service queries once the corresponding account data is connected. AI referral counts require an actual analytics collector; no rows in GSC search appearance do not prove zero AI visibility.
