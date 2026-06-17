import React from "react";
import { Link } from "react-router-dom";
const NotFound: React.FC = () => (
  <div className="relative min-h-screen flex items-center justify-center px-[5vw] py-20 overflow-hidden text-center bg-cream">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif font-bold text-navy/[0.04] select-none pointer-events-none whitespace-nowrap" style={{ fontSize: "clamp(150px,28vw,380px)" }} aria-hidden="true">404</div>
    <div className="relative z-10 max-w-[560px] animate-pageFadeIn">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="w-8 h-px bg-gold" /><span className="text-2xs font-semibold tracking-[0.25em] uppercase text-gold">Page Not Found</span><div className="w-8 h-px bg-gold" />
      </div>
      <h1 className="font-serif font-bold text-navy leading-[1.15] mb-5" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
        This Page Has <em className="not-italic italic text-gold">Left the Building</em>
      </h1>
      <p className="font-serif-alt font-light text-muted text-[1.1rem] leading-[1.8] mb-10">
        The page you're looking for doesn't exist or has been moved. Let us guide you back.
      </p>
      <div className="flex gap-5 justify-center flex-wrap">
        <Link to="/" className="btn-primary">Return Home</Link>
        <Link to="/contact" className="btn-outline-navy">Contact Us</Link>
      </div>
    </div>
  </div>
);
export default NotFound;
