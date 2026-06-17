import React from "react";
import { CREDENTIALS } from "../../data";
const CredentialsBar: React.FC = () => (
  <div className="bg-navy-deeper border-t border-gold/20 py-5 px-[5vw]">
    <div className="max-w-8xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
      {CREDENTIALS.map(c => (
        <div key={c.label} className="flex items-center gap-2.5">
          <span className="text-gold text-lg" aria-hidden="true">{c.icon}</span>
          <span className="text-2xs font-semibold tracking-[0.15em] uppercase text-cream/70">{c.label}</span>
        </div>
      ))}
    </div>
  </div>
);
export default CredentialsBar;
