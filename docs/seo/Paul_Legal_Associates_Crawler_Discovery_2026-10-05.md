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

## Production checkpoint — 7 October 2026 IST

PR #31 preserved the existing key/workflow and submitted one exact two-guide batch. [Build/deploy run](https://github.com/shibin340/paul-legal-associates/actions/runs/37518505768) succeeded; notification returned HTTP200 at19:24:45UTC. Runner HTML checks received403 with Rays `a4670c4f8d125e93-ATL` and `a4670c4fcbe0fb29-BNA`. Independent public fetches and the cloud browser returned complete200 content for both guides; all18 commercial routes and8 held articles also passed. This remains client-specific evidence, with genuine Google/Bing/OAI treatment unknown pending actual zone events. No security setting changed and no local repeat batch was sent. Bing Webmaster reporting is unavailable; acceptance is not indexing. The docs-only checkpoint leaves the manifest unchanged and must skip IndexNow. Exact evidence is in [the existing cycle snapshot](evidence/Cycle_2026-10-07.json).

## POSH continuation — 7 October 2026 IST

PR33 accepted one exact two-guide IndexNow batch at20:17:24UTC with HTTP200. The live root key remains verified; receipt is not indexing. Runner checks returned403 with Rays `a467596979c81f56-LAX` and `a46759699afc34b4-LAX`;34 independent public checks and both desktop browser paths pass. Genuine Googlebot/Bingbot/OAI treatment remains unknown without zone logs and verified identity evidence. PR34’s unchanged manifest skipped notification; this documentation-only checkpoint must also skip it. No security rule or bot policy changed. Actual Bing crawl/index/query reports remain blocked by reporting access.

## Contact trust release — 7 October 2026 IST

PR36 notified only the substantively changed Contact URL once: HTTP200 at20:44:12UTC. The live root key remains verified. Its runner check returned403 with Ray `a46780af7c23687a-LAX`; independent public Contact/assets and cloud-browser checks passed. Genuine Google/Bing/OAI treatment still requires actual zone logs and verified identity evidence. The two already-notified POSH guides were not resubmitted. The following documentation-only checkpoint keeps the manifest unchanged and must skip notification. No current Bing crawl/index result is claimed.
