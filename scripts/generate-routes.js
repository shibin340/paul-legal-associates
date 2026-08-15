import fs from 'fs';
import path from 'path';

/**
 * ══ STATIC / CORE PAGES ══
 */
const CORE_ROUTES = [
  '/about',
  '/expertise',
  '/partners',
  '/insights',
  '/contact'
];

/**
 * ══ PARTNER PROFILE ROUTES ══
 */
const PARTNER_ROUTES = [
  '/partners/pp-polachan',
  '/partners/sojan-paul',
  '/partners/sonam-paul'
];

/**
 * ══ PRACTICE AREA ROUTES (81 TOTAL) ══
 */
const PRACTICE_AREA_ROUTES = [
  // Core Practice Areas
  '/expertise/property-real-estate',
  '/expertise/commercial-litigation-arbitration',
  '/expertise/legal-compliance-audit',
  '/expertise/banking-laws',
  '/expertise/corporate-commercial-advisory',
  '/expertise/naina-town-planning-scheme-services',
  '/expertise/agricultural-non-agricultural-land-purchase',
  '/expertise/land-acquisition-compensation-matters',
  '/expertise/navi-mumbai-airport-land-transactions',
  '/expertise/testamentary-succession-bombay-high-court',
  '/expertise/maharera-advisory-compliance-litigation',
  '/expertise/supreme-court-civil-property-litigation',
  '/expertise/property-registration-services-mumbai-navi-mumbai',
  '/expertise/revenue-authority-municipal-legal-services',
  '/expertise/property-permissions-approvals-regulatory-compliance',
  '/expertise/property-transactions-conveyancing',
  '/expertise/property-title-verification-due-diligence',
  '/expertise/land-laws-revenue-records-agricultural-matters',
  '/expertise/cidco-naina-navi-mumbai-airport-land',
  '/expertise/land-acquisition-compensation-infrastructure-projects',
  '/expertise/real-estate-development-construction-redevelopment',
  '/expertise/rera-maharera-legal-services',
  '/expertise/cooperative-housing-society-apartment-law',
  '/expertise/property-tenancy-real-estate-litigation',
  '/expertise/civil-commercial-litigation',
  '/expertise/arbitration-mediation-adr',
  '/expertise/corporate-commercial-ma-startup-law',
  '/expertise/contract-drafting-vetting-transaction-documentation',
  '/expertise/corporate-compliance-governance-legal-retainership',
  '/expertise/labour-employment-hr-workplace-compliance',
  '/expertise/banking-finance-securities-debt-restructuring',
  '/expertise/insolvency-bankruptcy-nclt-nclat-proceedings',
  '/expertise/debt-recovery-cheque-bounce-msme-disputes',
  '/expertise/criminal-defence-bail-cybercrime-white-collar',
  '/expertise/family-matrimonial-law',
  '/expertise/wills-succession-probate-trusts-estate-planning',
  '/expertise/consumer-protection-insurance-professional-negligence',
  '/expertise/constitutional-administrative-public-law',
  '/expertise/intellectual-property-technology-ai-data-protection',
  '/expertise/maritime-shipping-admiralty-law',
  '/expertise/international-trade-fema-cross-border-business',
  '/expertise/personal-documentation-certificates-procedural-services',

  // Specialized Practice Areas
  '/expertise/aviation-airport-aeronautical-law',
  '/expertise/logistics-warehousing-supply-chain-law',
  '/expertise/public-procurement-tender-government-contracts',
  '/expertise/healthcare-hospital-clinical-establishment-law',
  '/expertise/food-restaurant-hotel-hospitality-law',
  '/expertise/education-institutional-law',
  '/expertise/cooperative-credit-society-multistate-law',
  '/expertise/competition-antitrust-unfair-market-practices',
  '/expertise/technology-transactions-saas-ai-digital-platform-law',
  '/expertise/renewable-energy-electric-mobility-infrastructure',
  '/expertise/construction-contracts-epc-infrastructure-claims',
  '/expertise/franchise-dealership-distribution-law',
  '/expertise/trusts-charities-ngos-section-8',
  '/expertise/white-collar-crime-corporate-fraud-investigations',
  '/expertise/media-entertainment-sports-influencer-law',
  '/expertise/data-centre-cloud-infrastructure-telecom-law',
  '/expertise/airport-port-logistics-infrastructure-services',
  '/expertise/customs-foreign-trade-import-export-law',
  '/expertise/fintech-digital-lending-payment-systems-law',
  '/expertise/pharmaceutical-drugs-cosmetics-medical-devices-law',
  '/expertise/product-liability-recall-consumer-safety-law',
  '/expertise/advertising-marketing-brand-communications-law',
  '/expertise/defence-aerospace-security-contracts',
  '/expertise/mining-minerals-quarrying-royalty-law',
  '/expertise/agricultural-business-food-processing-commodity-trade',
  '/expertise/startup-venture-capital-founder-advisory',
  '/expertise/family-business-promoter-shareholder-advisory',
  '/expertise/taxation-gst-fiscal-litigation',
  '/expertise/municipal-licensing-trade-permissions-local-authority',
  '/expertise/anti-bribery-anti-corruption-business-ethics',
  '/expertise/esg-sustainability-business-responsibility-advisory',
  '/expertise/sanctions-export-controls-international-trade-compliance',
  '/expertise/industrial-licensing-manufacturing-regulatory-law',
  '/expertise/immigration-citizenship-corporate-global-mobility',
  '/expertise/senior-citizens-elder-law-maintenance-tribunal',
  '/expertise/luxury-goods-art-antiquities-cultural-property-law',
  '/expertise/private-wealth-family-office-asset-holding',
  '/expertise/professional-disciplinary-regulatory-proceedings',
  '/expertise/international-commercial-transactions-cross-border',
  '/expertise/reputation-protection-crisis-response-law'
];

