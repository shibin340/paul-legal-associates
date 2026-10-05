# Enquiry measurement contract — 5 October 2026

## Implemented source behaviour

Document-level click handling emits one `dataLayer` custom event and a `pla:enquiry-action` browser event. The contact form emits a validated WhatsApp handoff, including keyboard submission. A handoff is not proof of a sent WhatsApp message, received enquiry, qualified call or retained matter. There is no server form delivery.

| Event | Trigger | Interpretation |
|---|---|---|
| `phone_click` | Telephone anchor | Call intent; not connected call |
| `whatsapp_click` | WhatsApp anchor | App/chat intent; not message delivery |
| `email_click` | Email anchor | Compose intent; not sent email |
| `contact_form_handoff` | Validated form opens WhatsApp | Prepared enquiry handoff; not received lead |
| `consultation_click` | Contact CTA link | Consultation-path intent; not a lead |
| `directions_click` | Visible Google Maps directions link | Office-navigation intent |
| `official_resource_click` | Government/RBI resource anchor | Supporting-information use; not a conversion |

Parameters are limited to known `page_path`, `landing_page_path`, coarse `traffic_origin`, `link_location`, optional `service_slug` and an official `resource_host`. No names, entered emails/phones, message text, link text, full destination URL, query strings or raw referrer are emitted. Landing context survives SPA navigation within the page session. It is a coarse diagnostic, not a replacement for GA4 channel attribution.

## Verified and blocked

Source tests verify one phone event, one directions event, no handoff for an invalid form, exactly one handoff for a valid form, prevention of form GET submission, and absence of test personal data from event payloads. Mobile/browser tests and production checks are recorded in the release evidence.

**GA4/GTM collection is BLOCKED, not complete.** Source/production inspection found no GA4/GTM tag or measurement ID. The connected GSC Wizard account has Search Console consent but no GA4 scope or selected GA4 property. There is no connected Tag Manager account. Cloudflare's own public beacon is present; it does not establish GA4 lead reporting. Nothing is sent to a new third-party analytics collector by these hooks.

Required external configuration: connect the firm's existing GA4 account/property (or an authorised administrator must create/select a web property), and expose its GA4 measurement ID or GTM container. Configure one collector for the event contract above; avoid installing both direct gtag and GTM copies. In GTM use a custom-event trigger matching this allowlist and GA4 event parameters from the corresponding data-layer variables. Set a sanitised page URL/referrer rather than forwarding sensitive query strings. Inspect DebugView/Realtime and an actual collect request before marking collection complete.

For GBP website attribution, when owner access is available use `https://paullegalassociates.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=website`; appointment/contact attribution uses `/contact/` with the same fixed campaign and `utm_content=appointment`. No GBP setting has been changed.

Configure phone, WhatsApp, email and handoff as separate intent actions. Do not sum correlated actions as unique leads. A qualified-enquiry/retained-matter metric requires a separate verified office follow-up process. Weekly reporting should compare organic/local landing sessions, action rate and qualified enquiries once collection is validated. Counts currently remain unknown.

Primary guidance checked 5 October: [Google custom events](https://support.google.com/analytics/answer/12229021) and [event parameters](https://support.google.com/analytics/answer/13675006). Do not label this contract as a complete analytics installation.
