import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { NAV_LINKS, TAGLINE } from "../../data";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const scrollPos = useScrollPosition();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Structural Fallback: If we are pre-rendering (react-snap) or hydratation is occurring,
  // we render a clean, standard matching layout container shell. This completely avoids 
  // class string dynamic mismatches caused by react-router-dom links.
  if (!isMounted) {
    return (
      <header className="fixed top-0 left-0 right-0 h-[72px] z-50 bg-transparent" role="banner">
        <div className="max-w-8xl mx-auto px-4 sm:px-[5vw] h-full" />
      </header>
    );
  }

  const scrolled = scrollPos > 60;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-navy/95 backdrop-blur-md shadow-[0_1px_0_rgba(200,169,81,0.2)]" : ""
          }`}
        role="banner"
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-[1vw] h-[72px] flex items-center justify-between gap-4 md:gap-6">
          {/* Logo Container */}
          <div className="flex items-center gap-2 py-1 min-w-0">
            <NavLink
              to="/"
              className="flex items-center gap-3 no-underline flex-shrink-0"
              onClick={() => setOpen(false)}
              aria-label="Paul Legal Associates Home"
            >

              <img
                src="/logo.webp"
                alt="Paul Legal Associates"
                className="h-11 sm:h-14 lg:h-16 w-auto max-w-[180px] sm:max-w-none object-contain"
                fetchPriority="high"
                decoding="sync"
              />
            </NavLink>

            {/* Tagline — desktop only */}
            <span className="hidden xl:block text-[0.6rem] tracking-[0.18em] uppercase text-gold/70 italic flex-shrink-0">
              {TAGLINE}
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:block" aria-label="Main navigation">
            <ul className="flex items-center gap-8 list-none m-0 p-0">
              {NAV_LINKS.map(({ label, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    end={path === "/"}
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
          <button
            className="lg:hidden flex flex-col gap-[5px] bg-transparent border-0 p-2 cursor-pointer flex-shrink-0 select-none"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className={`block w-6 h-[1.5px] bg-gold transition-all duration-300 ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-6 h-[1.5px] bg-gold transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-6 h-[1.5px] bg-gold transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-navy/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6 transition-all duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        style={{ backgroundColor: "rgb(13, 39, 67)" }}
      >
        <p
          id="mobile-menu-title"
          className="text-[0.65rem] tracking-[0.2em] uppercase text-gold/70 italic mb-4 px-6 text-center"
        >
          {TAGLINE}
        </p>
        <ul className="list-none flex flex-col items-center gap-6 mb-6 m-0 p-0">
          {NAV_LINKS.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `font-serif text-[1.75rem] sm:text-[2rem] font-normal no-underline transition-colors duration-300 ${isActive ? "text-gold" : "text-cream hover:text-gold"}`}
              >{label}</NavLink>
            </li>
          ))}
        </ul>
        <NavLink to="/contact" className="btn-primary no-underline" onClick={() => setOpen(false)}>Book a Consultation</NavLink>
      </div>
    </>
  );
};

export default Navbar;