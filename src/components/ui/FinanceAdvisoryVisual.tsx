import React from "react";

const streams = [
  { number: "01", title: "Finance", detail: "Reporting · Controls · CFO", mark: "F" },
  { number: "02", title: "Tax", detail: "GST · TDS · Transfer pricing", mark: "T" },
  { number: "03", title: "Regulation", detail: "FEMA · RBI · Cross-border", mark: "R" }
];

/** A purpose-built visual map of the three advisory workstreams. */
const FinanceAdvisoryVisual: React.FC = () => (
  <div
    className="finance-visual"
    role="img"
    aria-label="Finance, tax and regulatory workstreams brought together in one coordinated advisory view"
  >
    <div className="finance-visual__topline" aria-hidden="true">
      <span className="finance-visual__monogram">P<span>·</span>L<span>·</span>A</span>
      <span className="finance-visual__top-label">Advisory / Connected view</span>
      <span className="finance-visual__top-index">01 — 03</span>
    </div>

    <div className="finance-visual__intro" aria-hidden="true">
      <span className="finance-visual__kicker">One coordinated perspective</span>
      <span className="finance-visual__heading">Three disciplines.<br /><em>One direction.</em></span>
    </div>

    <div className="finance-visual__workstreams" aria-hidden="true">
      <div className="finance-visual__spine" />
      {streams.map((stream) => (
        <div className="finance-visual__stream" key={stream.number}>
          <span className="finance-visual__number">{stream.number}</span>
          <span className="finance-visual__copy">
            <strong>{stream.title}</strong>
            <small>{stream.detail}</small>
          </span>
          <span className="finance-visual__mark">{stream.mark}</span>
          <span className="finance-visual__node" />
        </div>
      ))}
    </div>

    <div className="finance-visual__outcome" aria-hidden="true">
      <span className="finance-visual__outcome-icon">↗</span>
      <span><strong>Connected decisions</strong><small>From the first conversation onward</small></span>
      <span className="finance-visual__outcome-line" />
    </div>
  </div>
);

export default FinanceAdvisoryVisual;
