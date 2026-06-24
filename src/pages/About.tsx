import React from "react";
import { Link } from "react-router-dom";
import AnimateIn from "../components/ui/AnimateIn";
import SectionHeader from "../components/ui/SectionHeader";
import CredentialsBar from "../components/ui/CredentialsBar";
import { STATS, VALUES, MILESTONES, PHILOSOPHY, ABOUT_HIGHLIGHTS } from "../data";

const About: React.FC = () => (
  <>
    {/* ══ PAGE HERO ══ */}
    <section className="page-hero-wrapper" aria-label="About page hero">
      <div className="absolute inset-0 bg-page-hero-radial z-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-page-grid-lines z-0" aria-hidden="true" />
      <div className="relative z-10 max-w-[800px] animate-pageFadeIn">
        <div className="eyebrow-row">
          <div className="eyebrow-line" />
          <span className="eyebrow-text">Who We Are</span>
        </div>
        <h1 className="font-serif font-bold text-cream leading-[1.1] mt-3 mb-5"
          style={{ fontSize: "clamp(2.4rem,5vw,4rem)" }}>
          A full-service law firm<br /><em className="not-italic italic text-gold">based in Navi Mumbai</em>
        </h1>
        <p className="font-serif-alt font-light text-cream/70 leading-[1.8] text-[1.15rem] max-w-[620px]">
          Serving a dynamic legal and business environment with integrity, expertise and dedication for over three decades.
        </p>
      </div>
    </section>

    {/* ══ WHO WE ARE ══ */}
    <section className="bg-cream py-28 px-[5vw]" aria-labelledby="about-mission">
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <AnimateIn direction="left">
          <div className="eyebrow-row">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">Our Story</span>
          </div>
          <h2 id="about-mission" className="section-title mb-6">
            Three Decades of <em>Enduring Excellence</em>
          </h2>
          <p className="text-[1rem] text-muted leading-[1.85] mb-5">
            Paul Legal Associates (Advocates) is a full-service law firm based in Navi Mumbai, offering comprehensive litigation and non-litigation legal support. Established over 30 years ago, the firm has built a reputation for integrity, responsiveness and practical legal solutions.
          </p>
          <p className="text-[1rem] text-muted leading-[1.85] mb-8">
            We serve individuals, businesses, developers and institutions across Maharashtra, with deep expertise in property law, legal compliance, commercial litigation, banking laws and land acquisitions. Our advocates practice before the Bombay High Court and Supreme Court of India.
          </p>
          <div className="flex gap-5 flex-wrap">
            <Link to="/partners" className="btn-primary">Meet Our Partners</Link>
            <Link to="/contact" className="btn-outline-navy">Get in Touch</Link>
          </div>
        </AnimateIn>

        <AnimateIn direction="right" delay={0.15}>
          <div className="flex flex-col gap-4">
            {ABOUT_HIGHLIGHTS.map((h, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-white border border-navy/8 hover:border-gold/40 hover:shadow-md transition-all duration-300">
                <div className="w-11 h-11 rounded-full bg-navy flex items-center justify-center text-lg flex-shrink-0">{h.icon}</div>
                <div>
                  <div className="font-semibold text-navy text-[0.95rem] mb-1">{h.title}</div>
                  <div className="text-[0.85rem] text-muted">{h.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>

    {/* ══ STATS ══ */}
    <div className="grid grid-cols-2 lg:grid-cols-4 bg-navy border-t border-b border-gold/20" role="region" aria-label="Firm statistics">
      {STATS.map((s, i) => (
        <AnimateIn key={s.label} delay={i * 0.1}
          className={`text-center py-10 px-4 ${i < STATS.length - 1 ? "border-r border-gold/15" : ""}`}>
          <div className="font-serif text-[2.5rem] font-bold text-gold leading-none mb-1">{s.value}</div>
          <div className="text-2xs tracking-[0.18em] uppercase text-cream/50">{s.label}</div>
        </AnimateIn>
      ))}
    </div>

    {/* ══ AIM & PHILOSOPHY ══ */}
    <section className="bg-navy-deep py-28 px-[5vw]" aria-labelledby="philosophy-heading">
      <div className="max-w-8xl mx-auto">
        <SectionHeader
          eyebrow="Our Aim & Philosophy"
          title={<>Client-Focused Lawyering with <em>Clarity &amp; Purpose</em></>}
          subtitle="Client-focused lawyering with clarity, transparency and purpose."
          centered light
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-14">
          {PHILOSOPHY.map((p, i) => (
            <AnimateIn key={i} delay={i * 0.08}>
              <div className="flex h-full items-center gap-4 p-6 border border-gold/15 bg-navy hover:border-gold/40 hover:bg-navy-mid transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-lg flex-shrink-0">{p.icon}</div>
                <p className="text-[0.88rem] text-cream/75 leading-[1.75]">{p.text}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Philosophy quote box */}
        <AnimateIn className="mt-8">
          <div className="bg-navy border border-gold/20 p-8 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <div className="text-[3rem] text-gold/25 font-serif leading-none mb-2">"</div>
              <p className="font-serif-alt text-[1.1rem] text-cream/80 italic leading-[1.75]">
                Our philosophy is rooted in integrity, guided by the law, and strengthened by purpose. We work with commitment, compassion and clarity to create lasting impact for our clients and the communities we serve.
              </p>
            </div>
            <div className="lg:border-l lg:border-gold/20 lg:pl-8 text-center flex-shrink-0">
              <p className="text-gold font-serif italic text-[0.95rem]">Paul Legal Associates</p>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn className="mt-6 text-center">
          <div className="border-t border-b border-gold/20 py-5">
            <p className="font-serif-alt text-cream/60 italic text-[1rem]">
              At the heart of our work is the client's trust and satisfaction.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>

    {/* ══ VALUES ══ */}
    <section className="bg-cream py-28 px-[5vw]" aria-labelledby="values-heading">
      <div className="max-w-8xl mx-auto">
        <SectionHeader
          eyebrow="Our Values"
          title={<>What We <em>Stand For</em></>}
          subtitle="Strategic counsel rooted in enduring values."
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-14">
          {VALUES.map((v, i) => (
            <AnimateIn key={v.title} delay={i * 0.1}>
              <div className="p-8 h-full bg-white border border-navy/8 hover:border-gold/50 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center text-xl mb-5">{v.icon}</div>
                <h3 className="font-serif text-[1.1rem] font-semibold text-navy mb-3">{v.title}</h3>
                <p className="text-[0.88rem] text-muted leading-[1.75]">{v.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>

    {/* ══ TIMELINE ══ */}
    <section className="bg-navy py-28 px-[5vw]" aria-labelledby="timeline-heading">
      <div className="max-w-8xl mx-auto">
        <SectionHeader
          eyebrow="Our Journey"
          title={<>30+ Years of <em>History</em></>}
          light
        />
        <div className="mt-14 flex flex-col" role="list">
          {MILESTONES.map((m, i) => (
            <AnimateIn key={m.year} delay={i * 0.09}>
              <div className="grid items-start gap-x-6" style={{ gridTemplateColumns: "80px 36px 1fr" }} role="listitem">
                <div className="font-serif text-[1.1rem] font-bold text-gold text-right pt-0.5">{m.year}</div>
                <div className="flex flex-col items-center pt-1.5">
                  <div className="w-3 h-3 rounded-full border-2 border-gold bg-navy flex-shrink-0" />
                  {i < MILESTONES.length - 1 && <div className="w-px flex-1 min-h-[48px] bg-gold/20 mt-1" />}
                </div>
                <div className="font-serif-alt font-light text-cream/70 text-[1.02rem] leading-[1.7] pb-10">{m.event}</div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>

    {/* ══ CTA ══ */}
    <section className="bg-cream border-t border-navy/10 py-24 px-[5vw]" aria-labelledby="about-cta">
      <AnimateIn className="max-w-8xl mx-auto max-w-[640px]">
        <h2 id="about-cta" className="section-title mb-4">
          Ready to Work <em>Together?</em>
        </h2>
        <p className="section-subtitle mb-10">
          Schedule a confidential consultation with one of our senior advocates today.
        </p>
        <div className="flex gap-5 flex-wrap">
          <Link to="/contact" className="btn-primary">Schedule Consultation</Link>
          <Link to="/expertise" className="btn-outline-navy">Our Practice Areas</Link>
        </div>
      </AnimateIn>
    </section>

    <CredentialsBar />
  </>
);

export default About;
