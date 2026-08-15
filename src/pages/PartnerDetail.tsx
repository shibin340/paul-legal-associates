import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import AnimateIn from "../components/ui/AnimateIn";
import CredentialsBar from "../components/ui/CredentialsBar";
import { TEAM_MEMBERS } from "../data";
import { useDocumentTitle } from "hooks/useDocumentTitle";

const PartnerDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const member = TEAM_MEMBERS.find((m) => m.slug === slug || m.id === slug);
  useDocumentTitle(`${member ? member.name : "Advocate Profile"} - ${member?.specialisation || "Legal Expert"} | Paul Legal Associates`);

  if (!member) {
    return <Navigate to="/partners" replace />;
  }

  const otherMembers = TEAM_MEMBERS.filter((m) => m.id !== member.id);

  return (
    <>
      {/* ══ HERO (Individual Page H1 for SEO) ══ */}
      <section className="page-hero-wrapper" aria-label={`${member.name} profile hero`}>
        <div className="absolute inset-0 bg-page-hero-radial z-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-page-grid-lines z-0" aria-hidden="true" />
        <div className="relative z-10 max-w-[800px] animate-pageFadeIn">
          <div className="eyebrow-row">
            <Link to="/partners" className="eyebrow-text hover:underline text-gold">
              ← All Advocates
            </Link>
          </div>
          <h1 className="font-serif font-bold text-cream leading-[1.1] mt-3 mb-3" style={{ fontSize: "clamp(2.2rem,4.5vw,3.8rem)" }}>
            {member.name}
          </h1>
          <p className="text-gold font-medium text-[1.1rem] tracking-[0.05em] mb-2">{member.role}</p>
          <p className="font-serif-alt font-light text-cream/70 leading-[1.8] text-[1.05rem] max-w-[600px]">
            {member.specialisation} · {member.experience}
          </p>
        </div>
      </section>

      {/* ══ PROFILE CONTENT ══ */}
      <section className="bg-navy py-24 px-[5vw]" aria-labelledby="partner-overview">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 items-start">
            
            {/* Photo & Quote Column */}
            <div>
              <AnimateIn>
                <div className="border-2 border-gold/30 overflow-hidden shadow-deep">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-[420px] object-cover object-top"
                  />
                  <div className="bg-navy-deep p-6 border-t border-gold/20">
                    <div className="text-2xs tracking-[0.15em] uppercase text-gold mb-1">{member.title}</div>
                    <div className="font-serif text-[1.2rem] font-semibold text-cream">{member.name}</div>
                    <div className="text-[0.82rem] text-cream/50 mt-1">{member.experience}</div>
                  </div>
                </div>

                {member.quote && (
                  <div className="mt-6 p-6 border border-gold/25 bg-navy-mid">
                    <div className="text-[2.5rem] text-gold/30 font-serif leading-none mb-1">"</div>
                    <p className="font-serif-alt italic text-cream/80 text-[0.92rem] leading-[1.7]">
                      {member.quote}
                    </p>
                  </div>
                )}
              </AnimateIn>
            </div>

            {/* Profile Overview & Highlights */}
            <div className="animate-detailFade">
              <div className="eyebrow-row mb-3">
                <div className="eyebrow-line" />
                <span className="eyebrow-text">Advocate Profile</span>
              </div>
              <h2 id="partner-overview" className="font-serif font-bold text-cream leading-tight mb-2" style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)" }}>
                Legal Practice & Leadership
              </h2>
              <p className="text-cream/70 text-[0.95rem] leading-[1.8] mb-8">
                {member.tagline}
              </p>

              {/* Key Highlights */}
              <div className="text-2xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
                Core Practice & Expertise
              </div>
              <div className="flex flex-col gap-3.5 mb-10">
                {member.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3.5 p-5 bg-navy-mid border border-gold/10">
                    <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-gold text-[0.65rem]">✦</span>
                    </div>
                    <p className="text-[0.92rem] text-cream/80 leading-[1.7]">{h}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <Link to="/contact" className="btn-primary">
                  Consult {member.name.split(" ")[1]}
                </Link>
                <Link to="/expertise" className="btn-outline-navy !text-cream !border-cream/30 hover:!border-gold">
                  Explore Practice Areas
                </Link>
              </div>
            </div>

          </div>

          {/* ══ OTHER PARTNERS (INTERNAL CROSS-LINKING) ══ */}
          <div className="mt-24 pt-16 border-t border-gold/15">
            <h3 className="font-serif text-[1.4rem] font-semibold text-cream mb-8">
              Other Partners at Paul Legal Associates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherMembers.map((other) => (
                <Link
                  key={other.id}
                  to={`/partners/${other.slug}`}
                  className="group flex items-center gap-5 p-5 bg-navy-deep border border-gold/15 hover:border-gold/50 transition-all duration-300 no-underline"
                >
                  <img
                    src={other.photo}
                    alt={other.name}
                    className="w-16 h-16 rounded-full object-cover border border-gold/30 flex-shrink-0"
                  />
                  <div>
                    <div className="text-2xs uppercase tracking-wider text-gold font-semibold mb-1">
                      {other.title}
                    </div>
                    <h4 className="font-serif text-[1.1rem] font-semibold text-cream group-hover:text-gold transition-colors duration-200">
                      {other.name}
                    </h4>
                    <div className="text-[0.8rem] text-cream/50 truncate max-w-[280px]">
                      {other.specialisation}
                    </div>
                  </div>
                  <span className="text-gold text-sm ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      <CredentialsBar />
    </>
  );
};

export default PartnerDetail;