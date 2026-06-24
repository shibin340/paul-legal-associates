import React from "react";
import { Link } from "react-router-dom";
import AnimateIn from "../components/ui/AnimateIn";
import SectionHeader from "../components/ui/SectionHeader";
import CredentialsBar from "../components/ui/CredentialsBar";
import {
  STATS, PRACTICE_AREAS, TESTIMONIALS, TEAM_MEMBERS,
  ABOUT_HIGHLIGHTS, VALUES, TAGLINE, FIRM_HEADLINE, FIRM_DESC
} from "../data";
import CadastralMap from "components/ui/CadastralMap";

const Home: React.FC = () => (
  <>
    {/* ══ HERO ══ */}
    <section className="relative min-h-screen flex items-center overflow-hidden px-[5vw] bg-hero-radial" aria-label="Hero">

      {/* Global grid line texture spanning 100% of the screen width */}
      <div className="absolute inset-0 bg-grid-lines z-0 animate-gridDrift pointer-events-none" aria-hidden="true" />

      {/* Right-side map panel — Visible on tablet, automatically optimized */}
      <div
        className="hidden lg:block absolute top-0 right-0 bottom-0 w-[48%] xl:w-[52%] z-0"
        style={{
          // Fades out slightly tighter (starting at 15%) to make room for the tablet text column
          maskImage: "linear-gradient(to right, transparent 15%, black 55%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 15%, black 55%)"
        }}
      >
        {/* The map component */}
        <CadastralMap />

        {/* Unified grid overlay */}
        <div className="absolute inset-0 bg-grid-lines opacity-30 z-10 animate-gridDrift pointer-events-none" aria-hidden="true" />
      </div>

      {/* Left Content Column */}
      <div className="relative z-10 max-w-[500px] xl:max-w-[720px]">
        {/* Main headline */}
        <h1 className="font-serif font-bold text-cream leading-[1.12] mb-4 animate-heroFadeUp animation-delay-350"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 3rem)" }}>
          {FIRM_HEADLINE.split("•").map((part, i, arr) => (
            <span key={i}>
              <span className={i === 1 ? "text-gold" : ""}>{part.trim()}</span>
              {i < arr.length - 1 && <span className="text-gold mx-3">•</span>}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <p className="font-serif-alt text-[1.35rem] font-light text-gold/90 italic mb-3 animate-heroFadeUp animation-delay-500">
          {TAGLINE}
        </p>

        {/* Description */}
        <p className="font-sans text-[1rem] text-cream/70 mb-10 animate-heroFadeUp animation-delay-500">
          {FIRM_DESC}
        </p>

        {/* Call to Actions */}
        <div className="flex gap-5 flex-wrap animate-heroFadeUp animation-delay-650">
          <Link to="/contact" className="btn-primary">Schedule a Consultation</Link>
          <Link to="/expertise" className="btn-secondary">Our Practice Areas →</Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#stats" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 no-underline animate-heroFadeUp animation-delay-1000" aria-label="Scroll down">
        <span className="text-[0.6rem] tracking-[0.22em] uppercase text-cream/40">Scroll</span>
        <div className="w-px h-10 bg-gold animate-scrollPulse" />
      </a>
    </section>

    {/* ══ CREDENTIALS BAR ══ */}
    <CredentialsBar />

    {/* ══ STATS ══ */}
    <div id="stats" className="grid grid-cols-2 lg:grid-cols-4 bg-navy-deep border-b border-gold/20" role="region" aria-label="Firm statistics">
      {STATS.map((s, i) => (
        <AnimateIn key={s.label} delay={i * 0.1}
          className={`text-center py-10 px-4 ${i < STATS.length - 1 ? "border-r border-gold/15" : ""}`}>
          <div className="font-serif text-[2.6rem] font-bold text-gold leading-none mb-1">{s.value}</div>
          <div className="text-2xs tracking-[0.18em] uppercase text-cream/50">{s.label}</div>
        </AnimateIn>
      ))}
    </div>

    {/* ══ WHO WE ARE ══ */}
    <section className="bg-cream py-28 px-[5vw]" aria-labelledby="who-we-are">
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left text */}
        <AnimateIn direction="left">
          <div className="eyebrow-row">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">Who We Are</span>
          </div>
          <h2 id="who-we-are" className="section-title mb-3" style={{ fontSize: "clamp(2.2rem,4vw,3.5rem)" }}>
            A full-service law firm<br />
            <em>based in Navi Mumbai,</em>
          </h2>
          <p className="font-serif-alt text-[1.15rem] text-gold font-medium italic mb-8">
            serving a dynamic legal and business environment.
          </p>
          <div className="flex flex-col gap-5">
            {ABOUT_HIGHLIGHTS.map((h, i) => (
              <div key={i} className="flex items-start gap-4 p-4 border-l-2 border-gold/30 hover:border-gold transition-colors duration-300">
                <span className="text-[1.4rem] flex-shrink-0">{h.icon}</span>
                <div>
                  <div className="font-semibold text-navy text-[0.95rem] mb-0.5">{h.title}</div>
                  <div className="text-[0.88rem] text-muted">{h.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-5 flex-wrap mt-8">
            <Link to="/about" className="btn-outline-navy">Learn More About Us</Link>
            <Link to="/contact" className="btn-primary">Get in Touch</Link>
          </div>
        </AnimateIn>

        {/* Right — team photos strip */}
        <AnimateIn direction="right" delay={0.15}>
          <div className="relative">
            {/* Background accent */}
            <div className="absolute -top-4 -right-4 w-full h-full bg-navy/10 rounded-none" aria-hidden="true" />
            <div className="relative bg-navy p-8">
              <p className="font-serif-alt italic text-gold text-[1rem] mb-6 text-center">
                "Enduring Values. <span className="font-semibold">Delivering Results.</span>"
              </p>
              <div className="grid grid-cols-3 gap-4">
                {TEAM_MEMBERS.map(m => (
                  <div key={m.id} className="flex flex-col items-center gap-2">
                    <div className="w-full aspect-[3/4] overflow-hidden border-2 border-gold/30">
                      <img src={m.photo} alt={m.name} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center">
                      <div className="text-[0.7rem] font-semibold text-cream leading-tight">{m.name}</div>
                      <div className="text-[0.6rem] text-gold">{m.title}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-gold/20 flex flex-wrap justify-center gap-6">
                {["Full-Service", "Litigation", "Advisory", "Business-Focused"].map(tag => (
                  <div key={tag} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    <span className="text-2xs tracking-[0.1em] uppercase text-cream/50">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>

    {/* ══ PRACTICE AREAS ══ */}
    <section className="bg-navy py-28 px-[5vw]" aria-labelledby="practice-heading">
      <div className="max-w-8xl mx-auto">
        <SectionHeader
          eyebrow="Practice Areas"
          title={<>Integrated Legal Support Across <em>All Disciplines</em></>}
          subtitle="Integrated legal support across disputes, transactions and compliance."
          centered light
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-14 border border-gold/20 divide-x divide-y divide-gold/10">
          {PRACTICE_AREAS.map((area, i) => (
            <AnimateIn key={area.id} delay={i * 0.07}>
              <Link to={`/expertise#${area.id}`}
                className="group block bg-navy-deep p-8 no-underline relative overflow-hidden transition-colors duration-300 hover:bg-navy-mid h-full">
                <div className="absolute left-0 top-0 w-[3px] h-full bg-gold scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-400" aria-hidden="true" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-lg flex-shrink-0">
                    {area.icon}
                  </div>
                  <div className="text-2xs font-semibold tracking-[0.1em] uppercase text-gold">{`0${i + 1}`}</div>
                </div>
                <h3 className="font-serif text-[1.15rem] font-semibold text-cream mb-3">{area.title}</h3>
                <p className="text-[0.85rem] text-cream/60 leading-[1.7]">{area.shortDesc}</p>
                <span className="btn-ghost mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[0.72rem]">Explore →</span>
              </Link>
            </AnimateIn>
          ))}
        </div>
        <AnimateIn className="text-center mt-10">
          <Link to="/expertise" className="btn-secondary">View All Practice Areas</Link>
        </AnimateIn>
      </div>
    </section>

    {/* ══ WHY PAUL LEGAL ══ */}
    <section className="bg-cream py-28 px-[5vw]" aria-labelledby="why-heading">
      <div className="max-w-8xl mx-auto">
        <AnimateIn>
          <div className="eyebrow-row">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">Why Choose Us</span>
          </div>
          <h2 id="why-heading" className="section-title mb-2" style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}>
            Why Paul Legal Associates
          </h2>
          <p className="font-serif-alt text-gold font-medium italic text-[1.1rem] mb-12">
            Strategic counsel rooted in enduring values.
          </p>
        </AnimateIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {VALUES.map((v, i) => (
            <AnimateIn key={v.title} delay={i * 0.08}>
              <div className="p-8 h-full border border-navy/10 bg-white hover:border-gold/50 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center text-xl mb-5">
                  {v.icon}
                </div>
                <h3 className="font-serif text-[1.1rem] font-semibold text-navy mb-3">{v.title}</h3>
                <p className="text-[0.88rem] text-muted leading-[1.75]">{v.desc}</p>
              </div>
            </AnimateIn>
          ))}
          {/* Quote card */}
          <AnimateIn delay={VALUES.length * 0.08}>
            <div className="p-8 h-full bg-navy flex flex-col justify-between min-h-[200px]">
              <div className="text-[3rem] text-gold/30 font-serif leading-none mb-3">"</div>
              <p className="font-serif-alt italic text-cream/90 text-[1.05rem] leading-[1.7] flex-1">
                Clarity in strategy. Precision in execution.
              </p>
              <p className="text-gold text-[0.75rem] mt-4 tracking-[0.1em] uppercase">Paul Legal Associates</p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>

    {/* ══ TESTIMONIALS ══ */}
    <section className="bg-navy-deep py-28 px-[5vw]" aria-labelledby="testimonials-heading">
      <div className="max-w-8xl mx-auto">
        <SectionHeader
          eyebrow="Client Stories"
          title={<>What Our Clients <em>Say</em></>}
          centered light
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {TESTIMONIALS.map((t, i) => (
            <AnimateIn key={t.id} delay={i * 0.12}>
              <blockquote className="h-full bg-navy border border-gold/20 p-8 hover:-translate-y-1 hover:border-gold/50 transition-all duration-300">
                <div className="text-[4rem] leading-none text-gold/25 font-serif mb-[-1rem] select-none">"</div>
                <p className="font-serif-alt font-light text-cream/90 leading-[1.8] italic text-[1rem] mb-6">{t.quote}</p>
                <footer className="border-t border-gold/15 pt-4">
                  <div className="text-[0.88rem] font-semibold text-cream">{t.author}</div>
                  <div className="text-[0.75rem] text-gold mt-0.5">{t.matter}</div>
                </footer>
              </blockquote>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>

    {/* ══ CTA BANNER ══ */}
    <section className="relative bg-navy border-t border-gold/20 py-24 px-[5vw] text-center overflow-hidden" aria-labelledby="cta-heading">
      <div className="absolute inset-0 bg-cta-radial pointer-events-none" aria-hidden="true" />
      <AnimateIn className="relative z-10 max-w-[680px] mx-auto">
        <h2 id="cta-heading" className="font-serif font-bold text-cream leading-[1.2] mb-4"
          style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
          Let's Build a <em className="not-italic italic text-gold">Stronger Legal Position</em>
        </h2>
        <p className="font-serif-alt font-light text-cream/70 text-[1.1rem] mb-3">
          Connect with Paul Legal Associates for strategic legal support.
        </p>
        <p className="text-[0.8rem] tracking-[0.1em] text-gold/60 italic mb-8">
          Precision in Law. Clarity in Counsel. Confidence in Outcomes.
        </p>
        <div className="flex gap-5 justify-center flex-wrap">
          <Link to="/contact" className="btn-primary">Schedule Consultation</Link>
          <Link to="/partners" className="btn-secondary">Meet Our Partners</Link>
        </div>
      </AnimateIn>
    </section>

    <CredentialsBar />
  </>
);

export default Home;
