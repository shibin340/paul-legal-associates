import AnimateIn from 'components/ui/AnimateIn';
import CredentialsBar from 'components/ui/CredentialsBar';
import SectionHeader from 'components/ui/SectionHeader';
import { PRACTICE_AREAS } from 'data';
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { PracticeArea } from 'types';

const ITEMS_PER_PAGE = 9;

const Expertise: React.FC = () => {
  const [selected, setSelected] = useState<PracticeArea>(PRACTICE_AREAS[0]);
  const [animKey, setAnimKey] = useState(0);
  
  // UX Optimization States
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [visibleGridCount, setVisibleGridCount] = useState(ITEMS_PER_PAGE);
  
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const found = PRACTICE_AREAS.find(p => p.id === location.hash.replace("#", ""));
      if (found) { 
        setSelected(found); 
        setAnimKey(k => k + 1); 
        setTimeout(() => document.getElementById("area-detail")?.scrollIntoView({ behavior: "smooth", block: "start" }), 300); 
      }
    }
  }, [location.hash]);

  const handleSelect = (area: PracticeArea) => { 
    setSelected(area); 
    setAnimKey(k => k + 1); 
  };

  // Memoized Sidebar Filtering to protect performance
  const filteredSidebarAreas = useMemo(() => {
    return PRACTICE_AREAS.filter(area => 
      area.title.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
      area.shortDesc.toLowerCase().includes(sidebarSearch.toLowerCase())
    );
  }, [sidebarSearch]);

  return (
    <>
      {/* ══ HERO ══ */}
      <section className="page-hero-wrapper" aria-label="Expertise hero">
        <div className="absolute inset-0 bg-page-hero-radial z-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-page-grid-lines z-0" aria-hidden="true" />
        <div className="relative z-10 max-w-[800px] animate-pageFadeIn">
          <div className="eyebrow-row">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">Practice Areas</span>
          </div>
          <h1 className="font-serif font-bold text-cream leading-[1.1] mt-3 mb-5" style={{ fontSize: "clamp(2.4rem,5vw,4rem)" }}>
            Integrated Legal Support<br /><em className="not-italic italic text-gold">Across All Disciplines</em>
          </h1>
          <p className="font-serif-alt font-light text-cream/70 leading-[1.8] text-[1.15rem] max-w-[600px]">
            Integrated legal support across disputes, transactions and compliance.
          </p>
        </div>
      </section>

      {/* ══ INTERACTIVE EXPLORER ══ */}
      <section className="bg-cream py-28 px-[5vw]" aria-labelledby="explorer-heading">
        <div className="max-w-8xl mx-auto">
          <h2 id="explorer-heading" className="sr-only">Practice Area Explorer</h2>
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 items-start">
            
            {/* Optimized Sidebar Nav Container */}
            <nav className="lg:sticky lg:top-[calc(72px+2rem)] bg-white border border-navy/10 p-5 rounded-sm shadow-2xs" aria-label="Practice areas">
              <div className="text-2xs font-semibold tracking-[0.22em] uppercase text-navy mb-3 pb-2 border-b border-navy/15 flex justify-between items-center">
                <span>Services Index</span>
                <span className="text-gold font-sans font-bold text-[0.75rem] normal-case tracking-normal">({PRACTICE_AREAS.length})</span>
              </div>
              
              {/* Sidebar Inline Filter input */}
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

              {/* Scrollable Nav Track */}
              <ul className="list-none flex flex-col gap-0.5 m-0 p-0 max-h-[460px] overflow-y-auto pr-1 subtle-scrollbar">
                {filteredSidebarAreas.length > 0 ? (
                  filteredSidebarAreas.map((area) => {
                    const active = selected.id === area.id;
                    return (
                      <li key={area.id}>
                        <button
                          onClick={() => handleSelect(area)}
                          aria-current={active ? "true" : undefined}
                          className={`group flex items-center gap-3 w-full text-left px-3 py-2.5 text-[0.82rem] border transition-all duration-200 cursor-pointer font-sans rounded-xs
                            ${active ? "bg-navy text-cream border-navy font-semibold" : "bg-transparent text-muted border-transparent hover:bg-navy/5 hover:text-navy"}`}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 transition-colors duration-200 ${active ? "bg-gold text-navy" : "bg-navy/5 text-navy/70 group-hover:bg-navy/10"}`}>
                            {area.icon}
                          </div>
                          <span className="flex-1 truncate">{area.title}</span>
                          <span className={`text-gold text-xs transition-all duration-200 ${active ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} aria-hidden="true">→</span>
                        </button>
                      </li>
                    );
                  })
                ) : (
                  <li className="text-[0.82rem] text-muted/60 italic py-4 text-center">No matching domains found.</li>
                )}
              </ul>
            </nav>

            {/* Detail panel */}
            <div id="area-detail" key={animKey} className="bg-white border border-navy/10 p-10 min-h-[560px] animate-detailFade shadow-sm" aria-live="polite">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center text-2xl flex-shrink-0">{selected.icon}</div>
                <div>
                  <div className="eyebrow-row mb-1">
                    <div className="eyebrow-line" />
                    <span className="eyebrow-text">Practice Area</span>
                  </div>
                  <h2 className="font-serif font-semibold text-navy leading-tight" style={{ fontSize: "clamp(1.5rem,2.5vw,2rem)" }}>
                    {selected.title}
                  </h2>
                </div>
              </div>

              <p className="font-serif-alt text-[1.1rem] text-navy/80 leading-[1.8] mb-5">{selected.shortDesc}</p>
              <div className="h-px bg-navy/10 mb-5" aria-hidden="true" />
              <p className="text-[0.92rem] text-muted leading-[1.85] mb-7">{selected.fullDesc}</p>

              <div className="text-2xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">Key Services</div>
              <ul className="list-none grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-10">
                {selected.highlights.map((h: any) => (
                  <li key={h} className="flex items-start gap-3 text-[0.88rem] text-navy leading-normal">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-2" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary inline-block">Discuss Your Matter</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ALL AREAS GRID WITH EXPANSION CONTROLS ══ */}
      <section className="bg-navy py-28 px-[5vw]" aria-labelledby="all-areas-heading">
        <div className="max-w-8xl mx-auto">
          <SectionHeader
            eyebrow="Full Overview"
            title={<>All Practice <em>Areas</em></>}
            subtitle="Comprehensive legal support tailored to your unique situation."
            centered light
          />
          
          {/* Main Grid — Sliced dynamically based on visibility status */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-14 border border-gold/20 divide-x divide-y divide-gold/10">
            {PRACTICE_AREAS.slice(0, visibleGridCount).map((area, i) => (
              <AnimateIn key={area.id} delay={(i % ITEMS_PER_PAGE) * 0.05}>
                <button
                  onClick={() => { handleSelect(area); window.scrollTo({ top: document.getElementById("explorer-heading")?.offsetTop || 400, behavior: "smooth" }); }}
                  aria-label={`View ${area.title} details`}
                  className="group flex flex-col text-left bg-navy-deep p-8 w-full border-none cursor-pointer relative overflow-hidden transition-colors duration-300 hover:bg-navy-mid h-full"
                >
                  <div className="absolute left-0 top-0 w-[3px] h-full bg-gold scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-400" aria-hidden="true" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-lg">{area.icon}</div>
                    {/* Preserved incremental numbering */}
                    <span className="text-2xs font-bold text-gold/50">{(i + 1) < 10 ? `0${i + 1}` : i + 1}</span>
                  </div>
                  <h3 className="font-serif text-[1.12rem] font-semibold text-cream mb-3">{area.title}</h3>
                  <p className="text-[0.85rem] text-cream/55 leading-[1.7] flex-1">{area.shortDesc}</p>
                  <span className="btn-ghost mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[0.72rem]">Explore →</span>
                </button>
              </AnimateIn>
            ))}
          </div>

          {/* Show More/Less Controls */}
          <div className="mt-12 text-center flex justify-center gap-4">
            {visibleGridCount < PRACTICE_AREAS.length && (
              <button
                onClick={() => setVisibleGridCount(prev => Math.min(prev + ITEMS_PER_PAGE, PRACTICE_AREAS.length))}
                className="btn-primary cursor-pointer"
              >
                Show More Practice Areas ({PRACTICE_AREAS.length - visibleGridCount} Remaining)
              </button>
            )}
            {visibleGridCount > ITEMS_PER_PAGE && (
              <button
                onClick={() => {
                  setVisibleGridCount(ITEMS_PER_PAGE);
                  document.getElementById("all-areas-heading")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 border border-gold/40 text-gold hover:bg-gold/10 text-[0.88rem] uppercase font-semibold tracking-wider transition-all duration-300 cursor-pointer bg-transparent"
              >
                Collapse Grid
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="bg-cream border-t border-navy/10 py-24 px-[5vw]" aria-labelledby="expertise-cta">
        <div className="max-w-8xl mx-auto max-w-[640px] text-center">
          <h2 id="expertise-cta" className="section-title mb-4">
            Not Sure Where Your Matter <em>Fits?</em>
          </h2>
          <p className="section-subtitle mb-10">
            Our team will assess your situation and connect you with the right specialist.
          </p>
          <Link to="/contact" className="btn-primary inline-block">Book a Consultation</Link>
        </div>
      </section>

      <CredentialsBar />
    </>
  );
};

export default Expertise;