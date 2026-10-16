import { landingContext, safePath } from './enquiryEvents';
import heldArticles from './seo-awaiting-review.json';

// Public ID of the owner's single standard GA4 web stream, verified in Admin.
export const MEASUREMENT_ID = 'G-41YDS7LDYY';
const disableKey = `ga-disable-${MEASUREMENT_ID}` as const;
export const CONSENT_KEY = 'pla.analytics-consent.v1';
const origin = 'https://paullegalassociates.com';
const heldPaths = new Set(heldArticles.map(slug => `/insights/${slug}/`));
const eventNames = new Set(['phone_click', 'whatsapp_click', 'email_click', 'consultation_click', 'directions_click', 'official_resource_click', 'contact_form_handoff']);
const linkLocations = new Set(['header', 'footer', 'main', 'contact_form', 'other']);
type Choice = 'granted' | 'denied';
type TagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void } & Partial<Record<typeof disableKey, boolean>>;
let pageChoice: Choice | undefined;
let configured = false;
let lastPage: string | undefined;
let debugSession = false;
let attribution: Record<string, string> | undefined;
let actionListener: EventListener | undefined;

export function analyticsChoice(): Choice | 'unset' {
  if (typeof window === 'undefined') return 'unset';
  if (pageChoice) return pageChoice;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : 'unset';
  } catch { return 'unset'; }
}

function eligiblePath() {
  const path = safePath(window.location.pathname);
  return ['paullegalassociates.com', 'www.paullegalassociates.com'].includes(window.location.hostname)
    && path !== '/unknown/' && !heldPaths.has(path) ? path : undefined;
}

// Never forward a raw referrer, campaign value, fragment or query string.
// Recognised sources keep their channel; other referrers remain coarse only.
function sourceContext() {
  if (attribution) return attribution;
  const first = landingContext();
  let source = '(direct)', medium = '(none)', referrer = '';
  const params = new URLSearchParams(window.location.search);
  const gbpContent = first.path === '/' ? 'website' : first.path === '/contact/' ? 'appointment' : '';
  const gbp = gbpContent && params.get('utm_source') === 'google' && params.get('utm_medium') === 'organic'
    && params.get('utm_campaign') === 'gbp' && params.get('utm_content') === gbpContent;
  if (gbp) { source = 'google'; medium = 'organic'; }
  else if (document.referrer) {
    try {
      const host = new URL(document.referrer).hostname;
      if (/(^|\.)google\.(com|co\.in|[a-z]{2}|com\.[a-z]{2}|co\.[a-z]{2})$/.test(host)) { source = 'google'; medium = 'organic'; referrer = 'https://www.google.com/'; }
      else if (/(^|\.)bing\.com$/.test(host)) { source = 'bing'; medium = 'organic'; referrer = 'https://www.bing.com/'; }
      else if (host === 'duckduckgo.com' || host === 'www.duckduckgo.com') { source = 'duckduckgo'; medium = 'organic'; referrer = 'https://duckduckgo.com/'; }
      else if (host === 'search.yahoo.com') { source = 'yahoo'; medium = 'organic'; referrer = 'https://search.yahoo.com/'; }
      else if (['chatgpt.com', 'chat.openai.com', 'perplexity.ai', 'copilot.microsoft.com', 'copilot.com'].includes(host.replace(/^www\./, ''))) {
        source = host.replace(/^www\./, ''); medium = 'referral'; referrer = `https://${source}/`;
      } else if (!['paullegalassociates.com', 'www.paullegalassociates.com'].includes(host)) { source = '(referral)'; medium = 'referral'; }
    } catch { /* Invalid/private referrers are omitted. */ }
  }
  attribution = {
    campaign_source: source, campaign_medium: medium, campaign_name: gbp ? 'gbp' : '(not set)',
    campaign_content: gbp ? gbpContent : '(not set)', campaign_term: '(not set)', campaign_id: '(not set)',
    page_referrer: referrer
  };
  return attribution;
}

