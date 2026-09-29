import React from 'react';
import { Link } from 'react-router-dom';

const sectionClass = 'border-t border-navy/10 pt-8 mb-10';
const headingClass = 'font-serif text-[1.45rem] font-semibold text-navy mb-4';
const copyClass = 'text-[0.95rem] text-navy/80 leading-[1.8] mb-5';
const listClass = 'list-disc pl-5 space-y-2 text-[0.9rem] text-navy/80 leading-[1.7] mb-7';
const linkClass = 'text-navy underline decoration-gold/60 underline-offset-4 hover:text-gold';

const ServiceDecisionGuides: React.FC<{ slug: string }> = ({ slug }) => {
  if (slug === 'property-real-estate') {
    return (
      <section className={sectionClass} aria-labelledby="property-service-guide">
        <h3 id="property-service-guide" className={headingClass}>Which property question do you need to resolve?</h3>
        <p className={copyClass}>
          A purchase, a development agreement and a notice affecting land call for different records and next steps. Tell us the property location and the decision you are about to make, so the initial discussion can focus on the right issue.
        </p>
        <ul className={listClass}>
          <li><Link to="/expertise/property-title-verification-due-diligence/" className={linkClass}>Buying or financing property?</Link> Start with ownership history, available title documents and the proposed transaction.</li>
          <li><Link to="/expertise/property-transactions-conveyancing/" className={linkClass}>Preparing an agreement or transfer?</Link> Identify the parties, agreed terms, property schedule and stage of documentation.</li>
          <li><Link to="/expertise/rera-maharera-legal-services/" className={linkClass}>Facing a project or RERA question?</Link> Keep the project identifier, booking or development papers and relevant correspondence together.</li>
          <li><Link to="/expertise/naina-town-planning-scheme-services/" className={linkClass}>Affected by a NAINA plan?</Link> Note the scheme, village, survey number and any CIDCO notice or plot record.</li>
        </ul>
        <h4 className="font-semibold text-navy mb-3">Useful information for a first conversation</h4>
        <p className={copyClass}>
          Share whether the property is a flat, society unit, CIDCO leasehold plot or another type of land; its location and available identifier; and any decision date, notice or proposed signing. If documents are incomplete, say which papers you have. The appropriate searches and authorities depend on the asset and transaction, so a general checklist is a starting point rather than a substitute for reviewing the papers.
        </p>
        <p className="text-[0.9rem] text-navy/80 leading-[1.7]">
          For a registered document or land-record question, see the <Link to="/expertise/property-title-verification-due-diligence/" className={linkClass}>title-review preparation guide and official Maharashtra record portals</Link> before your enquiry.
        </p>
      </section>
    );
  }

  if (slug === 'corporate-commercial-advisory') {
    return (
      <section className={sectionClass} aria-labelledby="corporate-service-guide">
        <h3 id="corporate-service-guide" className={headingClass}>Match the business decision to the legal work</h3>
        <p className={copyClass}>
          Commercial advice is most useful when the transaction, document or governance decision is clear. An agreement for a continuing supply relationship raises different questions from a company investment, shareholder arrangement or ongoing compliance review.
        </p>
        <ul className={listClass}>
          <li><Link to="/expertise/contract-drafting-vetting-transaction-documentation/" className={linkClass}>Contract drafting or review:</Link> identify the counterparties, draft, commercial terms, performance obligations and renewal or exit concerns.</li>
          <li><Link to="/expertise/corporate-commercial-ma-startup-law/" className={linkClass}>Investment or acquisition:</Link> describe the entities, proposed structure and transaction stage before sharing available term sheets or diligence material.</li>
          <li><Link to="/expertise/corporate-compliance-governance-legal-retainership/" className={linkClass}>Governance or recurring support:</Link> identify the decisions, existing policies and approvals that need attention.</li>
          <li><Link to="/expertise/commercial-litigation-arbitration/" className={linkClass}>A live commercial dispute:</Link> flag notices, relevant contract clauses and any immediate date at the outset.</li>
        </ul>
        <h4 className="font-semibold text-navy mb-3">What should a business keep ready?</h4>
        <p className={copyClass}>
          A short explanation of the commercial objective, the entity and counterparties, existing agreements or drafts, key correspondence and the next decision date helps establish the scope. Do not send sensitive transactional documents through a public form; use the first contact to agree an appropriate way to share them. Our <Link to="/insights/contract-drafting-agreement-review-mou-nda/" className={linkClass}>contract-review guide</Link> explains common questions to prepare before a document review.
        </p>
      </section>
    );
  }

  if (slug === 'commercial-litigation-arbitration') {
    return (
      <section className={sectionClass} aria-labelledby="commercial-dispute-guide">
        <h3 id="commercial-dispute-guide" className={headingClass}>Starting with a commercial dispute</h3>
        <p className={copyClass}>
          The right route depends on the agreement, the dispute, any existing proceeding and the next relevant date. The first review should establish the parties, what happened, the relief being sought and whether an arbitration or dispute-resolution clause applies. A clause alone does not settle every forum or procedural question.
        </p>
        <h4 className="font-semibold text-navy mb-3">Keep these records available</h4>
        <ul className={listClass}>
          <li>The signed contract and amendments, especially the governing-law, jurisdiction, notice and dispute-resolution provisions.</li>
          <li>A short chronology with invoices, payment records, performance milestones and material correspondence relevant to the issue.</li>
          <li>Any legal notice, reply, court or tribunal paper, settlement proposal or scheduled hearing date.</li>
          <li>The practical outcome sought and any urgent preservation, response or filing concern.</li>
        </ul>
        <p className={copyClass}>
          For a focused comparison, see <Link to="/expertise/arbitration-mediation-adr/" className={linkClass}>arbitration and mediation support</Link> and the <Link to="/insights/commercial-arbitration-vs-litigation/" className={linkClass}>commercial arbitration versus litigation guide</Link>. Mention any approaching deadline when contacting the firm; the next step can then be assessed against the actual papers.
        </p>
      </section>
    );
  }

  return null;
};

export default ServiceDecisionGuides;
