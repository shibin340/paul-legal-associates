import React, { useState } from "react";
import { Link } from "react-router-dom";
import AnimateIn from "../components/ui/AnimateIn";
import SectionHeader from "../components/ui/SectionHeader";
import CredentialsBar from "../components/ui/CredentialsBar";
import { TEAM_MEMBERS } from "../data";
import type { TeamMember } from "../types";

const TeamCard: React.FC<{ member: TeamMember; delay: number; onSelect: (m: TeamMember) => void; selected: boolean }> = ({ member, delay, onSelect, selected }) => (
  <AnimateIn delay={delay}>
    <button
      onClick={() => onSelect(member)}
      aria-pressed={selected}
      className="
    group w-full text-left border transition-all duration-300 cursor-pointer bg-transparent
    border-navy/10
    hover:border-gold
    hover:shadow-gold
    hover:scale-[1.02]
  "
    >
      {/* Photo */}
      <div className="relative overflow-hidden" style={{ height: "320px" }}>
        <img src={member.photo} loading="lazy" alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className={`absolute inset-0 bg-navy/60 flex items-end p-6 transition-opacity duration-300 opacity-0 group-hover:opacity-100`}>
          <p className="font-serif-alt italic text-gold text-[0.9rem] leading-snug">"{member.tagline}"</p>
        </div>
      </div>
      {/* Info */}
      <div className="bg-white p-6 border-t border-navy/8">
        <div className={`text-2xs font-semibold tracking-[0.15em] uppercase mb-1 transition-colors duration-300 ${selected ? "text-gold" : "text-gold/60 group-hover:text-gold"}`}>
          {member.title}
        </div>
        <h3 className="font-serif text-[1.15rem] font-semibold text-navy mb-1">{member.name}</h3>
        <div className="text-[0.78rem] text-muted">{member.experience} · {member.specialisation}</div>
      </div>
    </button>
  </AnimateIn>
);

const Team: React.FC = () => {
  const [selected, setSelected] = useState<TeamMember>(TEAM_MEMBERS[0]);

  return (
    <>
      {/* ══ HERO ══ */}
      <section className="page-hero-wrapper" aria-label="Team page hero">
        <div className="absolute inset-0 bg-page-hero-radial z-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-page-grid-lines z-0" aria-hidden="true" />
        <div className="relative z-10 max-w-[800px] animate-pageFadeIn">
          <div className="eyebrow-row">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">Our Advocates</span>
          </div>
          <h1 className="font-serif font-bold text-cream leading-[1.1] mt-3 mb-5" style={{ fontSize: "clamp(2.4rem,5vw,4rem)" }}>
            Meet the <em className="not-italic italic text-gold">Legal Minds</em><br />Behind Your Case
          </h1>
          <p className="font-serif-alt font-light text-cream/70 leading-[1.8] text-[1.15rem] max-w-[600px]">
            Three dedicated advocates bringing decades of combined expertise across property law, compliance, litigation and commercial advisory.
          </p>
        </div>
      </section>

      {/* ══ TEAM CARDS ══ */}
      <section className="bg-cream py-28 px-[5vw]" aria-labelledby="team-grid-heading">
        <div className="max-w-8xl mx-auto">
          <SectionHeader
            eyebrow="Our Team"
            title={<>Our <em>Partners</em></>}
            subtitle="Click on an advocate to explore their full profile."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            {TEAM_MEMBERS.map((m, i) => (
              <TeamCard key={m.id} member={m} delay={i * 0.12} onSelect={setSelected} selected={selected.id === m.id} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ SELECTED PROFILE ══ */}
      <section className="bg-navy py-24 px-[5vw]" aria-labelledby="profile-heading" aria-live="polite">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 items-start">
            {/* Photo + name block */}
            <AnimateIn key={selected.id}>
              <div className="border-2 border-gold/30 overflow-hidden" style={{ maxHeight: "480px" }}>
                <img src={selected.photo} loading="lazy" alt={selected.name} className="w-full h-full object-cover object-top" style={{ maxHeight: "400px" }} />
                <div className="bg-navy-deep p-5 border-t border-gold/20">
                  <div className="text-2xs tracking-[0.15em] uppercase text-gold mb-1">{selected.title}</div>
                  <div className="font-serif text-[1.15rem] font-semibold text-cream">{selected.name}</div>
                </div>
              </div>

              {/* Quote */}
              <div className="mt-4 p-5 border border-gold/25 bg-navy-mid">
                <div className="text-[2.5rem] text-gold/30 font-serif leading-none mb-1">"</div>
                <p className="font-serif-alt italic text-cream/80 text-[0.9rem] leading-[1.7]">{selected.quote}</p>
              </div>
            </AnimateIn>

            {/* Detail */}
            <div key={`${selected.id}-detail`} className="animate-detailFade">
              <div className="eyebrow-row mb-3">
                <div className="eyebrow-line" />
                <span className="eyebrow-text">Profile</span>
              </div>
              <h2 id="profile-heading" className="font-serif font-bold text-cream leading-tight mb-1" style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)" }}>
                {selected.name}
              </h2>
              <p className="text-gold font-medium text-[0.9rem] tracking-[0.05em] mb-1">{selected.role}</p>
              <p className="text-cream/50 text-[0.82rem] mb-6">{selected.experience}</p>

              {/* Tagline box */}
              <div className="bg-navy-deep border border-gold/20 p-6 mb-8">
                <div className="text-[2rem] text-gold/25 font-serif leading-none mb-2">"</div>
                <p className="font-serif-alt text-gold text-[1.05rem] leading-[1.7] font-medium">{selected.tagline}</p>
              </div>

              {/* Highlights */}
              <div className="text-2xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">Key Highlights</div>
              <div className="flex flex-col gap-3 mb-8">
                {selected.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-navy-mid border border-gold/10">
                    <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-gold text-[0.6rem]">✦</span>
                    </div>
                    <p className="text-[0.88rem] text-cream/75 leading-[1.7]">{h}</p>
                  </div>
                ))}
              </div>

              <Link to="/contact" className="btn-primary">Consult {selected.name.split(" ")[1]}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="bg-cream border-t border-navy/10 py-24 px-[5vw] text-center" aria-labelledby="team-cta">
        <AnimateIn>
          <h2 id="team-cta" className="section-title mb-4 mx-auto max-w-xl">
            Speak Directly with an <em>Expert Advocate</em>
          </h2>
          <p className="section-subtitle mx-auto mb-10">
            Schedule a confidential consultation — no obligation, first meeting complimentary.
          </p>
          <div className="flex gap-5 justify-center flex-wrap">
            <Link to="/contact" className="btn-primary">Schedule Consultation</Link>
            <Link to="/expertise" className="btn-outline-navy">Our Practice Areas</Link>
          </div>
        </AnimateIn>
      </section>

      <CredentialsBar />
    </>
  );
};

export default Team;
