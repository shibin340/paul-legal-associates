import React from "react";
import AnimateIn from "./AnimateIn";
interface Props { eyebrow: string; title: React.ReactNode; subtitle?: string; centered?: boolean; light?: boolean; }
const SectionHeader: React.FC<Props> = ({ eyebrow, title, subtitle, centered = false, light = false }) => (
  <AnimateIn>
    <div className={centered ? "text-center" : "text-left"}>
      <div className={`eyebrow-row ${centered ? "justify-center" : ""}`}>
        <div className="eyebrow-line" />
        <span className="eyebrow-text">{eyebrow}</span>
        {centered && <div className="eyebrow-line" />}
      </div>
      <h2 className={light ? "section-title-light" : "section-title"}>{title}</h2>
      {subtitle && <p className={`section-subtitle max-w-2xl ${centered ? "mx-auto" : ""} ${light ? "text-cream/70" : ""}`}>{subtitle}</p>}
    </div>
  </AnimateIn>
);
export default SectionHeader;
