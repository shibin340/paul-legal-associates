// Selected existing guides that answer questions adjacent to these services.
// Selection is not a claim of substantive legal approval for the whole library.
// The eight maritime articles awaiting review are deliberately absent here.
export const serviceReading: Record<string, string[]> = {
  'banking-finance-securities-debt-restructuring': ['banking-finance-insolvency-debt-recovery', 'banking-disputes-rbi-ombudsman-complaints'],
  'property-real-estate': ['due-diligence-property-transactions', 'property-title-search-legal-due-diligence'],
  'property-title-verification-due-diligence': ['property-title-search-legal-due-diligence', 'due-diligence-property-transactions'],
  'property-transactions-conveyancing': ['due-diligence-property-transactions', 'property-registration-services'],
  'property-registration-services-mumbai-navi-mumbai': ['property-registration-services', 'due-diligence-property-transactions'],
  'rera-maharera-legal-services': ['rera-compliance-checklist-developers', 'maharera-order-non-compliance-execution-recovery'],
  'naina-town-planning-scheme-services': ['naina-town-planning-scheme-rights', 'cidco-naina-airport-land-acquisition-services'],
  'land-acquisition-compensation-matters': ['land-acquisition-compensation-rights', 'land-acquisition-compensation-guide'],
  'navi-mumbai-airport-land-transactions': ['cidco-naina-airport-land-acquisition-services', 'due-diligence-agricultural-non-agricultural-land'],
  'corporate-commercial-advisory': ['starting-business-india-legal-compliance-checklist', 'contract-drafting-agreement-review-mou-nda'],
  'commercial-litigation-arbitration': ['commercial-arbitration-vs-litigation', 'commercial-arbitration-contract-disputes'],
  'labour-employment-hr-workplace-compliance': ['labour-code-readiness-2026', 'pf-esic-factory-contract-labour-compliance'],
  'posh-compliance-internal-committee': ['posh-compliance-employers-mumbai-navi-mumbai', 'posh-compliance-internal-committee-services'],
  'corporate-commercial-ma-startup-law': ['mergers-acquisitions-legal-essentials', 'starting-business-india-legal-compliance-checklist'],
  'arbitration-mediation-adr': ['commercial-arbitration-vs-litigation', 'commercial-arbitration-contract-disputes'],
  'taxation-gst-fiscal-litigation': ['gst-tax-litigation-advisory'],
};

// One preferred service destination per selected article. This avoids a
// generic contact-only ending while keeping the link relevant to the guide.
export const insightServiceLinks: Record<string, string> = {
  'banking-disputes-rbi-ombudsman-complaints': 'banking-finance-securities-debt-restructuring',
  'banking-finance-insolvency-debt-recovery': 'banking-finance-securities-debt-restructuring',
  'contract-labour-compliance-principal-employer-maharashtra': 'labour-employment-hr-workplace-compliance',
  'property-registration-stamp-duty-guidance': 'property-registration-services-mumbai-navi-mumbai',
  'due-diligence-property-transactions': 'property-title-verification-due-diligence',
  'property-title-search-legal-due-diligence': 'property-title-verification-due-diligence',
  'property-registration-services': 'property-registration-services-mumbai-navi-mumbai',
  'rera-compliance-checklist-developers': 'rera-maharera-legal-services',
  'maharera-order-non-compliance-execution-recovery': 'rera-maharera-legal-services',
  'naina-town-planning-scheme-rights': 'naina-town-planning-scheme-services',
  'cidco-naina-airport-land-acquisition-services': 'navi-mumbai-airport-land-transactions',
  'land-acquisition-compensation-rights': 'land-acquisition-compensation-matters',
  'land-acquisition-compensation-guide': 'land-acquisition-compensation-matters',
  'due-diligence-agricultural-non-agricultural-land': 'agricultural-non-agricultural-land-purchase',
  'starting-business-india-legal-compliance-checklist': 'corporate-commercial-advisory',
  'contract-drafting-agreement-review-mou-nda': 'contract-drafting-vetting-transaction-documentation',
  'mergers-acquisitions-legal-essentials': 'corporate-commercial-ma-startup-law',
  'commercial-arbitration-vs-litigation': 'commercial-litigation-arbitration',
  'commercial-arbitration-contract-disputes': 'arbitration-mediation-adr',
  'labour-code-readiness-2026': 'labour-employment-hr-workplace-compliance',
  'pf-esic-factory-contract-labour-compliance': 'labour-employment-hr-workplace-compliance',
  'posh-compliance-internal-committee-services': 'posh-compliance-internal-committee',
  'posh-compliance-employers-mumbai-navi-mumbai': 'posh-compliance-internal-committee',
  'gst-tax-litigation-advisory': 'taxation-gst-fiscal-litigation'
};
