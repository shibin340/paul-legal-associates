# Reviewed IndexNow notifications

Edit `changed-urls.json` only when a canonical page was added or its visible content was meaningfully updated. Include the changed URLs, not the entire sitemap. The deploy workflow sends the list once when this file changes on `main`, after it can read the published key and pages on the live site. A workflow rerun can repeat the notification; do not rerun merely to generate more submissions.

The root key file is required by the [IndexNow protocol](https://www.indexnow.org/documentation). Keep its filename and contents in sync with `keyFile`. The script checks that the listed URLs are in the built sitemap, that production serves the exact key, and that each page returns 200 with its self canonical and indexable robots tag before making a request. Run `node scripts/submit-indexnow.js --check` after `npm run build` to validate without notifying the service.

Inspect the `notify-indexnow` job log for the HTTP response. `200` means received; `202` means received while key validation is pending. Neither proves that Bing indexed a URL or sent a visit. This mechanism targets IndexNow participants, not Google Search Console. If the job fails, investigate its log and only retry once the cause is resolved.