/**
 * ══ INSIGHTS & ARTICLE ROUTES ══
 */
const INSIGHT_ROUTES = [
  // Initial Core Insights
  '/insights/rera-compliance-checklist-developers',
  '/insights/labour-code-readiness-2026',
  '/insights/land-acquisition-compensation-rights',
  '/insights/commercial-arbitration-vs-litigation',
  '/insights/due-diligence-property-transactions',
  '/insights/mergers-acquisitions-legal-essentials',
  '/insights/naina-town-planning-scheme-developers',
  '/insights/due-diligence-agricultural-non-agricultural-land',
  '/insights/land-acquisition-compensation-guide',
  '/insights/testamentary-succession-bombay-high-court',
  '/insights/revenue-authority-municipal-legal-services',
  '/insights/property-registration-services',
  '/insights/cidco-naina-airport-land-acquisition-services',
  '/insights/legal-audit-regulatory-compliance-services',
  '/insights/divorce-proceedings-cruelty-domestic-violence',
  '/insights/legal-heirship-succession-certificate-proceedings',
  '/insights/civil-commercial-litigation-supreme-court',
  '/insights/arbitration-mediation-adr',
  '/insights/banking-finance-insolvency-debt-recovery',
  '/insights/property-permissions-approvals-regulatory-compliance',
  '/insights/wills-succession-estate-planning-services',
  '/insights/probate-letters-administration-private-trusts',
  '/insights/maritime-shipping-admiralty-law-services',

  // Real Estate, Criminal & Family Law Series
  '/insights/property-lawyer-panvel-flats-plots-land',
  '/insights/property-lawyer-navi-mumbai-cidco-society',
  '/insights/agricultural-property-lawyer-raigad',
  '/insights/property-title-search-legal-due-diligence',
  '/insights/resale-flat-verification-purchase-mumbai',
  '/insights/sale-deed-agreement-property-drafting',
  '/insights/property-registration-stamp-duty-guidance',
  '/insights/cidco-transfer-noc-leasehold-services',
  '/insights/rera-builder-dispute-lawyer-maharashtra',
  '/insights/civil-property-disputes-injunctions',
  '/insights/partition-ancestral-property-disputes-lawyer',
  '/insights/landlord-tenant-eviction-matters-lawyer',
  '/insights/cooperative-housing-society-management',
  '/insights/society-deemed-conveyance-redevelopment',
  '/insights/agricultural-land-purchase-vetting',
  '/insights/712-extract-mutation-record-audits',
  '/insights/na-conversion-land-permissions-maharashtra',
  '/insights/land-acquisition-compensation-proceedings',
  '/insights/nmia-pap-entitlement-tracking',
  '/insights/third-mumbai-pooling-schemes',
  '/insights/encroachment-boundary-land-disputes',
  '/insights/joint-development-pacts-mous',
  '/insights/nri-property-compliance-fema',
  '/insights/property-notices-title-disputes',
  '/insights/family-divorce-lawyer-navi-mumbai',
  '/insights/mutual-consent-divorce-settlements',
  '/insights/contested-divorce-matrimonial-litigation',
  '/insights/maintenance-alimony-financial-relief',
  '/insights/child-custody-guardianship-visitation-services',
  '/insights/domestic-violence-civil-reliefs',
  '/insights/498a-criminal-cruelty-defence',
  '/insights/court-marriage-registration-guidance',
  '/insights/will-drafting-estate-planning-registration',
  '/insights/probate-letters-administration-bombay-high-court',
  '/insights/succession-certificates-asset-transfers',
  '/insights/family-settlement-release-relinquishment-deeds',
  '/insights/criminal-lawyer-fir-police-inquiry',
  '/insights/bail-anticipatory-bail-services',
  '/insights/fir-quashing-criminal-writ-petitions',
  '/insights/cheating-forgery-breach-of-trust',
  '/insights/white-collar-crime-eow-investigations',
  '/insights/civil-criminal-defamation-services',
  '/insights/cybercrime-online-financial-fraud',
  '/insights/frozen-bank-account-mule-investigations',
  '/insights/cyberstalking-sextortion-legal-help',
  '/insights/digital-evidence-electronic-records-admissibility',
  '/insights/legal-notice-reply-services-maharashtra',
  '/insights/cheque-bounce-negotiable-instruments-act',
  '/insights/money-recovery-dues-summary-suits',
  '/insights/commercial-arbitration-contract-disputes',
  '/insights/consumer-commission-court-services',
  '/insights/builder-complaints-maharera-consumer-commission',
  '/insights/drt-sarfaesi-secured-loan-disputes',
  '/insights/banking-disputes-rbi-ombudsman-complaints',
  '/insights/insurance-claim-rejection-ombudsman-appeals',
  '/insights/motor-accident-claims-tribunals-mact',
  '/insights/medical-negligence-healthcare-disputes',
  '/insights/corporate-legal-retainership-general-counsel',
  '/insights/contract-drafting-agreement-review-mou-nda',
  '/insights/startup-legal-services-founders-early-stage',
  '/insights/partnership-llp-shareholder-disputes',
  '/insights/nclt-insolvency-company-dispute-services',
  '/insights/labour-employment-law-services',
  '/insights/wrongful-termination-unpaid-salary-claims',
  '/insights/domestic-inquiry-employee-misconduct-proceedings',
  '/insights/posh-compliance-internal-committee-services',
  '/insights/pf-esic-factory-contract-labour-compliance',
  '/insights/trademark-registration-brand-protection-ip',
  '/insights/bombay-high-court-writ-petitions-judicial-review',
  '/insights/notary-notarisation-guidance-services',
  '/insights/power-of-attorney-drafting-stamping-registration',
  '/insights/affidavit-declaration-undertaking-drafting',
  '/insights/name-change-gazette-publication-identity-correction',
  '/insights/passport-travel-document-identity-disputes',
  '/insights/nri-legal-services-property-family-litigation',

  // Sectoral Practice Insights Series
  '/insights/aviation-airport-law-navi-mumbai',
  '/insights/logistics-warehousing-law-navi-mumbai',
  '/insights/government-tender-procurement-law',
  '/insights/healthcare-hospital-law-navi-mumbai',
  '/insights/food-hospitality-law-navi-mumbai',
  '/insights/education-law-institutional-advisory',
  '/insights/cooperative-credit-society-law',
  '/insights/competition-and-antitrust-law',
  '/insights/technology-saas-ai-law-advisory',
  '/insights/renewable-energy-ev-law-advisory',
  '/insights/construction-epc-law-claims',
  '/insights/franchise-distribution-law-advisory',
  '/insights/trust-ngo-section-8-law',
  '/insights/white-collar-crime-corporate-investigations-law',
  '/insights/media-sports-influencer-law-advisory',
  '/insights/data-centre-telecom-law',
  '/insights/airport-port-infrastructure-law-navi-mumbai',
  '/insights/customs-import-export-law-advisory',
  '/insights/fintech-digital-lending-law',
  '/insights/pharma-medical-devices-law',
  '/insights/product-liability-law-advisory',
  '/insights/advertising-marketing-law-compliance',
  '/insights/defence-aerospace-contracts-law',
  '/insights/mining-quarrying-law-advisory',
  '/insights/agribusiness-commodity-law',
  '/insights/startup-venture-capital-law-advisory',
  '/insights/family-business-shareholder-law',
  '/insights/gst-tax-litigation-advisory',
  '/insights/municipal-licensing-law-compliance',
  '/insights/anti-bribery-ethics-compliance-law',
  '/insights/esg-sustainability-law-advisory',
  '/insights/sanctions-export-control-law',
  '/insights/manufacturing-industrial-licensing-law',
  '/insights/immigration-global-mobility-law',
  '/insights/senior-citizens-elder-law-tribunal-matters',
  '/insights/art-antiquities-luxury-goods-law',
  '/insights/private-wealth-family-office-law',
  '/insights/professional-disciplinary-proceedings-law',
  '/insights/international-commercial-transactions-law',
  '/insights/reputation-protection-crisis-law',

  // Corporate & Regulatory Compliance Series
  '/insights/posh-compliance-employers-mumbai-navi-mumbai',
  '/insights/starting-business-india-legal-compliance-checklist',
  '/insights/maharera-order-non-compliance-execution-recovery',
  '/insights/msme-delayed-payment-recovery-msefc',
  '/insights/commercial-leave-license-security-deposit-repair-disputes',
  '/insights/contract-labour-compliance-principal-employer-maharashtra',
  '/insights/legal-ehs-compliance-audit-warehouse-manufacturing',
  '/insights/dpdp-compliance-businesses-india-2026'
];

