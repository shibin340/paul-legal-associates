import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import AnimateIn from "../components/ui/AnimateIn";
import CredentialsBar from "../components/ui/CredentialsBar";
import { getArticleBySlug, getRelatedArticles } from "../data";

const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  // Scroll to top whenever a new article is opened
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!article) {
    return <Navigate to="/insights" replace />;
  }

  const related = getRelatedArticles(article, 3);

  return (
    <>
      {/* ══ ARTICLE HERO ══ */}
      <section className="page-hero-wrapper" aria-label="Article header">
        <div className="absolute inset-0 bg-page-hero-radial z-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-page-grid-lines z-0" aria-hidden="true" />
        <div className="relative z-10 max-w-[820px] animate-pageFadeIn">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-2xs text-cream/50 mb-6 flex-wrap">
            <Link to="/" className="hover:text-gold transition-colors no-underline text-cream/50">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/insights" className="hover:text-gold transition-colors no-underline text-cream/50">Insights</Link>
            <span aria-hidden="true">/</span>
            <span className="text-gold">{article.category}</span>
          </div>

          <div className="eyebrow-row">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">{article.category}</span>
          </div>

          <h1 className="font-serif font-bold text-cream leading-[1.15] mt-3 mb-6" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
            {article.title}
          </h1>

          {/* Meta row */}
          <div className="flex items-center gap-5 flex-wrap text-[0.85rem] text-cream/60">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-navy-deep font-serif font-bold text-sm flex-shrink-0">
                {article.author.replace("Adv. ", "").split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div className="text-cream font-medium">{article.author}</div>
                <div className="text-2xs text-cream/50">{article.authorRole}</div>
              </div>
            </div>
            <span className="text-cream/30" aria-hidden="true">|</span>
            <span>{article.date}</span>
            <span className="text-cream/30" aria-hidden="true">|</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </section>

      {/* ══ ARTICLE BODY ══ */}
      <section className="bg-cream py-20 px-[5vw]" aria-label="Article content">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16">

          {/* Main content column */}
          <article className="max-w-[720px]">
            {/* Cover icon banner */}
            <AnimateIn>
              <div className="bg-navy flex items-center justify-center py-16 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-page-hero-radial opacity-70" />
                <span className="relative z-10 text-[5rem]" aria-hidden="true">{article.coverIcon}</span>
              </div>
            </AnimateIn>

            {/* Excerpt / lede */}
            <AnimateIn delay={0.05}>
              <p className="font-serif-alt text-[1.25rem] text-navy/80 italic leading-[1.75] mb-10 border-l-2 border-gold pl-6">
                {article.excerpt}
              </p>
            </AnimateIn>

            {/* Sections */}
            {article.content.map((section, i) => (
              <AnimateIn key={i} delay={Math.min(i * 0.04, 0.3)} className="mb-10">
                {section.heading && (
                  <h2 className="font-serif text-[1.5rem] font-semibold text-navy mb-4 mt-2">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((p, pi) => (
                  <p key={pi} className="text-[1rem] text-navy/75 leading-[1.85] mb-4">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="list-none flex flex-col gap-2.5 mt-5 mb-2">
                    {section.list.map((item, li) => (
                      <li key={li} className="flex items-start gap-3 text-[0.95rem] text-navy/80 leading-[1.6]">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-2" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </AnimateIn>
            ))}

            {/* Tags */}
            <AnimateIn className="mt-12 pt-8 border-t border-navy/10">
              <div className="flex flex-wrap gap-2 mb-10">
                {article.tags.map(tag => (
                  <span key={tag} className="text-2xs tracking-[0.05em] text-muted border border-navy/15 px-3 py-1.5">
                    #{tag.replace(/\s+/g, "")}
                  </span>
                ))}
              </div>

              {/* Author callout */}
              <div className="bg-navy p-8 flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center text-navy-deep font-serif font-bold text-lg flex-shrink-0">
                  {article.author.replace("Adv. ", "").split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="text-2xs tracking-[0.15em] uppercase text-gold mb-1">Written By</div>
                  <div className="font-serif text-[1.1rem] font-semibold text-cream mb-1">{article.author}</div>
                  <div className="text-[0.85rem] text-cream/60">{article.authorRole}, Paul Legal Associates</div>
                </div>
              </div>
            </AnimateIn>

            {/* CTA */}
            <AnimateIn className="mt-10">
              <div className="border border-gold/30 bg-gold/5 p-8 text-center">
                <h3 className="font-serif text-[1.3rem] font-semibold text-navy mb-3">
                  Have a question about {article.category.toLowerCase()}?
                </h3>
                <p className="text-[0.9rem] text-muted mb-6 max-w-md mx-auto">
                  Schedule a confidential consultation with our advocates to discuss your legal options.
                </p>
                <Link to="/contact" className="btn-primary">Schedule a Consultation</Link>
              </div>
            </AnimateIn>

            {/* Back link */}
            <div className="mt-10">
              <Link to="/insights" className="btn-ghost text-navy">← Back to All Insights</Link>
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-[calc(72px+2rem)] flex flex-col gap-8">
              {/* Quick facts */}
              <div className="border border-navy/10 bg-white p-6">
                <h3 className="text-2xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">Article Details</h3>
                <dl className="flex flex-col gap-3">
                  <div>
                    <dt className="text-2xs text-muted mb-0.5">Category</dt>
                    <dd className="text-[0.88rem] text-navy font-medium">{article.category}</dd>
                  </div>
                  <div>
                    <dt className="text-2xs text-muted mb-0.5">Published</dt>
                    <dd className="text-[0.88rem] text-navy font-medium">{article.date}</dd>
                  </div>
                  <div>
                    <dt className="text-2xs text-muted mb-0.5">Read Time</dt>
                    <dd className="text-[0.88rem] text-navy font-medium">{article.readTime}</dd>
                  </div>
                </dl>
              </div>

              {/* Related articles */}
              {related.length > 0 && (
                <div className="border border-navy/10 bg-white p-6">
                  <h3 className="text-2xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">Related Insights</h3>
                  <div className="flex flex-col gap-4">
                    {related.map(r => (
                      <Link key={r.id} to={`/insights/${r.slug}`} className="group block no-underline pb-4 border-b border-navy/8 last:border-0 last:pb-0">
                        <div className="text-2xs text-gold mb-1.5">{r.category}</div>
                        <div className="text-[0.85rem] text-navy font-medium leading-snug group-hover:text-navy-light transition-colors">
                          {r.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      <CredentialsBar />
    </>
  );
};

export default ArticleDetail;
