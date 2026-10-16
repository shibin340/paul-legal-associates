import React, { useEffect, useState } from 'react';
import { analyticsChoice, chooseAnalytics } from '../analytics';

export default function AnalyticsPreferences() {
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(analyticsChoice() === 'unset'); }, []);
  const choose = (allowed: boolean) => { chooseAnalytics(allowed ? 'granted' : 'denied'); setOpen(false); };
  return <>
    <button type="button" data-requires-js className="text-cream/70 underline underline-offset-4 hover:text-gold" onClick={() => setOpen(true)}>Analytics preferences</button>
    {open && <section aria-label="Optional analytics" className="fixed bottom-4 left-4 right-4 z-50 max-w-xl mx-auto rounded-sm border border-gold/40 bg-navy-deep p-5 shadow-2xl text-left text-cream">
      <h2 className="font-serif text-lg text-gold mb-2">Optional analytics</h2>
      <p className="text-sm leading-relaxed mb-3">Google Analytics can help us understand visits and use of contact links. It uses cookies after you allow it. We exclude enquiry form contents and private URL parameters. You can change this choice here at any time.</p>
      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-xs text-cream/75 underline">Google Privacy Policy</a>
      <div className="flex flex-wrap gap-3 mt-4">
        <button type="button" className="btn-secondary" onClick={() => choose(false)}>No thanks</button>
        <button type="button" className="btn-secondary" onClick={() => choose(true)}>Allow analytics</button>
      </div>
    </section>}
  </>;
}
