import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimateIn from 'components/ui/AnimateIn';
import CredentialsBar from 'components/ui/CredentialsBar';
import SectionHeader from 'components/ui/SectionHeader';
import { PRACTICE_AREAS } from 'data';

const ITEMS_PER_PAGE = 9;

const Expertise: React.FC = () => {
  const [visibleGridCount, setVisibleGridCount] = useState(ITEMS_PER_PAGE);

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
            Explore our specialized practice areas across commercial disputes, property transactions, corporate compliance, and personal law.
          </p>
        </div>
      </section>

      {/* ══ ALL AREAS GRID WITH SEO-FRIENDLY LINKS ══ */}
      <section className="bg-navy py-28 px-[5vw]" aria-labelledby="all-areas-heading">
        <div className="max-w-8xl mx-auto">
          <SectionHeader
            eyebrow="Full Overview"
            title={<>All Practice <em>Areas</em></>}
            subtitle="Select a practice area to view specialized legal services and expertise."
            centered light
          />

          {/* Practice Areas Grid using Semantic Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-14 border border-gold/20 divide-x divide-y divide-gold/10">
            {PRACTICE_AREAS.slice(0, visibleGridCount).map((area, i) => (
              <AnimateIn key={area.id} delay={(i % ITEMS_PER_PAGE) * 0.05}>
                <Link
                  to={`/expertise/${area.slug || area.id}`}
                  className="group flex flex-col text-left bg-navy-deep p-8 w-full no-underline relative overflow-hidden transition-colors duration-300 hover:bg-navy-mid h-full block"
                >
                  <div className="absolute left-0 top-0 w-[3px] h-full bg-gold scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-400" aria-hidden="true" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-lg">{area.icon}</div>
                    <span className="text-2xs font-bold text-gold/50">{(i + 1) < 10 ? `0${i + 1}` : i + 1}</span>
                  </div>
                  <h3 className="font-serif text-[1.12rem] font-semibold text-cream mb-3">{area.title}</h3>
                  <p className="text-[0.85rem] text-cream/55 leading-[1.7] flex-1">{area.shortDesc}</p>
                  <span className="btn-ghost mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[0.72rem]">View Details →</span>
                </Link>
              </AnimateIn>
            ))}
          </div>

          {/* Show More / Collapse Controls */}
          <div className="mt-12 text-center flex justify-center gap-4">
            {visibleGridCount < PRACTICE_AREAS.length && (
              <button
                onClick={() => setVisibleGridCount((prev) => Math.min(prev + ITEMS_PER_PAGE, PRACTICE_AREAS.length))}
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
            Our team will assess your situation and connect you with the right advocate.
          </p>
          <Link to="/contact" className="btn-primary inline-block">Book a Consultation</Link>
        </div>
      </section>

      <CredentialsBar />
    </>
  );
};

export default Expertise;