import React from "react";
import { CREDENTIALS } from "../../data/site";

const CredentialsBar: React.FC = () => (
  <section
    className="bg-navy-deep border-y border-gold/20 px-[5vw] py-8 sm:py-10"
    aria-label="Our experience and practice focus"
  >
    <div className="max-w-8xl mx-auto">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
        <span className="text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-gold-light">
          At a glance
        </span>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border border-gold/20 bg-gold/20">
        {CREDENTIALS.map((credential, index) => (
          <li
            key={credential.label}
            className="flex min-h-[72px] items-center gap-4 bg-navy-darker px-5 py-4 sm:min-h-[104px] sm:px-6 lg:px-8"
          >
            <span
              className="w-7 shrink-0 font-serif-alt text-[1.35rem] italic leading-none text-gold"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-sans text-[0.88rem] font-semibold leading-[1.5] text-cream/85">
              {credential.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default CredentialsBar;
