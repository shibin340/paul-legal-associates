import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AnimateIn from "../components/ui/AnimateIn";
import SectionHeader from "../components/ui/SectionHeader";
import CredentialsBar from "../components/ui/CredentialsBar";
import { PRACTICE_AREAS } from "../data";
import type { PracticeArea } from "../types";

const Expertise: React.FC = () => {
  const [selected, setSelected] = useState<PracticeArea>(PRACTICE_AREAS[0]);
  const [animKey, setAnimKey] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const found = PRACTICE_AREAS.find(p => p.id === location.hash.replace("#", ""));
      if (found) { setSelected(found); setAnimKey(k => k + 1); setTimeout(() => document.getElementById("area-detail")?.scrollIntoView({ behavior: "smooth", block: "start" }), 300); }
    }
  }, [location.hash]);

  const handleSelect = (area: PracticeArea) => { setSelected(area); setAnimKey(k => k + 1); };

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
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
            {/* Sidebar */}
            <nav className="lg:sticky lg:top-[calc(72px+2rem)]" aria-label="Practice areas">
              <div className="text-2xs font-semibold tracking-[0.22em] uppercase text-navy mb-4 pb-3 border-b border-navy/15">
                Practice Areas
              </div>
              <ul className="list-none flex flex-col gap-0.5">
                {PRACTICE_AREAS.map((area, i) => {
                  const active = selected.id === area.id;
                  return (
                    <li key={area.id}>
                      <button
                        onClick={() => handleSelect(area)}
                        aria-current={active ? "true" : undefined}
                        className={`group flex items-center gap-3 w-full text-left px-4 py-3.5 text-[0.88rem] border transition-all duration-300 cursor-pointer font-sans
                          ${active ? "bg-navy text-cream border-navy" : "bg-transparent text-muted border-transparent hover:bg-navy/5 hover:border-navy/20 hover:text-navy"}`}
                      >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 transition-colors duration-300 ${active ? "bg-gold text-navy" : "bg-navy/10 text-navy/50 group-hover:bg-navy/15"}`}>
                          {area.icon}
                        </div>
                        <span className="flex-1 font-medium">{area.title}</span>
                        <span className={`text-gold text-sm transition-all duration-300 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} aria-hidden="true">→</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Detail panel */}
            <div id="area-detail" key={animKey} className="bg-white border border-navy/10 p-10 min-h-[500px] animate-detailFade shadow-sm" aria-live="polite">
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
              <ul className="list-none grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {selected.highlights.map(h => (
                  <li key={h} className="flex items-center gap-3 text-[0.88rem] text-navy">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary">Discuss Your Matter</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ALL AREAS GRID ══ */}
      <section className="bg-navy py-28 px-[5vw]" aria-labelledby="all-areas-heading">
        <div className="max-w-8xl mx-auto">
          <SectionHeader
            eyebrow="Full Overview"
            title={<>All Practice <em>Areas</em></>}
            subtitle="Comprehensive legal support tailored to your unique situation."
            centered light
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-14 border border-gold/20 divide-x divide-y divide-gold/10">
            {PRACTICE_AREAS.map((area, i) => (
              <AnimateIn key={area.id} delay={i * 0.07}>
                <button
                  onClick={() => { handleSelect(area); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  aria-label={`View ${area.title} details`}
                  className="group flex flex-col text-left bg-navy-deep p-8 w-full border-none cursor-pointer relative overflow-hidden transition-colors duration-300 hover:bg-navy-mid h-full"
                >
                  <div className="absolute left-0 top-0 w-[3px] h-full bg-gold scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-400" aria-hidden="true" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-lg">{area.icon}</div>
                    <span className="text-2xs font-bold text-gold/50">{`0${i + 1}`}</span>
                  </div>
                  <h3 className="font-serif text-[1.12rem] font-semibold text-cream mb-3">{area.title}</h3>
                  <p className="text-[0.85rem] text-cream/55 leading-[1.7] flex-1">{area.shortDesc}</p>
                  <span className="btn-ghost mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[0.72rem]">Explore →</span>
                </button>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="bg-cream border-t border-navy/10 py-24 px-[5vw]" aria-labelledby="expertise-cta">
        <AnimateIn className="max-w-8xl mx-auto max-w-[640px]">
          <h2 id="expertise-cta" className="section-title mb-4">
            Not Sure Where Your Matter <em>Fits?</em>
          </h2>
          <p className="section-subtitle mb-10">
            Our team will assess your situation and connect you with the right specialist — at no cost.
          </p>
          <Link to="/contact" className="btn-primary">Book a Consultation</Link>
        </AnimateIn>
      </section>

      <CredentialsBar />
    </>
  );
};

export default Expertise;
