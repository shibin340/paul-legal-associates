import React from 'react';
import { Link } from 'react-router-dom';
import { remainingDecisionGuides } from '../serviceDecisionGuideData';

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

  if (slug === 'rera-maharera-legal-services') {
    return (
      <section className={sectionClass} aria-labelledby="rera-service-guide">
        <h3 id="rera-service-guide" className={headingClass}>Start with the project and the decision you need to make</h3>
        <p className={copyClass}>
          A homebuyer questioning a possession date, a promoter reviewing project disclosures and an agent dealing with registration have different records and next steps. Tell us which role you have, the project involved and whether a complaint or order already exists.
        </p>
        <h4 className="font-semibold text-navy mb-3">Information to keep ready</h4>
        <ul className={listClass}>
          <li>Project name, location and MahaRERA registration number, if available.</li>
          <li>Booking or allotment papers, agreement, payment record and the possession or completion date communicated to you.</li>
          <li>Material correspondence, notices, revised plans or disclosures relevant to the question.</li>
          <li>Any existing complaint number, order, appeal or approaching response date.</li>
        </ul>
        <p className={copyClass}>
          The <a href="https://maharera.maharashtra.gov.in/" target="_blank" rel="noopener noreferrer" className={linkClass}>official MahaRERA portal</a> is a starting point for checking public project and complaint information. Match any portal record to your own documents; the appropriate response depends on the actual papers and stage of the matter.
        </p>
        <p className="text-[0.9rem] text-navy/80 leading-[1.7]">
          If the immediate question is ownership or a proposed purchase, see our <Link to="/expertise/property-title-verification-due-diligence/" className={linkClass}>property title-review guide</Link>. For a project-compliance question, the <Link to="/insights/rera-compliance-checklist-developers/" className={linkClass}>MahaRERA developer checklist</Link> provides a separate starting point.
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

  const guide = remainingDecisionGuides[slug];
  if (!guide) return null;
  const headingId = `${slug}-decision-guide`;
  return (
    <section className={sectionClass} aria-labelledby={headingId}>
      <h3 id={headingId} className={headingClass}>{guide.heading}</h3>
      <p className={copyClass}>{guide.introduction}</p>
      <h4 className="font-semibold text-navy mb-3">Information to prepare for the first discussion</h4>
      <ul className={listClass}>{guide.documents.map(item => <li key={item}>{item}</li>)}</ul>
      <h4 className="font-semibold text-navy mb-3">How the initial review can proceed</h4>
      <ol className="list-decimal pl-5 space-y-2 text-[0.9rem] text-navy/80 leading-[1.7] mb-7">
        {guide.steps.map(item => <li key={item}>{item}</li>)}
      </ol>
      <p className={copyClass}>{guide.consideration}</p>
      <h4 className="font-semibold text-navy mb-3">Official resources</h4>
      <ul className={listClass}>
        {guide.sources.map(item => <li key={item.href}><a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>{item.label}</a></li>)}
      </ul>
      <nav aria-label="Related preparation and practice information" className="bg-cream p-5 border border-navy/10">
        <h4 className="font-semibold text-navy mb-3">Related preparation and practice information</h4>
        <ul className="list-disc pl-5 space-y-2 text-[0.9rem]">
          {guide.related.map(item => <li key={item.href}><Link to={item.href} className={linkClass}>{item.label}</Link></li>)}
        </ul>
      </nav>
      <p className="mt-5 text-[0.78rem] text-muted">Preparation guidance updated <time dateTime="2026-10-05">5 October 2026</time>.</p>
    </section>
  );
};

export default ServiceDecisionGuides;
