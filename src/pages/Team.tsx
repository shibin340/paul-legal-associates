import React from "react";
import { Link } from "react-router-dom";
import AnimateIn from "../components/ui/AnimateIn";
import SectionHeader from "../components/ui/SectionHeader";
import CredentialsBar from "../components/ui/CredentialsBar";
import { TEAM_MEMBERS } from "../data";
import type { TeamMember } from "../types";
import { useDocumentTitle } from "hooks/useDocumentTitle";

const TeamCard: React.FC<{ member: TeamMember; delay: number }> = ({ member, delay }) => (
  <AnimateIn delay={delay}>
    <Link
      to={`/partners/${member.slug}`}
      className="group block w-full text-left border transition-all duration-300 bg-white no-underline border-navy/10 hover:border-gold hover:shadow-gold hover:scale-[1.02]"
    >
      {/* Photo */}
      <div className="relative overflow-hidden" style={{ height: "320px" }}>
        <img
          src={member.photo}
          loading="lazy"
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-navy/60 flex items-end p-6 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <p className="font-serif-alt italic text-gold text-[0.9rem] leading-snug">
            "{member.tagline}"
          </p>
        </div>
      </div>
      {/* Info */}
      <div className="p-6 border-t border-navy/8">
        <div className="text-2xs font-semibold tracking-[0.15em] uppercase mb-1 text-gold/80 group-hover:text-gold transition-colors duration-300">
          {member.title}
        </div>
        <h3 className="font-serif text-[1.2rem] font-semibold text-navy mb-1 group-hover:text-navy-light transition-colors">
          {member.name}
        </h3>
        <div className="text-[0.8rem] text-muted mb-4">
          {member.experience} · {member.specialisation}
        </div>
        <span className="text-[0.78rem] font-semibold tracking-wider text-navy uppercase group-hover:text-gold transition-colors flex items-center gap-1">
          View Full Profile →
        </span>
      </div>
    </Link>
  </AnimateIn>
);

const Team: React.FC = () => {
  useDocumentTitle("Our Advocates & Partners | Paul Legal Associates");
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
            subtitle="Click on an advocate to explore their comprehensive background, focus areas, and representative practice."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            {TEAM_MEMBERS.map((m, i) => (
              <TeamCard key={m.id} member={m} delay={i * 0.12} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="bg-navy border-t border-gold/20 py-24 px-[5vw] text-center" aria-labelledby="team-cta">
        <AnimateIn>
          <h2 id="team-cta" className="section-title-light mb-4 mx-auto max-w-xl">
            Speak Directly with an <em>Expert Advocate</em>
          </h2>
          <p className="section-subtitle text-cream/70 mx-auto mb-10">
            Schedule a confidential consultation — review your case and define your strategic legal roadmap.
          </p>
          <div className="flex gap-5 justify-center flex-wrap">
            <Link to="/contact" className="btn-primary">Schedule Consultation</Link>
            <Link to="/expertise" className="btn-outline-navy !text-cream !border-cream/30 hover:!border-gold">Our Practice Areas</Link>
          </div>
        </AnimateIn>
      </section>

      <CredentialsBar />
    </>
  );
};

export default Team;