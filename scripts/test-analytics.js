const assert = require('node:assert/strict');
const path = require('node:path');
const { JSDOM, VirtualConsole } = require('jsdom');
const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
let passed = 0;

function fixture(url = 'https://paullegalassociates.com/', referrer) {
  const dom = new JSDOM('<!doctype html><html><head><title>Private form text must not become a title parameter</title></head><body><main><a id="phone" href="tel:+917977063567">Call</a><div id="app"></div></main></body></html>', { url, ...(referrer ? { referrer } : {}), virtualConsole: new VirtualConsole() });
  global.window = dom.window; global.document = dom.window.document;
  global.CustomEvent = dom.window.CustomEvent; global.Element = dom.window.Element;
  global.HTMLElement = dom.window.HTMLElement; global.IS_REACT_ACT_ENVIRONMENT = true;
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: dom.window.navigator });
  delete require.cache[require.resolve('./load-source')];
  const { loadSource } = require('./load-source');
  const analytics = loadSource(path.resolve(__dirname, '../src/analytics.ts'));
  const hooks = loadSource(path.resolve(__dirname, '../src/enquiryEvents.ts'));
  const commands = () => (window.dataLayer || []).filter(x => x && typeof x.length === 'number').map(x => Array.from(x));
  const events = name => commands().filter(x => x[0] === 'event' && (!name || x[1] === name));
  const dispatch = detail => window.dispatchEvent(new window.CustomEvent('pla:enquiry-action', { detail }));
  const navigate = route => { window.history.pushState(null, '', route); analytics.trackAnalyticsPageView(); };
  return { dom, analytics, hooks, commands, events, dispatch, navigate, loadSource };
}

function test(name, fn) {
  try { fn(); passed++; console.log(`PASS: ${name}`); }
  finally {
    if (global.window) window.close();
    delete global.window; delete global.document;
    if (originalNavigator) Object.defineProperty(globalThis, 'navigator', originalNavigator);
    else delete globalThis.navigator;
  }
}

test('server rendering does not require browser APIs', () => {
  const f = fixture(); delete global.window; delete global.document;
  assert.equal(f.analytics.analyticsChoice(), 'unset');
  f.analytics.trackAnalyticsPageView(); f.dom.window.close();
});

test('no Google tag or measurement commands before consent, including contact actions', () => {
  const f = fixture(); const stop = f.analytics.installAnalyticsCollector();
  f.hooks.trackEnquiryAction('phone_click');
  assert.equal(document.querySelectorAll('script').length, 0); assert.deepEqual(f.commands(), []); stop();
});

test('declined consent remains declined on installation', () => {
  const f = fixture(); f.analytics.chooseAnalytics('denied'); f.analytics.installAnalyticsCollector();
  assert.equal(f.analytics.analyticsChoice(), 'denied'); assert.deepEqual(f.commands(), []);
  assert.equal(document.querySelectorAll('script').length, 0);
});

test('one tag and one initial pageview despite repeated setup, React effect replay and clicks', () => {
  const f = fixture(); const oldStop = f.analytics.installAnalyticsCollector();
  f.analytics.chooseAnalytics('granted'); const stop = f.analytics.installAnalyticsCollector(); oldStop();
  f.analytics.trackAnalyticsPageView(); f.analytics.chooseAnalytics('granted');
  f.hooks.trackEnquiryAction('phone_click');
  assert.equal(document.querySelectorAll('#pla-analytics-tag').length, 1);
  assert.equal(f.events('page_view').length, 1); assert.equal(f.events('phone_click').length, 1); stop();
});

test('consent precedes configuration; automatic pageviews, ads and Google signals stay off', () => {
  const f = fixture(); f.analytics.chooseAnalytics('granted'); const c = f.commands();
  assert.deepEqual(c[0].slice(0, 2), ['consent', 'default']); assert.equal(c[0][2].analytics_storage, 'denied');
  assert.equal(c[1][2].analytics_storage, 'granted');
  const cfg = c.find(x => x[0] === 'config')[2];
  assert.equal(cfg.send_page_view, false); assert.equal(cfg.allow_google_signals, false); assert.equal(cfg.allow_ad_personalization_signals, false);
  assert(!c.some(x => x[2]?.ad_storage === 'granted' || x[2]?.ad_user_data === 'granted' || x[2]?.ad_personalization === 'granted'));
  assert.equal(document.querySelector('script').referrerPolicy, 'no-referrer');
});

test('page URLs, titles, referrer paths and campaign fields cannot leak private query values', () => {
  const secret = 'CLIENT_SECRET_123';
  const f = fixture(`https://paullegalassociates.com/contact/?email=${secret}&utm_source=${secret}&utm_medium=${secret}&utm_campaign=${secret}&utm_term=${secret}&utm_id=${secret}#${secret}`, `https://www.google.com/search?q=${secret}`);
  f.analytics.chooseAnalytics('granted');
  assert(!JSON.stringify(f.commands()).includes(secret));
  const p = f.events('page_view')[0][2]; assert.equal(p.page_location, 'https://paullegalassociates.com/contact/');
  assert.equal(p.page_referrer, 'https://www.google.com/'); assert.equal(p.campaign_source, 'google'); assert.equal(p.campaign_medium, 'organic');
  assert(!JSON.stringify(f.commands()).includes('Private form text'));
});

