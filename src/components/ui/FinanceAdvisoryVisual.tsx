import React from "react";
import SiteImage from "./SiteImage";

/** A lightweight, decorative depth treatment for the finance practice page. */
const FinanceAdvisoryVisual: React.FC = () => (
  <div className="finance-visual" aria-hidden="true">
    <div className="finance-visual__glow" />
    <div className="finance-visual__ring finance-visual__ring--outer" />
    <div className="finance-visual__ring finance-visual__ring--inner" />
    <div className="finance-visual__art">
      <SiteImage
        src="/images/ChatGPT.webp"
        alt=""
        decoding="async"
        className="w-full h-full object-contain"
      />
    </div>
    <span className="finance-visual__label finance-visual__label--one">Finance</span>
    <span className="finance-visual__label finance-visual__label--two">Tax</span>
    <span className="finance-visual__label finance-visual__label--three">Regulation</span>
    <span className="finance-visual__caption">Connected advisory / India & cross-border</span>
  </div>
);

export default FinanceAdvisoryVisual;
