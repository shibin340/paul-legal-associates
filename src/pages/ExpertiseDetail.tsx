import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PRACTICE_AREAS } from '../practiceAreas';
import { ARTICLES } from '../data';
import CredentialsBar from 'components/ui/CredentialsBar';
import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { getServiceMetadata } from '../serviceMetadata';
import { getRelatedServices, getServiceTopic } from '../serviceTopics';
import { serviceReading } from '../serviceReading';

const ExpertiseDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  // Find the selected practice area based on the URL slug or ID
  const area = PRACTICE_AREAS.find(
    (p) => p.slug === slug || p.id === slug
  );
  useDocumentTitle(area ? getServiceMetadata(area).title : 'Practice Areas | Paul Legal Associates');

  // If slug doesn't match any practice area, redirect cleanly
  if (!area) {
    return <Navigate to="/expertise/" replace />;
  }
  const topic = getServiceTopic(area.slug);
  const relatedServices = getRelatedServices(area, PRACTICE_AREAS);
  const relatedArticles = (serviceReading[area.slug] || [])
    .map(articleSlug => ARTICLES.find(item => item.slug === articleSlug))
    .filter((item): item is (typeof ARTICLES)[number] => Boolean(item));

  return (
    <>
      {/* ══ HERO (Individual Page H1 for SEO) ══ */}
      <section className="page-hero-wrapper" aria-label={`${area.title} hero`}>
        <div className="absolute inset-0 bg-page-hero-radial z-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-page-grid-lines z-0" aria-hidden="true" />
        <div className="relative z-10 max-w-[800px] animate-pageFadeIn">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.75rem] tracking-[0.06em] text-cream/70">
            <Link to="/" className="hover:text-gold">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/expertise/" className="hover:text-gold">Practice Areas</Link>
            <span aria-hidden="true">/</span>
            <span className="text-gold" aria-current="page">{area.title}</span>
          </nav>
          <h1 className="font-serif font-bold text-cream leading-[1.1] mt-3 mb-5" style={{ fontSize: "clamp(2.2rem,4.5vw,3.8rem)" }}>
            {area.title}
          </h1>
          <p className="font-serif-alt font-light text-cream/70 leading-[1.8] text-[1.15rem] max-w-[650px]">
            {area.shortDesc}
          </p>
        </div>
      </section>

      {/* ══ DETAIL & SIDEBAR NAVIGATION SECTION ══ */}
      <section className="bg-cream py-24 px-[5vw]">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 items-start">
            
            {/* The complete 83-service directory stays on /expertise/. */}
            <nav className="order-2 lg:order-1 lg:sticky lg:top-[calc(72px+2rem)] bg-white border border-navy/10 p-5 sm:p-6 rounded-sm shadow-2xs" aria-label="Related practice areas">
              <div className="text-2xs font-semibold tracking-[0.18em] uppercase text-gold mb-2">Explore connected work</div>
              <h2 className="font-serif text-[1.25rem] font-semibold text-navy leading-snug mb-5">{topic?.label || 'Practice areas'}</h2>
              {topic && topic.hub !== area.slug && (
                <Link to={`/expertise/${topic.hub}/`} className="block mb-5 text-[0.88rem] font-semibold text-navy underline decoration-gold/60 underline-offset-4 hover:text-gold">
                  View the {topic.label.toLowerCase()} overview →
                </Link>
              )}
              <ul className="list-none flex flex-col gap-1 m-0 p-0">
                {relatedServices.map(item => (
                  <li key={item.slug}>
                    <Link to={`/expertise/${item.slug}/`} className="group flex items-start gap-2 px-3 py-2.5 text-[0.84rem] leading-[1.5] text-navy border-l-2 border-gold/25 hover:border-gold hover:bg-cream transition-colors no-underline">
                      <span className="text-gold" aria-hidden="true">↗</span>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {topic?.id === 'finance-crossborder' && (
                <Link to="/finance-tax-regulatory-advisory/" className="block mt-4 text-[0.85rem] font-semibold text-navy underline decoration-gold/60 underline-offset-4 hover:text-gold">
                  Finance, Tax &amp; Regulatory Advisory →
                </Link>
              )}
              <Link to="/expertise/" className="block mt-6 pt-4 border-t border-navy/10 text-[0.85rem] font-semibold text-navy underline decoration-gold/60 underline-offset-4 hover:text-gold">
                Browse all {PRACTICE_AREAS.length} practice areas →
              </Link>
            </nav>

            {/* Main Area Content Panel */}
            <article className="order-1 lg:order-2 bg-white border border-navy/10 p-6 sm:p-10 min-h-[560px] shadow-sm">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center text-2xl flex-shrink-0 text-cream">
                  {area.icon}
                </div>
                <div>
                  <div className="eyebrow-row mb-1">
                    <div className="eyebrow-line" />
                    <span className="eyebrow-text">Practice Area Overview</span>
                  </div>
                  <h2 className="font-serif font-semibold text-navy leading-tight" style={{ fontSize: "clamp(1.5rem,2.5vw,2rem)" }}>
                    {area.title}
                  </h2>
                </div>
              </div>

              <p className="font-serif-alt text-[1.1rem] text-navy/80 leading-[1.8] mb-5">{area.shortDesc}</p>
              <div className="h-px bg-navy/10 mb-5" aria-hidden="true" />
              <p className="text-[0.92rem] text-muted leading-[1.85] mb-7">{area.fullDesc}</p>

              <div className="text-2xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">Key Services & Solutions</div>
              <ul className="list-none grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-10">
                {area.highlights.map((h: string) => (
                  <li key={h} className="flex items-start gap-3 text-[0.88rem] text-navy leading-normal">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-2" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {area.slug === 'property-title-verification-due-diligence' && (
                <section className="border-t border-navy/10 pt-8 mb-10" aria-labelledby="title-review-guide">
                  <h3 id="title-review-guide" className="font-serif text-[1.45rem] font-semibold text-navy mb-4">
                    Starting a property title review in Panvel or Navi Mumbai
                  </h3>
                  <p className="text-[0.95rem] text-navy/80 leading-[1.8] mb-5">
                    A flat, a CIDCO leasehold property and agricultural land can call for different ownership, registration and authority records. The first step is to identify the exact asset and the proposed transaction before deciding which records need checking.
                  </p>
                  <h4 className="font-semibold text-navy mb-3">Information to keep ready for an initial discussion</h4>
                  <ul className="list-disc pl-5 space-y-2 text-[0.9rem] text-navy/80 leading-[1.7] mb-7">
                    <li>Property location and identifier, such as a flat number, survey number or CTS number.</li>
                    <li>Available earlier deeds, agreements, allotment papers and the seller's present title document.</li>
                    <li>Relevant revenue or property-card extracts, society or CIDCO records, and project details if applicable.</li>
                    <li>Your transaction stage and any date by which you need the review.</li>
                  </ul>
                  <h4 className="font-semibold text-navy mb-3">Where public records can be checked</h4>
                  <p className="text-[0.9rem] text-navy/80 leading-[1.7] mb-3">
                    Maharashtra's official land-records, registration and project portals provide useful starting points. A portal result should be read with the other documents and the particular transaction.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-[0.9rem] text-navy/80 leading-[1.7] mb-7">
                    <li><a href="https://bhulekh.mahabhumi.gov.in/" target="_blank" rel="noopener noreferrer" className="text-navy underline hover:text-gold">Maharashtra land records (Mahabhulekh)</a> for available 7/12 or property-card information.</li>
                    <li><a href="https://igrmaharashtra.gov.in/Home" target="_blank" rel="noopener noreferrer" className="text-navy underline hover:text-gold">Department of Registration and Stamps</a> for registered-document search services.</li>
                    <li><a href="https://maharera.maharashtra.gov.in/" target="_blank" rel="noopener noreferrer" className="text-navy underline hover:text-gold">MahaRERA</a> for relevant registered-project information.</li>
                  </ul>
                  <nav aria-label="Related property guidance" className="bg-cream p-5 border border-navy/10">
                    <h4 className="font-semibold text-navy mb-3">Explore related matters</h4>
                    <ul className="list-disc pl-5 space-y-2 text-[0.9rem]">
                      <li><Link to="/expertise/property-transactions-conveyancing/" className="text-navy underline hover:text-gold">Property transactions and conveyancing</Link></li>
                      <li><Link to="/expertise/naina-town-planning-scheme-services/" className="text-navy underline hover:text-gold">NAINA town planning matters</Link></li>
                      <li><Link to="/expertise/rera-maharera-legal-services/" className="text-navy underline hover:text-gold">RERA and MahaRERA matters</Link></li>
                      <li><Link to="/insights/property-title-search-legal-due-diligence/" className="text-navy underline hover:text-gold">Read the property title due diligence guide</Link></li>
                    </ul>
                  </nav>
                </section>
              )}

              {area.slug === 'naina-town-planning-scheme-services' && (
                <section className="border-t border-navy/10 pt-8 mb-10" aria-labelledby="naina-preparation-guide">
                  <h3 id="naina-preparation-guide" className="font-serif text-[1.45rem] font-semibold text-navy mb-4">
                    Check the scheme and plot records before discussing a NAINA matter
                  </h3>
                  <p className="text-[0.95rem] text-navy/80 leading-[1.8] mb-5">
                    CIDCO publishes separate plans, notices and plot tables for different NAINA town planning schemes. Identifying the relevant scheme and its current stage helps us compare the land records with the correct original and final plot material.
                  </p>
                  <h4 className="font-semibold text-navy mb-3">Details to keep ready</h4>
                  <ul className="list-disc pl-5 space-y-2 text-[0.9rem] text-navy/80 leading-[1.7] mb-7">
                    <li>Village, taluka, survey and hissa numbers, land area and any known TPS or original plot number.</li>
                    <li>Available 7/12 extracts, mutation entries, title documents and earlier scheme correspondence.</li>
                    <li>Any CIDCO notice, hearing date, plot plan, valuation statement or proposed final plot particulars.</li>
                    <li>The question you need resolved: plot identity, area, access, contribution, compensation or a pending response.</li>
                  </ul>
                  <p className="text-[0.9rem] text-navy/80 leading-[1.7] mb-6">
                    <a href="https://cidco.maharashtra.gov.in/Page?Token=D4AAA8D3366" target="_blank" rel="noopener noreferrer" className="text-navy underline hover:text-gold">CIDCO's NAINA information hub</a> lists scheme-specific documents. Match the scheme number and notice date to your property; a plan from a different scheme may not answer your question.
                  </p>
                  <nav aria-label="Related NAINA guidance" className="bg-cream p-5 border border-navy/10">
                    <h4 className="font-semibold text-navy mb-3">Related guidance</h4>
                    <ul className="list-disc pl-5 space-y-2 text-[0.9rem]">
                      <li><Link to="/insights/naina-town-planning-scheme-rights/" className="text-navy underline hover:text-gold">Read about original and final plots</Link></li>
                      <li><Link to="/expertise/property-title-verification-due-diligence/" className="text-navy underline hover:text-gold">Property title and document review</Link></li>
                      <li><Link to="/expertise/navi-mumbai-airport-land-transactions/" className="text-navy underline hover:text-gold">Airport corridor land transactions</Link></li>
                    </ul>
                  </nav>
                </section>
              )}

              {area.slug === 'land-acquisition-compensation-matters' && (
                <section className="border-t border-navy/10 pt-8 mb-10" aria-labelledby="acquisition-preparation-guide">
                  <h3 id="acquisition-preparation-guide" className="font-serif text-[1.45rem] font-semibold text-navy mb-4">
                    Received a land acquisition notice in Panvel or Raigad?
                  </h3>
                  <p className="text-[0.95rem] text-navy/80 leading-[1.8] mb-5">
                    The notice, issuing authority and stage of the process determine which records need review. Keep the notice and its dates available when describing the matter; the next step depends on the particular project and papers.
                  </p>
                  <h4 className="font-semibold text-navy mb-3">Information for an initial review</h4>
                  <ul className="list-disc pl-5 space-y-2 text-[0.9rem] text-navy/80 leading-[1.7] mb-7">
                    <li>The complete notice, notification or award, including its date, authority and any response deadline.</li>
                    <li>Village and survey or hissa numbers, total land area and the area stated to be affected.</li>
                    <li>Available title deeds, 7/12 extracts, mutation entries, measurement plans and correspondence.</li>
                    <li>Records of structures, crops, trees, tenancy or other interests that may be relevant to your enquiry.</li>
                  </ul>
                  <p className="text-[0.9rem] text-navy/80 leading-[1.7] mb-6">
                    The <a href="https://raigad.gov.in/en/land-acquisition-department/" target="_blank" rel="noopener noreferrer" className="text-navy underline hover:text-gold">Raigad District Land Acquisition Department</a> publishes project and notification information. Check any public record against the exact notice received; a listing alone does not establish your entitlement or the applicable deadline.
                  </p>
                  <nav aria-label="Related land acquisition guidance" className="bg-cream p-5 border border-navy/10">
                    <h4 className="font-semibold text-navy mb-3">Related guidance</h4>
                    <ul className="list-disc pl-5 space-y-2 text-[0.9rem]">
                      <li><Link to="/insights/land-acquisition-compensation-proceedings/" className="text-navy underline hover:text-gold">Read the Raigad acquisition overview</Link></li>
                      <li><Link to="/expertise/naina-town-planning-scheme-services/" className="text-navy underline hover:text-gold">NAINA town planning matters</Link></li>
                      <li><Link to="/expertise/agricultural-non-agricultural-land-purchase/" className="text-navy underline hover:text-gold">Agricultural and non-agricultural land purchases</Link></li>
                    </ul>
                  </nav>
                </section>
              )}

              {area.slug === 'posh-compliance-internal-committee' && (
                <section className="border-t border-navy/10 pt-8 mb-10" aria-labelledby="posh-preparation-guide">
                  <h3 id="posh-preparation-guide" className="font-serif text-[1.45rem] font-semibold text-navy mb-4">
                    Preparing for a workplace POSH compliance review
                  </h3>
                  <p className="text-[0.95rem] text-navy/80 leading-[1.8] mb-5">
                    An employer's existing policy, committee order and workplace arrangements are useful starting points. A review can identify which documents or process steps need attention for that organisation, without assuming that one template fits every workplace.
                  </p>
                  <h4 className="font-semibold text-navy mb-3">Information to keep ready</h4>
                  <ul className="list-disc pl-5 space-y-2 text-[0.9rem] text-navy/80 leading-[1.7] mb-7">
                    <li>Organisation and workplace locations, with approximate workforce numbers for each location.</li>
                    <li>The current POSH policy and any communication or training materials used with staff.</li>
                    <li>Written Internal Committee order, member list and external-member appointment details, if available.</li>
                    <li>Recent committee orientation, awareness and reporting records, if available.</li>
                    <li>Any immediate procedural question or deadline that needs to be discussed.</li>
                  </ul>
                  <p className="text-[0.9rem] text-navy/80 leading-[1.7] mb-5">
                    If an active complaint is involved, first tell us that there is a live matter and any approaching date. Please do not put names, evidence or sensitive allegations in the website's enquiry form; we can discuss a suitable way to share relevant records after initial contact.
                  </p>
                  <p className="text-[0.9rem] text-navy/80 leading-[1.7] mb-6">
                    The <a href="https://www.indiacode.nic.in/handle/123456789/2104" target="_blank" rel="noopener noreferrer" className="text-navy underline hover:text-gold">official India Code text of the 2013 Act</a> is a starting point for the statutory framework. The applicable arrangement should be checked against the organisation's facts and current rules.
                  </p>
                  <nav aria-label="Related POSH guidance" className="bg-cream p-5 border border-navy/10">
                    <h4 className="font-semibold text-navy mb-3">Related workplace guidance</h4>
                    <ul className="list-disc pl-5 space-y-2 text-[0.9rem]">
                      <li><Link to="/insights/posh-compliance-employers-mumbai-navi-mumbai/" className="text-navy underline hover:text-gold">Read the employer POSH compliance guide</Link></li>
                      <li><Link to="/expertise/labour-employment-hr-workplace-compliance/" className="text-navy underline hover:text-gold">Employment and HR compliance support</Link></li>
                      <li><Link to="/partners/sonam-paul/" className="text-navy underline hover:text-gold">Meet Adv. Sonam Paul, author of the employer guide</Link></li>
                    </ul>
                  </nav>
                </section>
              )}

              {area.slug === 'labour-employment-hr-workplace-compliance' && (
                <nav aria-label="Related workplace service" className="bg-cream p-5 border border-navy/10 mb-10">
                  <h3 className="font-serif text-[1.2rem] font-semibold text-navy mb-2">Workplace POSH arrangements</h3>
                  <p className="text-[0.9rem] text-navy/80 leading-[1.7] mb-2">
                    For policy, Internal Committee or training questions, see our focused employer preparation guide.
                  </p>
                  <Link to="/expertise/posh-compliance-internal-committee/" className="text-navy underline hover:text-gold">Explore POSH compliance support</Link>
                </nav>
              )}

              {relatedArticles.length > 0 && (
                <nav aria-label="Related insights" className="border-t border-navy/10 pt-7 mb-8">
                  <h3 className="font-serif text-[1.2rem] font-semibold text-navy mb-3">Related insights</h3>
                  <ul className="list-disc pl-5 space-y-2 text-[0.9rem]">
                    {relatedArticles.map(item => (
                      <li key={item.slug}>
                        <Link to={`/insights/${item.slug}/`} className="text-navy underline decoration-gold/60 underline-offset-4 hover:text-gold">{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              
              <div className="flex flex-wrap gap-4 items-center">
                <Link to="/contact/" className="btn-primary inline-block">
                  Discuss Your {area.title} Matter
                </Link>
                <a href="tel:+917977063567" className="btn-outline-navy inline-block">Call +91 7977063567</a>
              </div>
            </article>

          </div>
        </div>
      </section>

      <CredentialsBar />
    </>
  );
};

export default ExpertiseDetail;
