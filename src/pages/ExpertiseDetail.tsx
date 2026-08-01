import React, { useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PRACTICE_AREAS } from 'data';
import CredentialsBar from 'components/ui/CredentialsBar';

const ExpertiseDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sidebarSearch, setSidebarSearch] = useState("");

  // Find the selected practice area based on the URL slug or ID
  const area = PRACTICE_AREAS.find(
    (p) => p.slug === slug || p.id === slug
  );

  // Filter sidebar areas for UX
  const filteredSidebarAreas = useMemo(() => {
    return PRACTICE_AREAS.filter((a) =>
      a.title.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
      a.shortDesc.toLowerCase().includes(sidebarSearch.toLowerCase())
    );
  }, [sidebarSearch]);

  // If slug doesn't match any practice area, redirect cleanly
  if (!area) {
    return <Navigate to="/expertise" replace />;
  }

  return (
    <>
      {/* ══ HERO (Individual Page H1 for SEO) ══ */}
      <section className="page-hero-wrapper" aria-label={`${area.title} hero`}>
        <div className="absolute inset-0 bg-page-hero-radial z-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-page-grid-lines z-0" aria-hidden="true" />
        <div className="relative z-10 max-w-[800px] animate-pageFadeIn">
          <div className="eyebrow-row">
            <Link to="/expertise" className="eyebrow-text hover:underline text-gold">
              ← All Practice Areas
            </Link>
          </div>
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
            
            {/* Sidebar Navigation with Semantic Internal Links for Crawlers */}
            <nav className="lg:sticky lg:top-[calc(72px+2rem)] bg-white border border-navy/10 p-5 rounded-sm shadow-2xs" aria-label="Practice areas index">
              <div className="text-2xs font-semibold tracking-[0.22em] uppercase text-navy mb-3 pb-2 border-b border-navy/15 flex justify-between items-center">
                <span>Services Index</span>
                <span className="text-gold font-sans font-bold text-[0.75rem]">({PRACTICE_AREAS.length})</span>
              </div>

              {/* Sidebar Search */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Filter practice areas..."
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  className="w-full text-[0.82rem] px-3 py-2 bg-cream/50 text-navy border border-navy/10 rounded-xs focus:outline-hidden focus:border-gold/50 font-sans"
                />
                {sidebarSearch && (
                  <button
                    onClick={() => setSidebarSearch("")}
                    className="absolute right-2.5 top-2.5 text-navy/40 hover:text-navy text-xs cursor-pointer border-none bg-transparent"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Crawlable Sidebar Links */}
              <ul className="list-none flex flex-col gap-0.5 m-0 p-0 max-h-[460px] overflow-y-auto pr-1 subtle-scrollbar">
                {filteredSidebarAreas.map((item) => {
                  const active = item.id === area.id || item.slug === slug;
                  return (
                    <li key={item.id}>
                      <Link
                        to={`/expertise/${item.slug || item.id}`}
                        className={`group flex items-center gap-3 w-full text-left px-3 py-2.5 text-[0.82rem] border transition-all duration-200 font-sans rounded-xs no-underline
                          ${active ? "bg-navy text-cream border-navy font-semibold" : "bg-transparent text-muted border-transparent hover:bg-navy/5 hover:text-navy"}`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 transition-colors duration-200 ${active ? "bg-gold text-navy" : "bg-navy/5 text-navy/70 group-hover:bg-navy/10"}`}>
                          {item.icon}
                        </div>
                        <span className="flex-1 truncate">{item.title}</span>
                        <span className={`text-gold text-xs transition-all duration-200 ${active ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} aria-hidden="true">→</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Main Area Content Panel */}
            <article className="bg-white border border-navy/10 p-10 min-h-[560px] shadow-sm">
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
              
              <Link to="/contact" className="btn-primary inline-block">
                Discuss Your {area.title} Matter
              </Link>
            </article>

          </div>
        </div>
      </section>

      <CredentialsBar />
    </>
  );
};

export default ExpertiseDetail;