test('fixed GBP attribution survives navigation before consent without transmitting any query', () => {
  const f = fixture('https://paullegalassociates.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=website&client=PRIVATE_VALUE');
  f.analytics.installAnalyticsCollector(); f.navigate('/contact/'); f.analytics.chooseAnalytics('granted');
  const p = f.events('page_view')[0][2];
  assert.equal(p.landing_page_path, '/'); assert.equal(p.page_path, '/contact/'); assert.equal(p.traffic_origin, 'gbp');
  assert.equal(p.campaign_name, 'gbp'); assert.equal(p.campaign_content, 'website');
  assert(!JSON.stringify(f.commands()).includes('PRIVATE_VALUE')); assert(!p.page_location.includes('?'));
});

test('appointment campaign is recognised but arbitrary tagged URLs are not trusted', () => {
  const f = fixture('https://paullegalassociates.com/contact/?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=appointment');
  f.analytics.chooseAnalytics('granted'); assert.equal(f.events('page_view')[0][2].campaign_content, 'appointment');
});

test('AI referrals retain only a known host; unknown private referrers stay coarse', () => {
  const f = fixture('https://paullegalassociates.com/', 'https://chatgpt.com/c/PRIVATE_CONVERSATION');
  f.analytics.chooseAnalytics('granted'); const p = f.events('page_view')[0][2];
  assert.equal(p.campaign_source, 'chatgpt.com'); assert.equal(p.traffic_origin, 'ai_referral');
  assert.equal(p.page_referrer, 'https://chatgpt.com/'); assert(!JSON.stringify(f.commands()).includes('PRIVATE_CONVERSATION'));
});

test('unrecognised referrer hostname and query never reach the collector', () => {
  const f = fixture('https://paullegalassociates.com/', 'https://private-client.example/legal?matter=CONFIDENTIAL');
  f.analytics.chooseAnalytics('granted'); const p = f.events('page_view')[0][2];
  assert.equal(p.campaign_source, '(referral)'); assert.equal(p.page_referrer, '');
  assert(!JSON.stringify(f.commands()).includes('private-client')); assert(!JSON.stringify(f.commands()).includes('CONFIDENTIAL'));
});

test('SPA views are counted once per route and preserve the original landing page', () => {
  const f = fixture(); f.analytics.chooseAnalytics('granted'); f.navigate('/contact/'); f.navigate('/contact/?name=PRIVATE');
  assert.equal(f.events('page_view').length, 2); const p = f.events('page_view')[1][2];
  assert.equal(p.page_path, '/contact/'); assert.equal(p.landing_page_path, '/'); assert(!JSON.stringify(f.commands()).includes('PRIVATE'));
});

test('the existing delegated phone hook reaches GA4 exactly once without link details', () => {
  const f = fixture(); f.analytics.installAnalyticsCollector(); const stopHooks = f.hooks.installEnquiryEvents(); f.analytics.chooseAnalytics('granted');
  document.addEventListener('click', e => e.preventDefault()); document.getElementById('phone').click();
  assert.equal(f.events('phone_click').length, 1); assert(!JSON.stringify(f.commands()).includes('7977063567')); stopHooks();
});

test('all seven existing event types remain separate, and arbitrary events/extra fields are rejected', () => {
  const f = fixture(); f.analytics.installAnalyticsCollector(); f.analytics.chooseAnalytics('granted');
  const names = ['phone_click', 'whatsapp_click', 'email_click', 'consultation_click', 'directions_click', 'official_resource_click', 'contact_form_handoff'];
  names.forEach(event => f.dispatch({ event, link_location: 'main', page_path: '/PRIVATE/', name: 'PRIVATE_CLIENT', message: 'PRIVATE_MATTER', resource_host: 'www.rbi.org.in' }));
  names.forEach(name => assert.equal(f.events(name).length, 1)); f.dispatch({ event: 'PRIVATE_EVENT' });
  assert.equal(f.events().length, 8); assert(!JSON.stringify(f.commands()).includes('PRIVATE'));
});

test('resource hosts and link locations are independently validated', () => {
  const f = fixture(); f.analytics.installAnalyticsCollector(); f.analytics.chooseAnalytics('granted');
  f.dispatch({ event: 'official_resource_click', resource_host: 'private.gov.in/?client=SECRET', link_location: 'SECRET' });
  f.dispatch({ event: 'official_resource_click', resource_host: 'labour.gov.in', link_location: 'main' });
  assert.equal(f.events('official_resource_click')[0][2].resource_host, 'none'); assert.equal(f.events('official_resource_click')[0][2].link_location, 'other');
  assert.equal(f.events('official_resource_click')[1][2].resource_host, 'labour.gov.in'); assert(!JSON.stringify(f.commands()).includes('SECRET'));
});

