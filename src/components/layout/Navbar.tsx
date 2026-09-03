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
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-3 xl:gap-6">
          {/* Logo Container */}
          <div className="flex items-center gap-3 py-1 flex-shrink-0">
            <NavLink
              to="/"
              className="flex items-center gap-3 no-underline flex-shrink-0"
              onClick={() => setOpen(false)}
              aria-label="Paul Legal Associates Home"
            >
              <img
                src="/logo.webp"
                alt="Paul Legal Associates"
                className="h-11 sm:h-12 lg:h-14 w-auto object-contain"
                fetchPriority="high"
                decoding="sync"
              />
            </NavLink>

            {/* Tagline — visible only on ultra-wide screens (2xl) so it doesn't crush 1366px/1440px laptop navbars */}
            <span className="hidden 2xl:block text-[0.6rem] tracking-[0.16em] uppercase text-gold/70 italic flex-shrink-0 max-w-[200px] leading-tight">
              {TAGLINE}
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:block min-w-0" aria-label="Main navigation">
            <ul className="flex items-center gap-3.5 xl:gap-5 2xl:gap-7 list-none m-0 p-0">
              {NAV_LINKS.map(({ label, path }) => (
                <li key={path} className="flex-shrink-0">
                  <NavLink
                    to={path}
                    end={path === "/"}
                    className={({ isActive }) =>
                      `text-[0.72rem] xl:text-[0.75rem] font-medium tracking-[0.08em] xl:tracking-[0.12em] uppercase no-underline whitespace-nowrap relative pb-0.5 transition-colors duration-300
                       after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-px after:bg-gold after:transition-transform after:duration-300 after:origin-left
                       ${isActive ? "text-gold after:scale-x-100" : "text-cream/80 hover:text-cream after:scale-x-0 hover:after:scale-x-100"}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <NavLink
            to="/contact"
            className="hidden lg:inline-flex btn-primary text-[0.68rem] xl:text-[0.72rem] py-2.5 px-4 flex-shrink-0 whitespace-nowrap"
          >
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
        className={`fixed inset-0 z-40 bg-navy/98 backdrop-blur-xl flex flex-col items-center justify-between pt-24 pb-8 px-6 overflow-y-auto transition-all duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        style={{ backgroundColor: "rgb(13, 39, 67)" }}
      >
        {/* Tagline — cushioned below the 72px header bar */}
        <p
          id="mobile-menu-title"
          className="text-[0.58rem] sm:text-[0.62rem] tracking-[0.15em] uppercase text-gold/75 italic text-center max-w-[280px] leading-relaxed select-none mb-2"
        >
          {TAGLINE}
        </p>

        {/* Links — neatly spaced and centered */}
        <ul className="list-none flex flex-col items-center gap-3.5 my-auto py-4 m-0 p-0">
          {NAV_LINKS.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-serif text-[1.3rem] sm:text-[1.5rem] font-normal no-underline transition-colors duration-300 ${isActive ? "text-gold" : "text-cream hover:text-gold"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Bottom Action */}
        <div className="w-full max-w-[260px] pt-3">
          <NavLink
            to="/contact"
            className="btn-primary no-underline block text-center py-3 text-[0.72rem] tracking-wider uppercase"
            onClick={() => setOpen(false)}
          >
            Book a Consultation
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;