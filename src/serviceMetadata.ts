import type { PracticeArea } from "./types";

type ServiceMetadata = { title: string; description: string };

// Editors can refine priority pages without duplicating title logic across
// the static build, client navigation and page components.
const priority: Record<string, ServiceMetadata> = {
  "property-title-verification-due-diligence": {
    title: "Property Title Verification in Panvel | Paul Legal Associates",
    description: "Review ownership documents, title history and property records before a transaction. Contact Paul Legal Associates in Panvel about a title review."
  },
  "property-transactions-conveyancing": {
    title: "Property Conveyancing in Panvel | Paul Legal Associates",
    description: "Agreements for sale, conveyances, registration and property transfer support for transactions in Panvel and Navi Mumbai."
  },
  "naina-town-planning-scheme-services": {
    title: "NAINA Town Planning Scheme Legal Support | Paul Legal Associates",
    description: "Review original and proposed final plot records, scheme documents and representations concerning land within a NAINA town planning scheme."
  },
  "rera-maharera-legal-services": {
    title: "MahaRERA Complaints and Compliance | Paul Legal Associates",
    description: "Information on MahaRERA project compliance, agreements, homebuyer complaints and developer responses from Paul Legal Associates."
  },
  "labour-employment-hr-workplace-compliance": {
    title: "Employment Law and HR Compliance | Paul Legal Associates",
    description: "Explore employment contracts, workplace policies, PF and ESI support, and statutory compliance work in Navi Mumbai."
  },
  "commercial-litigation-arbitration": {
    title: "Commercial Litigation and Arbitration | Paul Legal Associates",
    description: "Dispute resolution and representation before courts, tribunals and authorities, including commercial arbitration."
  },
  "corporate-commercial-advisory": {
    title: "Corporate Contracts and Advisory | Paul Legal Associates",
    description: "Commercial contracts, transaction documents, corporate governance and ongoing legal support for businesses."
  },
  "arbitration-mediation-adr": {
    title: "Arbitration and Mediation Legal Support | Paul Legal Associates",
    description: "Explore arbitration, mediation and alternative dispute resolution services from Paul Legal Associates."
  },
  "maritime-shipping-admiralty-law": {
    title: "Maritime and Admiralty Legal Services | Paul Legal Associates",
    description: "Information on maritime, shipping and admiralty matters handled by Paul Legal Associates."
  },
  "property-registration-services-mumbai-navi-mumbai": {
    title: "Property Registration Assistance in Navi Mumbai | Paul Legal Associates",
    description: "Property document registration and related support for transactions in Mumbai and Navi Mumbai."
  },
  "testamentary-succession-bombay-high-court": {
    title: "Testamentary and Succession Matters in Mumbai | Paul Legal Associates",
    description: "Information on testamentary and succession proceedings, including matters before the Bombay High Court."
  },
  "wills-succession-probate-trusts-estate-planning": {
    title: "Wills, Probate and Estate Planning Services | Paul Legal Associates",
    description: "Explore wills, succession, probate, trusts and estate planning matters handled by Paul Legal Associates."
  }
};

export const getServiceMetadata = (area: Pick<PracticeArea, "slug" | "title" | "shortDesc">): ServiceMetadata =>
  priority[area.slug] || {
    title: `${area.title} | Paul Legal Associates`,
    description: `${area.title}: ${area.shortDesc} Paul Legal Associates, Navi Mumbai.`
  };