test('withdrawal disables future hits and removes GA cookies without deleting unrelated preferences', () => {
  const f = fixture(); f.analytics.installAnalyticsCollector(); f.analytics.chooseAnalytics('granted');
  document.cookie = '_ga=test; path=/; Secure'; document.cookie = '_ga_41YDS7LDYY=test; domain=.paullegalassociates.com; path=/; Secure'; document.cookie = 'other_preference=keep; path=/';
  const count = f.commands().length; f.analytics.chooseAnalytics('denied'); f.hooks.trackEnquiryAction('phone_click'); f.navigate('/contact/');
  assert.equal(f.commands().length, count); assert.equal(window[`ga-disable-${f.analytics.MEASUREMENT_ID}`], true);
  assert(!document.cookie.includes('_ga=')); assert(!document.cookie.includes('_ga_')); assert(document.cookie.includes('other_preference=keep'));
});

test('withdrawal in another tab disables this tab through the storage event', () => {
  const f = fixture(); f.analytics.installAnalyticsCollector(); f.analytics.chooseAnalytics('granted');
  window.localStorage.setItem(f.analytics.CONSENT_KEY, 'denied'); window.dispatchEvent(new window.StorageEvent('storage', { key: f.analytics.CONSENT_KEY }));
  assert.equal(window[`ga-disable-${f.analytics.MEASUREMENT_ID}`], true);
});

test('blocked local storage falls back to the explicit choice for this page only', () => {
  const f = fixture(); Object.defineProperty(window, 'localStorage', { get: () => { throw new Error('blocked'); } });
  assert.equal(f.analytics.analyticsChoice(), 'unset'); f.analytics.chooseAnalytics('granted'); assert.equal(f.events('page_view').length, 1);
  f.analytics.chooseAnalytics('denied'); assert.equal(f.analytics.analyticsChoice(), 'denied');
});

test('a storage write failure cannot override the visitor\'s new choice with an older saved choice', () => {
  const f = fixture(); window.localStorage.setItem(f.analytics.CONSENT_KEY, 'denied');
  const storage = window.localStorage;
  Object.defineProperty(window, 'localStorage', { value: { getItem: key => storage.getItem(key), setItem: () => { throw new Error('quota exceeded'); } } });
  f.analytics.chooseAnalytics('granted'); assert.equal(f.events('page_view').length, 1);
  f.analytics.chooseAnalytics('denied'); assert.equal(f.analytics.analyticsChoice(), 'denied');
});

test('all eight held articles remain excluded, including navigation from an opted-in page', () => {
  const f = fixture(); f.analytics.chooseAnalytics('granted'); const before = f.events().length;
  const held = require('../src/seo-awaiting-review.json');
  for (const slug of held) { f.navigate(`/insights/${slug}/`); assert.equal(window[`ga-disable-${f.analytics.MEASUREMENT_ID}`], true); }
  assert.equal(f.events().length, before); f.navigate('/contact/'); assert.equal(f.events('page_view').length, 2);
});

test('unknown/private paths never load Google even after consent', () => {
  const f = fixture('https://paullegalassociates.com/PRIVATE_CLIENT/'); f.analytics.chooseAnalytics('granted');
  assert.deepEqual(f.commands(), []); assert.equal(document.querySelectorAll('script').length, 0);
});

test('development and preview hosts do not send production measurement', () => {
  const f = fixture('http://localhost:3000/'); f.analytics.chooseAnalytics('granted'); assert.deepEqual(f.commands(), []);
});

test('debug QA survives SPA navigation while its URL flag is never transmitted', () => {
  const f = fixture('https://paullegalassociates.com/?analytics_debug=1'); f.analytics.chooseAnalytics('granted'); f.navigate('/contact/');
  assert(f.events().every(x => x[2].debug_mode === true)); assert(!JSON.stringify(f.commands()).includes('analytics_debug'));
});

test('visible preference controls allow decline, reconsideration and consent withdrawal', () => {
  const f = fixture(); const React = require('react'); const { createRoot } = require('react-dom/client'); const { act } = require('react-dom/test-utils');
  const Component = f.loadSource(path.resolve(__dirname, '../src/components/AnalyticsPreferences.tsx')).default;
  const root = createRoot(document.getElementById('app'));
  const click = text => act(() => [...document.querySelectorAll('button')].find(x => x.textContent === text).click());
  act(() => root.render(React.createElement(Component)));
  assert(document.querySelector('section[aria-label="Optional analytics"]')); click('No thanks');
  assert.equal(document.querySelectorAll('script').length, 0); click('Analytics preferences'); click('Allow analytics');
  assert.equal(f.events('page_view').length, 1); click('Analytics preferences'); click('No thanks');
  assert.equal(f.analytics.analyticsChoice(), 'denied'); act(() => root.unmount());
});

console.log(`PASS: ${passed} analytics consent, privacy, attribution, navigation and event-collection checks (no external requests).`);