function disableCollection() {
  (window as TagWindow)[disableKey] = true;
  lastPage = undefined;
}

export function chooseAnalytics(choice: Choice) {
  pageChoice = choice;
  try { window.localStorage.setItem(CONSENT_KEY, choice); } catch { /* Keep the choice for this page only. */ }
  if (choice === 'granted') trackAnalyticsPageView();
  else {
    // Google's opt-out flag stops cookies/hits even when the tag was loaded.
    disableCollection();
    for (const item of document.cookie.split(';')) {
      const name = item.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of ['', `; domain=${window.location.hostname}`, '; domain=.paullegalassociates.com']) {
        document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax; Secure`;
      }
    }
  }
}

function pageContext(path: string) {
  const first = landingContext();
  return {
    ...sourceContext(), page_location: origin + path, page_title: 'Paul Legal Associates',
    page_path: path, landing_page_path: first.path, traffic_origin: first.origin,
    service_slug: path.startsWith('/expertise/') ? path.split('/')[2] : path === '/finance-tax-regulatory-advisory/' ? 'finance-tax-regulatory-advisory' : 'none',
    ...(debugSession ? { debug_mode: true } : {})
  };
}

export function trackAnalyticsPageView() {
  if (typeof window === 'undefined') return;
  const path = eligiblePath();
  if (analyticsChoice() !== 'granted' || !path) { disableCollection(); return; }
  const target = window as TagWindow;
  target[disableKey] = false;
  if (lastPage === path) return;
  debugSession = debugSession || new URLSearchParams(window.location.search).get('analytics_debug') === '1';
  target.dataLayer = target.dataLayer || [];
  target.gtag = target.gtag || function () { target.dataLayer!.push(arguments); };
  const tag = target.gtag;
  if (!configured) {
    tag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    tag('consent', 'update', { analytics_storage: 'granted' });
    tag('set', 'ads_data_redaction', true);
    tag('set', 'url_passthrough', false);
    tag('js', new Date());
    configured = true;
  }
  const context = pageContext(path);
  tag('config', MEASUREMENT_ID, {
    ...context, send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
    cookie_expires: 60 * 60 * 24 * 90, cookie_update: false, cookie_flags: 'SameSite=Lax;Secure'
  });
  tag('event', 'page_view', { ...context, send_to: MEASUREMENT_ID });
  lastPage = path;
  if (!document.getElementById('pla-analytics-tag')) {
    const script = document.createElement('script');
    script.id = 'pla-analytics-tag';
    script.async = true;
    script.referrerPolicy = 'no-referrer';
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }
}

export function installAnalyticsCollector(): () => void {
  if (actionListener) window.removeEventListener('pla:enquiry-action', actionListener);
  const onAction: EventListener = event => {
    const detail = (event as CustomEvent).detail;
    if (!detail || !eventNames.has(detail.event) || analyticsChoice() !== 'granted' || !eligiblePath()) return;
    trackAnalyticsPageView();
    const path = eligiblePath()!;
    const resource = detail.event === 'official_resource_click' && typeof detail.resource_host === 'string'
      && (/^(?:[a-z0-9-]+\.)+(?:gov|nic)\.in$/.test(detail.resource_host) || ['rbi.org.in', 'www.rbi.org.in'].includes(detail.resource_host)) ? detail.resource_host : 'none';
    (window as TagWindow).gtag!('event', detail.event, {
      ...pageContext(path), send_to: MEASUREMENT_ID,
      link_location: linkLocations.has(detail.link_location) ? detail.link_location : 'other', resource_host: resource
    });
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_KEY || event.key === null) { pageChoice = undefined; trackAnalyticsPageView(); }
  };
  actionListener = onAction;
  window.addEventListener('pla:enquiry-action', onAction);
  window.addEventListener('storage', onStorage);
  sourceContext();
  trackAnalyticsPageView();
  return () => {
    window.removeEventListener('pla:enquiry-action', onAction);
    window.removeEventListener('storage', onStorage);
    if (actionListener === onAction) actionListener = undefined;
  };
}
