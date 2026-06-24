import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import AnimateIn from "../components/ui/AnimateIn";
import SectionHeader from "../components/ui/SectionHeader";
import CredentialsBar from "../components/ui/CredentialsBar";
import { ARTICLES, ARTICLE_CATEGORIES } from "../data";

const Insights: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(
    () => (activeCategory === "All" ? ARTICLES : ARTICLES.filter(a => a.category === activeCategory)),
    [activeCategory]
  );

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      {/* ══ HERO ══ */}
      <section className="page-hero-wrapper" aria-label="Insights page hero">
        <div className="absolute inset-0 bg-page-hero-radial z-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-page-grid-lines z-0" aria-hidden="true" />
        <div className="relative z-10 max-w-[800px] animate-pageFadeIn">
          <div className="eyebrow-row">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">Insights &amp; Articles</span>
          </div>
          <h1 className="font-serif font-bold text-cream leading-[1.1] mt-3 mb-5" style={{ fontSize: "clamp(2.4rem,5vw,4rem)" }}>
            Legal Perspectives <br /><em className="not-italic italic text-gold">Worth Your Time</em>
          </h1>
          <p className="font-serif-alt font-light text-cream/70 leading-[1.8] text-[1.15rem] max-w-[600px]">
            Practical legal insights from our advocates — on property law, compliance, litigation and the issues shaping our clients' businesses.
          </p>
        </div>
      </section>

      {/* ══ CATEGORY FILTER + GRID ══ */}
      <section className="bg-cream py-24 px-[5vw]" aria-labelledby="articles-heading">
        <div className="max-w-8xl mx-auto">
          <h2 id="articles-heading" className="sr-only">All Articles</h2>

          {/* Category pills */}
          <AnimateIn>
            <div className="flex flex-wrap gap-3 mb-14" role="tablist" aria-label="Filter articles by category">
              {ARTICLE_CATEGORIES.map(cat => {
                const active = activeCategory === cat;
                const count = cat === "All" ? ARTICLES.length : ARTICLES.filter(a => a.category === cat).length;
                if (cat !== "All" && count === 0) return null;
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 text-[0.78rem] font-medium tracking-[0.05em] border transition-all duration-300 cursor-pointer
                      ${active ? "bg-navy text-cream border-navy" : "bg-white text-muted border-navy/15 hover:border-navy/40 hover:text-navy"}`}
                  >
                    {cat} <span className={active ? "text-gold" : "text-muted/60"}>({count})</span>
                  </button>
                );
              })}
            </div>
          </AnimateIn>

          {filtered.length === 0 ? (
            <p className="text-muted text-center py-20">No articles found in this category yet.</p>
          ) : (
            <>
              {/* ── Featured article (large card) ── */}
              {featured && (
                <AnimateIn key={featured.id} className="mb-12">
                  <Link
                    to={`/insights/${featured.slug}`}
                    className="group grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-0 no-underline border border-navy/10 bg-white overflow-hidden hover:shadow-deep transition-shadow duration-300"
                  >
                    <div className="bg-navy flex items-center justify-center p-12 relative overflow-hidden min-h-[260px]">
                      <div className="absolute inset-0 bg-page-hero-radial opacity-60" />
                      <span className="relative z-10 text-[5rem] leading-none" aria-hidden="true">{featured.coverIcon}</span>
                      <span className="absolute top-5 left-5 text-2xs font-semibold tracking-[0.15em] uppercase text-gold border border-gold/40 px-3 py-1.5">
                        Featured
                      </span>
                    </div>
                    <div className="p-9 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xs font-semibold tracking-[0.12em] uppercase text-gold">{featured.category}</span>
                        <span className="text-muted/40">•</span>
                        <span className="text-2xs text-muted">{featured.readTime}</span>
                      </div>
                      <h3 className="font-serif text-[1.5rem] font-semibold text-navy leading-snug mb-3 group-hover:text-navy-light transition-colors duration-300">
                        {featured.title}
                      </h3>
                      <p className="text-[0.92rem] text-muted leading-[1.7] mb-5">{featured.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[0.85rem] font-semibold text-navy">{featured.author}</div>
                          <div className="text-2xs text-muted">{featured.date}</div>
                        </div>
                        <span className="btn-ghost text-[0.72rem]">Read Article →</span>
                      </div>
                    </div>
                  </Link>
                </AnimateIn>
              )}

              {/* ── Remaining articles grid ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
                {rest.map((article, i) => (
                  <AnimateIn key={article.id} delay={i * 0.07}>
                    <Link
                      to={`/insights/${article.slug}`}
                      className="group flex flex-col h-full no-underline border border-navy/10 bg-white overflow-hidden hover:border-gold/40 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300"
                    >
                      <div className="bg-navy-deep flex items-center justify-center p-8 relative overflow-hidden h-[140px]">
                        <span className="text-[2.8rem] leading-none opacity-90" aria-hidden="true">{article.coverIcon}</span>
                        <div className="absolute left-0 top-0 w-[3px] h-full bg-gold scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-400" />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xs font-semibold tracking-[0.1em] uppercase text-gold">{article.category}</span>
                          <span className="text-muted/40 text-2xs">•</span>
                          <span className="text-2xs text-muted">{article.readTime}</span>
                        </div>
                        <h3 className="font-serif text-[1.08rem] font-semibold text-navy leading-snug mb-3 flex-1 group-hover:text-navy-light transition-colors duration-300">
                          {article.title}
                        </h3>
                        <p className="text-[0.84rem] text-muted leading-[1.65] mb-5 line-clamp-3">{article.excerpt}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-navy/8 mt-auto">
                          <div className="text-[0.78rem] text-navy font-medium">{article.author}</div>
                          <span className="text-gold text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" aria-hidden="true">→</span>
                        </div>
                      </div>
                    </Link>
                  </AnimateIn>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="bg-navy border-t border-gold/20 py-24 px-[5vw] text-center" aria-labelledby="insights-cta">
        <AnimateIn>
          <h2 id="insights-cta" className="section-title-light mb-4 mx-auto max-w-xl">
            Have a Legal Question <em>Not Covered Here?</em>
          </h2>
          <p className="section-subtitle text-cream/70 mx-auto mb-10">
            Our advocates are happy to discuss your specific situation — the first consultation is complimentary.
          </p>
          <Link to="/contact" className="btn-primary">Schedule a Consultation</Link>
        </AnimateIn>
      </section>

      <CredentialsBar />
    </>
  );
};

export default Insights;
