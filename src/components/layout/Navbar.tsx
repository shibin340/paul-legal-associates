import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { NAV_LINKS, TAGLINE } from "../../data";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollPosition() > 60;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-navy/95 backdrop-blur-md shadow-[0_1px_0_rgba(200,169,81,0.2)]" : ""
          }`}
        role="banner"
      >
        <div className="max-w-8xl mx-auto px-[5vw] h-[72px] flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 p-3">
            <NavLink to="/" className="flex items-center gap-3 no-underline flex-shrink-0" onClick={() => setOpen(false)} aria-label="Paul Legal Associates Home">
              <img src="/logo.png" alt="Paul Legal Associates" className={`h-16 w-auto object-contain ${scrolled ? "brightness-50" : "contrast-50"}`} />
            </NavLink>

            {/* Tagline — desktop only */}
            <span className="hidden xl:block text-[0.6rem] tracking-[0.18em] uppercase text-gold/70 italic flex-shrink-0">
              {TAGLINE}
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:block" aria-label="Main navigation">
            <ul className="flex items-center gap-8 list-none">
              {NAV_LINKS.map(({ label, path }) => (
                <li key={path}>
                  <NavLink to={path} end={path === "/"}
                    className={({ isActive }) =>
                      `text-[0.74rem] font-medium tracking-[0.12em] uppercase no-underline relative pb-0.5 transition-colors duration-300
                       after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-px after:bg-gold after:transition-transform after:duration-300 after:origin-left
                       ${isActive ? "text-gold after:scale-x-100" : "text-cream/80 hover:text-cream after:scale-x-0 hover:after:scale-x-100"}`
                    }
                  >{label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <NavLink to="/contact" className="hidden lg:inline-flex btn-primary text-[0.7rem] flex-shrink-0">
            Book a Consultation
          </NavLink>

          {/* Hamburger */}
          <button className="lg:hidden flex flex-col gap-[5px] bg-transparent border-0 p-1.5 cursor-pointer" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            <span className={`block w-6 h-[1.5px] bg-gold transition-all duration-300 ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-6 h-[1.5px] bg-gold transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-6 h-[1.5px] bg-gold transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-navy/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6 transition-all duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} role="dialog" aria-modal="true">
        <img src="/logo.png" alt="Paul Legal Associates" className="h-14 w-auto contrast-50 object-contain mb-2" />
        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-gold/70 italic mb-4">{TAGLINE}</p>
        <ul className="list-none flex flex-col items-center gap-6 mb-6">
          {NAV_LINKS.map(({ label, path }) => (
            <li key={path}>
              <NavLink to={path} end={path === "/"} onClick={() => setOpen(false)}
                className={({ isActive }) => `font-serif text-[2rem] font-normal no-underline transition-colors duration-300 ${isActive ? "text-gold" : "text-cream hover:text-gold"}`}
              >{label}</NavLink>
            </li>
          ))}
        </ul>
        <NavLink to="/contact" className="btn-primary no-underline" onClick={() => setOpen(false)}>Free Consultation</NavLink>
      </div>
    </>
  );
};
export default Navbar;