/**
 * Combine and deduplicate all routes
 */
const ALL_ROUTES = Array.from(
  new Set([
    ...CORE_ROUTES,
    ...PARTNER_ROUTES,
    ...PRACTICE_AREA_ROUTES,
    ...INSIGHT_ROUTES
  ])
);

// Target build folder ('build' for Create React App)
const buildDir = path.resolve('build');
const sourceIndex = path.join(buildDir, 'index.html');

console.log(`\n🚀 Starting static route generation for ${ALL_ROUTES.length} routes...`);

if (fs.existsSync(sourceIndex)) {
  let createdCount = 0;

  ALL_ROUTES.forEach((route) => {
    // Remove leading slash for path resolution
    const cleanRoute = route.startsWith('/') ? route.slice(1) : route;
    const routeDir = path.join(buildDir, cleanRoute);

    // Create physical directory structure
    fs.mkdirSync(routeDir, { recursive: true });

    // Copy index.html into directory
    fs.copyFileSync(sourceIndex, path.join(routeDir, 'index.html'));
    createdCount++;
  });

  console.log(`✅ Successfully generated ${createdCount} static route directories in /dist.`);
  console.log(`🔒 GitHub Pages will now return 200 OK headers for all deep URLs.\n`);
} else {
  console.error(`❌ Error: Source file not found at ${sourceIndex}. Please ensure you run build before this script.`);
  process.exit(1);
}