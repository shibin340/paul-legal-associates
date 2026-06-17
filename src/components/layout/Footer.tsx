import React from "react";
import { NavLink } from "react-router-dom";
import { NAV_LINKS, PRACTICE_AREAS, CONTACT_INFO, TAGLINE, CREDENTIALS } from "../../data";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-darker border-t border-gold/20" role="contentinfo">
      <div className="max-w-8xl mx-auto px-[5vw] pt-16 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="xl:col-span-1">
            <img src="/logo.png" alt="Paul Legal Associates" className="h-12 contrast-50 w-auto object-contain mb-4"
            //  style={{ filter: "brightness(0) invert(1)" }} 
             />
            <p className="text-[0.72rem] tracking-[0.12em] text-gold italic mb-5">{TAGLINE}</p>
            <p className="text-[0.85rem] text-cream/60 leading-[1.75] mb-5">A full-service law firm based in Navi Mumbai serving a dynamic legal and business environment.</p>
            <div className="flex flex-wrap gap-2">
              {CREDENTIALS.map(c => (
                <span key={c.label} className="text-[0.65rem] tracking-[0.1em] uppercase text-gold/60 border border-gold/20 px-2 py-1">{c.label}</span>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-gold mb-4">Navigate</h3>
            <ul className="list-none flex flex-col gap-2.5">
              {NAV_LINKS.map(({ label, path }) => (
                <li key={path}><NavLink to={path} end={path === "/"} className={({ isActive }) => `text-[0.85rem] no-underline transition-colors duration-300 ${isActive ? "text-gold" : "text-cream/60 hover:text-gold"}`}>{label}</NavLink></li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-gold mb-4">Practice Areas</h3>
            <ul className="list-none flex flex-col gap-2.5">
              {PRACTICE_AREAS.map(p => (
                <li key={p.id}><NavLink to={`/expertise#${p.id}`} className="text-[0.85rem] text-cream/60 no-underline hover:text-gold transition-colors duration-300">{p.title}</NavLink></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-gold mb-4">Contact</h3>
            <ul className="list-none flex flex-col gap-4">
              <li className="flex gap-3 items-start">
                <span className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true">📍</span>
                <span className="text-[0.82rem] text-cream/60 leading-[1.6] whitespace-pre-line">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex gap-3 items-center">
                <span className="text-gold" aria-hidden="true">📞</span>
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-[0.82rem] text-cream/60 no-underline hover:text-gold transition-colors">{CONTACT_INFO.phone}</a>
              </li>
              <li className="flex gap-3 items-center">
                <span className="text-gold" aria-hidden="true">✉️</span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-[0.82rem] text-cream/60 no-underline hover:text-gold transition-colors">{CONTACT_INFO.email}</a>
              </li>
              <li className="flex gap-3 items-center">
                <span className="text-gold" aria-hidden="true">🌐</span>
                <span className="text-[0.82rem] text-cream/60">{CONTACT_INFO.website}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Tagline Banner */}
        <div className="border-t border-b border-gold/15 py-4 text-center mb-6">
          <p className="font-serif-alt italic text-gold/80 text-[1rem]">
            "Enduring Values. <span className="text-gold font-medium">Delivering Results.</span>"
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.75rem] text-cream/40">
          <p>© {year} Paul Legal Associates (Advocates). All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use", "Disclaimer"].map(l => (
              <a key={l} href="#!" className="no-underline hover:text-gold transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
