import { PRACTICE_AREAS } from './practiceAreas';
import { ARTICLES } from './data/articles';
import { TEAM_MEMBERS } from './data/site';

type EventName = 'phone_click' | 'whatsapp_click' | 'email_click' | 'consultation_click' | 'directions_click' | 'official_resource_click' | 'contact_form_handoff';
type LinkLocation = 'header' | 'footer' | 'main' | 'contact_form' | 'other';
type TrafficOrigin = 'gbp' | 'organic_search' | 'ai_referral' | 'referral' | 'direct_or_unknown';
const knownPaths = new Set(['/', '/about/', '/contact/', '/expertise/', '/partners/', '/insights/', '/finance-tax-regulatory-advisory/', ...PRACTICE_AREAS.map(a => `/expertise/${a.slug}/`), ...ARTICLES.map(a => `/insights/${a.slug}/`), ...TEAM_MEMBERS.map(a => `/partners/${a.slug}/`)]);
const safePath = (path: string) => {
  const canonical = path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`;
  return knownPaths.has(canonical) ? canonical : '/unknown/';
};
let landing: { path: string; origin: TrafficOrigin } | undefined;
function landingContext() {
  if (landing) return landing;
  let origin: TrafficOrigin = 'direct_or_unknown';
  const params = new URLSearchParams(window.location.search);
  if (params.get('utm_source') === 'google' && params.get('utm_medium') === 'organic' && params.get('utm_campaign') === 'gbp') origin = 'gbp';
  else if (document.referrer) {
    try {
      const host = new URL(document.referrer).hostname;
      if (/^(www\.)?(chatgpt\.com|chat\.openai\.com|perplexity\.ai|copilot\.microsoft\.com)$/.test(host)) origin = 'ai_referral';
      else if (/(^|\.)(google\.[a-z.]+|bing\.com|duckduckgo\.com|search\.yahoo\.com)$/.test(host)) origin = 'organic_search';
      else if (host !== window.location.hostname) origin = 'referral';
    } catch { /* Ignore invalid referrers. */ }
  }
  landing = { path: safePath(window.location.pathname), origin };
  return landing;
}

// The payload deliberately excludes link text/URLs, query strings, form values,
// email addresses and telephone numbers. Configure one collector in GTM/GA4;
// the source itself does not claim that a click became a delivered enquiry.
export function trackEnquiryAction(event: EventName, location: LinkLocation = 'main', resourceHost?: string) {
  if (typeof window === 'undefined') return;
  const pagePath = safePath(window.location.pathname);
  const first = landingContext();
  const payload = {
    event,
    page_path: pagePath,
    landing_page_path: first.path,
    traffic_origin: first.origin,
    link_location: location,
    service_slug: pagePath.startsWith('/expertise/') ? pagePath.split('/')[2] : pagePath === '/finance-tax-regulatory-advisory/' ? 'finance-tax-regulatory-advisory' : 'none',
    resource_host: resourceHost || 'none'
  };
  const target = window as Window & { dataLayer?: unknown[] };
  target.dataLayer = target.dataLayer || [];
  target.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent('pla:enquiry-action', { detail: payload }));
}

export function installEnquiryEvents(): () => void {
  landingContext();
  const onClick = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[href]');
    if (!link) return;
    let destination: URL;
    try { destination = new URL(link.href, window.location.href); } catch { return; }
    const location: LinkLocation = link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : link.closest('main') ? 'main' : 'other';
    if (destination.protocol === 'tel:') trackEnquiryAction('phone_click', location);
    else if (destination.protocol === 'mailto:') trackEnquiryAction('email_click', location);
    else if (['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(destination.hostname)) trackEnquiryAction('whatsapp_click', location);
    else if (destination.hostname === 'www.google.com' && destination.pathname.startsWith('/maps/')) trackEnquiryAction('directions_click', location);
    else if (destination.origin === window.location.origin && safePath(destination.pathname) === '/contact/' && link.matches('[class*="btn-"], [data-enquiry-cta]')) trackEnquiryAction('consultation_click', location);
    else if (destination.protocol === 'https:' && (/\.(gov|nic)\.in$/.test(destination.hostname) || ['www.rbi.org.in', 'rbi.org.in'].includes(destination.hostname))) trackEnquiryAction('official_resource_click', location, destination.hostname);
  };
  document.addEventListener('click', onClick, true);
  return () => document.removeEventListener('click', onClick, true);
}
