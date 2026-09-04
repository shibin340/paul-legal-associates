import React, { useState } from "react";
import { Link } from "react-router-dom";
import CredentialsBar from "../components/ui/CredentialsBar";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const FAQS = [
  {
    q: "Can Paul Legal Associates coordinate accounting, tax and compliance requirements together?",
    a: "Yes. Depending on the engagement, we can coordinate accounting, payroll, tax, corporate compliance and regulatory workstreams through a single engagement framework, while involving appropriately qualified professionals wherever statutory certification or specialised professional services are required."
  },
  {
    q: "Do you assist foreign companies setting up or operating in India?",
    a: "Yes. We assist with India-entry structuring, Indian subsidiaries, Liaison Offices, Branch Offices, Project Offices, FEMA/FDI considerations, taxation, banking coordination and ongoing compliance."
  },
  {
    q: "Can you assist with FDI and RBI/FIRMS filings?",
    a: "Yes. We assist with foreign-investment transactions and applicable FEMA/RBI reporting, including FC-GPR, FC-TRS and other applicable reporting under the FIRMS / Single Master Form framework."
  },
  {
    q: "Do you assist Indian companies investing overseas?",
    a: "Yes. We assist with Overseas Direct Investment, overseas subsidiaries and joint ventures, AD Bank requirements, remittances and applicable reporting."
  },
  {
    q: "Do you provide Transfer Pricing support?",
    a: "Yes. Engagements may include transaction identification, benchmarking, documentation, Form 3CEB coordination, Form 3CEAA / Master File support and other applicable Transfer Pricing requirements."
  },
  {
    q: "Can you support ECB transactions?",
    a: "Yes. We assist with structuring, LRN coordination, drawdowns, permitted end-use review, reporting, repayments, hedging-related coordination and AD Bank interaction."
  },
  {
    q: "Can you provide Virtual CFO support?",
    a: "Yes. Virtual CFO engagements can be structured for startups, SMEs, foreign subsidiaries and growing businesses requiring MIS, budgeting, cash-flow planning and periodic senior financial oversight."
  },
  {
    q: "Can recurring monthly compliances be covered under one engagement?",
    a: "Yes. Depending on the business, a coordinated monthly or annual engagement can cover accounting, payroll, GST, TDS, tax, ROC and other recurring financial and regulatory requirements."
  }
];

const ENGAGEMENT_MODELS = [
  "Monthly Accounting & Compliance Retainer",
  "Finance & Tax Retainer",
  "Virtual CFO Engagement",
  "Payroll & Employee Compliance Engagement",
  "Annual Tax & Regulatory Compliance Package",
  "Audit / Quarterly Review Coordination Assignment",
  "Transfer Pricing Engagement",
  "FEMA & RBI Compliance Engagement",
  "FDI / ODI / ECB Transaction Assignment",
  "India Entry Mandate",
  "M&A / Restructuring Assignment",
  "Integrated Finance, Tax & Regulatory Retainership"
];

const FinanceTaxRegulatoryAdvisory: React.FC = () => {
  useDocumentTitle("Finance, Tax & Regulatory Advisory in India | Paul Legal Associates", true);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* ══ HERO SECTION ══ */}
      <section className="page-hero-wrapper relative overflow-hidden" aria-label="Finance, Tax and Regulatory Advisory hero">
        <div className="absolute inset-0 bg-page-hero-radial z-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-page-grid-lines z-0" aria-hidden="true" />

        <div className="relative z-10 max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Left Column: Content (7 cols) */}
            <div className="lg:col-span-7 animate-pageFadeIn">
              <div className="eyebrow-row">
                <div className="eyebrow-line" />
                <span className="eyebrow-text">Practice Vertical</span>
              </div>
              <h1 className="font-serif font-bold text-cream leading-[1.1] mt-3 mb-4" style={{ fontSize: "clamp(2.1rem,4.2vw,3.6rem)" }}>
                Finance, Tax & Regulatory Advisory
              </h1>
              <p className="text-gold font-serif-alt italic text-[1.1rem] sm:text-[1.25rem] mb-5">
                Integrated Finance, Tax, Compliance & Cross-Border Solutions for Businesses
              </p>
              <div className="font-serif-alt font-light text-cream/80 leading-[1.75] text-[0.98rem] space-y-3.5">
                <p>
                  Business decisions increasingly sit at the intersection of law, finance, taxation, accounting and regulation. A company may be commercially ready to transact, yet still face delays or exposure because its financial records, tax position, FEMA requirements, banking documentation or statutory filings have not been aligned.
                </p>
                <p>
                  Paul Legal Associates provides a coordinated advisory platform covering finance, accounting, taxation, payroll, audit coordination, corporate compliance, transfer pricing, FEMA/RBI matters, foreign investment and cross-border transactions.
                </p>
                <p>
                  We work in collaboration with a network of Chartered Accountants, Company Secretaries, tax professionals, valuation professionals, banking specialists and other regulatory advisors, where required, to provide clients with a practical and coordinated solution.
                </p>
                <p>
                  Whether you are an Indian company managing recurring financial compliances, a growing business requiring stronger reporting and controls, a foreign subsidiary operating in India, or an overseas investor implementing an India transaction, our objective is to support the complete business and regulatory lifecycle.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gold/20 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="text-cream text-[0.92rem] font-medium">
                  Looking for an integrated Finance, Tax & Regulatory Partner?
                </div>
                <div className="flex gap-4 flex-wrap">
                  <Link to="/contact" className="btn-outline-navy !text-cream !border-cream/30 hover:!border-gold">
                    Send Us Your Requirement
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Spiral Orbit Visual (5 cols) */}
            <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative">
              {/* <PlaFinance3DOrbit /> */}
              <img src='/images/ChatGPT.webp' alt='Finance, tax, regulatory compliance and growth represented as a connected advisory orbit' className='object-contain pointer-events-none' />
            </div>

          </div>
        </div>
      </section>

      {/* ══ FOUR PILLARS ══ */}
      <section className="bg-cream py-20 px-[5vw] border-b border-navy/10">
        <div className="max-w-8xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-4">
              One Advisory Platform. Multiple Business Requirements.
            </h2>
            <p className="text-muted leading-[1.8] text-[0.95rem]">
              Businesses often engage separate providers for accounting, payroll, taxation, corporate filings, FEMA, transfer pricing and banking-related matters. Without coordination, this can result in duplication, inconsistent positions and missed dependencies. Our model brings relevant workstreams together under a single coordinated framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 border border-navy/10 shadow-xs hover:border-gold transition-colors">
              <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center text-xl mb-4">📊</div>
              <h3 className="font-serif font-bold text-navy text-[1.1rem] mb-2">Finance & Financial Control</h3>
              <p className="text-[0.88rem] text-muted leading-relaxed">
                Accounting, bookkeeping, MIS, payroll, financial reporting, forecasting and business finance support.
              </p>
            </div>

            <div className="bg-white p-6 border border-navy/10 shadow-xs hover:border-gold transition-colors">
              <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center text-xl mb-4">📑</div>
              <h3 className="font-serif font-bold text-navy text-[1.1rem] mb-2">Tax & Transfer Pricing</h3>
              <p className="text-[0.88rem] text-muted leading-relaxed">
                Corporate tax, GST, TDS, advance tax, transfer pricing, annual tax compliance and international taxation.
              </p>
            </div>

            <div className="bg-white p-6 border border-navy/10 shadow-xs hover:border-gold transition-colors">
              <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center text-xl mb-4">📋</div>
              <h3 className="font-serif font-bold text-navy text-[1.1rem] mb-2">Regulatory Compliance</h3>
              <p className="text-[0.88rem] text-muted leading-relaxed">
                ROC, annual corporate filings, FLA, FEMA/RBI reporting and transaction-related regulatory support.
              </p>
            </div>

            <div className="bg-white p-6 border border-navy/10 shadow-xs hover:border-gold transition-colors">
              <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center text-xl mb-4">🌐</div>
              <h3 className="font-serif font-bold text-navy text-[1.1rem] mb-2">Cross-Border Advisory</h3>
              <p className="text-[0.88rem] text-muted leading-relaxed">
                FDI, ODI, ECB, foreign remittances, banking documentation, India entry, repatriation and international transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CORE SERVICES (01 - 10) ══ */}
      <section className="bg-white py-24 px-[5vw]">
        <div className="max-w-8xl mx-auto">
          <div className="eyebrow-row mb-2">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">Comprehensive Service Index</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy mb-14">
            Our Finance & Tax Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* 01 */}
            <div className="border border-navy/10 p-7 bg-cream/30">
              <h3 className="font-serif text-[1.25rem] font-bold text-navy mb-3">Accounting, Bookkeeping, MIS & Financial Reporting</h3>
              <p className="text-[0.88rem] text-muted mb-4">
                We assist businesses in maintaining accurate, reliable and audit-ready financial records while creating reporting discipline for management decision-making.
              </p>
              <ul className="text-[0.82rem] text-navy/80 space-y-2 list-disc pl-5">
                <li>Maintenance of accounting records in Tally, ERP and cloud accounting systems.</li>
                <li>Invoice preparation, invoicing recognition, and recording inward remittances.</li>
                <li>FIRC, inward remittance review, and invoice matching.</li>
                <li>Journal vouchers for expenses, accruals, prepayments, and adjustments.</li>
                <li>Recording bank deposits, withdrawals, receipts, payments, and Bank Reconciliation Statements.</li>
                <li>Fixed Asset Management, depreciation computations, and Fixed Asset Register updates.</li>
                <li>E-Invoicing and E-Way Bill compliance.</li>
                <li>Month-end closing, annual closing, and monthly MIS (P&L, Balance Sheet, Cash Flow).</li>
                <li>Budgeting, financial forecasting, and working capital review.</li>
              </ul>
            </div>

            {/* 02 */}
            <div className="border border-navy/10 p-7 bg-cream/30">
              <h3 className="font-serif text-[1.25rem] font-bold text-navy mb-3">Virtual CFO & Business Finance Advisory</h3>
              <p className="text-[0.88rem] text-muted mb-4">
                For businesses requiring senior financial oversight without the overhead of an in-house CFO.
              </p>
              <ul className="text-[0.82rem] text-navy/80 space-y-2 list-disc pl-5">
                <li>Periodic management-level financial review and strategic advisory.</li>
                <li>Budgeting, financial planning, and operational cash-flow forecasting.</li>
                <li>Cost-control, burn-rate management, and unit-level profitability analysis.</li>
                <li>Executive MIS reporting and dynamic financial dashboards.</li>
                <li>Internal control improvements and process automation.</li>
                <li>Investor-ready financial packs and financial diligence preparation.</li>
                <li>Fundraising models, cap-table governance, and banking representations.</li>
              </ul>
            </div>

            {/* 03 */}
            <div className="border border-navy/10 p-7 bg-cream/30">
              <h3 className="font-serif text-[1.25rem] font-bold text-navy mb-3">Payroll Processing & Employee Statutory Compliance</h3>
              <p className="text-[0.88rem] text-muted mb-4">
                End-to-end payroll administration paired with robust statutory compliance.
              </p>
              <ul className="text-[0.82rem] text-navy/80 space-y-2 list-disc pl-5">
                <li>Monthly employee payroll register compilation and payslip distribution.</li>
                <li>Reimbursement claim verifications and full-and-final (FnF) settlements.</li>
                <li>Salary withholding tax calculations, investment proofs, and HRA reviews.</li>
                <li>Provident Fund (PF), Employees' State Insurance (ESI), and Professional Tax filings.</li>
                <li>UAN generation, employee KYC, and statutory record maintenance.</li>
              </ul>
            </div>

            {/* 04 */}
            <div className="border border-navy/10 p-7 bg-cream/30">
              <h3 className="font-serif text-[1.25rem] font-bold text-navy mb-3">TDS & Withholding Tax Compliance</h3>
              <p className="text-[0.88rem] text-muted mb-4">
                Ongoing withholding tax computation, reconciliation, and regulatory filing support.
              </p>
              <ul className="text-[0.82rem] text-navy/80 space-y-2 list-disc pl-5">
                <li>Computation and review of domestic and cross-border withholding tax.</li>
                <li>Form 24Q (Salary TDS) and Form 26Q (Non-Salary TDS) quarterly filings.</li>
                <li>Form 27Q filings for payments made to non-residents.</li>
                <li>TDS reconciliation with Form 26AS/AIS and resolution of demand notices.</li>
              </ul>
            </div>

            {/* 05 */}
            <div className="border border-navy/10 p-7 bg-cream/30">
              <h3 className="font-serif text-[1.25rem] font-bold text-navy mb-3">GST Compliance, Reconciliation & Advisory</h3>
              <p className="text-[0.88rem] text-muted mb-4">
                Monthly filings, input tax credit optimization, and dispute resolution.
              </p>
              <ul className="text-[0.82rem] text-navy/80 space-y-2 list-disc pl-5">
                <li>Preparation and filing of GSTR-1 and GSTR-3B.</li>
                <li>Input Tax Credit (ITC) reconciliation with GSTR-2B.</li>
                <li>Annual GST returns and reconciliations (GSTR-9 and GSTR-9C).</li>
                <li>GST refund applications (export of goods/services, inverted duty).</li>
                <li>Advisory on departmental notices, audits, and contentious GST matters.</li>
              </ul>
            </div>

            {/* 06 */}
            <div className="border border-navy/10 p-7 bg-cream/30">
              <h3 className="font-serif text-[1.25rem] font-bold text-navy mb-3">Corporate Income Tax, Advance Tax & Compliance</h3>
              <p className="text-[0.88rem] text-muted mb-4">
                Managing corporate income tax computations, quarterly advance tax, and annual returns.
              </p>
              <ul className="text-[0.82rem] text-navy/80 space-y-2 list-disc pl-5">
                <li>Tax projections and quarterly advance tax computation.</li>
                <li>Challan preparation and tax deposit verification.</li>
                <li>Annual Computation of Income and Corporate Tax Return filing.</li>
                <li>Advisory on MAT, deferred tax, and tax-loss carry forwards.</li>
              </ul>
            </div>

            {/* 07 */}
            <div className="border border-navy/10 p-7 bg-cream/30">
              <h3 className="font-serif text-[1.25rem] font-bold text-navy mb-3">Audit, Assurance & Review Coordination</h3>
              <p className="text-[0.88rem] text-muted mb-4">
                Statutory certifications are coordinated through independent, eligible professionals.
              </p>
              <ul className="text-[0.82rem] text-navy/80 space-y-2 list-disc pl-5">
                <li>Statutory Audit support under the Companies Act, 2013 and Ind AS/AS alignment.</li>
                <li>Tax Audit preparation and coordination under Section 44AB.</li>
                <li>Quarterly financial reviews, interim audits, and ledger scrutiny.</li>
                <li>Voucher audits, related-party transaction scrutiny, and fixed-asset verification.</li>
              </ul>
            </div>

            {/* 08 */}
            <div className="border border-navy/10 p-7 bg-cream/30">
              <h3 className="font-serif text-[1.25rem] font-bold text-navy mb-3">Transfer Pricing Documentation & Reporting</h3>
              <p className="text-[0.88rem] text-muted mb-4">
                Comprehensive compliance for cross-border and specified domestic related-party transactions.
              </p>
              <ul className="text-[0.82rem] text-navy/80 space-y-2 list-disc pl-5">
                <li>Form 3CEB preparation, accountant's report, and filing support.</li>
                <li>Transfer pricing study, FAR analysis, and contemporaneous benchmarking.</li>
                <li>Master File (Form 3CEAA Part A & B) and Country-by-Country Reporting (CbCR).</li>
                <li>Arm's-length determination and dispute risk mitigation.</li>
              </ul>
            </div>

            {/* 09 */}
            <div className="border border-navy/10 p-7 bg-cream/30">
              <h3 className="font-serif text-[1.25rem] font-bold text-navy mb-3">Annual ROC, Corporate & FLA Compliance</h3>
              <p className="text-[0.88rem] text-muted mb-4">
                Corporate secretarial and foreign asset reporting obligations.
              </p>
              <ul className="text-[0.82rem] text-navy/80 space-y-2 list-disc pl-5">
                <li>Annual Director KYC (DIR-3 KYC).</li>
                <li>Annual General Meeting documentation (notices, resolutions, minutes).</li>
                <li>ROC Annual Returns: Form AOC-4, MGT-7, and DPT-3.</li>
                <li>Foreign Liabilities and Assets (FLA) return filing with the RBI.</li>
              </ul>
            </div>

            {/* 10 */}
            <div className="border border-navy/10 p-7 bg-cream/30">
              <h3 className="font-serif text-[1.25rem] font-bold text-navy mb-3">Direct, Indirect & Transactional Tax Advisory</h3>
              <p className="text-[0.88rem] text-muted mb-4">
                Structuring complex transactions, domestic re-alignments, and cross-border flows.
              </p>
              <ul className="text-[0.82rem] text-navy/80 space-y-2 list-disc pl-5">
                <li>Cross-border payment structuring and withholding tax optimization.</li>
                <li>Permanent Establishment (PE) exposure assessments.</li>
                <li>Repatriation strategies, dividend payouts, and royalty considerations.</li>
                <li>Advisory for extraordinary commercial transactions and tax assessments.</li>
              </ul>
            </div>
          </div>

          {/* CTA Banner 1 */}
          <div className="mt-14 p-8 bg-navy text-cream flex flex-col md:flex-row items-center justify-between gap-6 border border-gold/30">
            <div>
              <h4 className="font-serif text-xl font-bold text-gold mb-1">Need stronger financial visibility and control?</h4>
              <p className="text-cream/70 text-sm">We can help establish a structured accounting, MIS and financial-review framework tailored to your business.</p>
            </div>
            <Link to="/contact" className="btn-primary flex-shrink-0">Discuss Finance & CFO Support</Link>
          </div>
        </div>
      </section>

      {/* ══ CROSS-BORDER, FEMA & REGULATORY ADVISORY (11 - 19) ══ */}
      <section className="bg-cream py-24 px-[5vw]">
        <div className="max-w-8xl mx-auto">
          <div className="eyebrow-row mb-2">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">International & Regulatory Workstreams</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy mb-3">
            FEMA, RBI, Forex & Cross-Border Advisory
          </h2>
          <p className="text-muted leading-[1.8] max-w-3xl mb-12">
            Cross-border transactions require alignment between commercial documentation, tax treatment, foreign-exchange regulations, banking processes and post-transaction reporting. We assist Indian companies, foreign investors, multinational groups and overseas entities under India's FEMA/RBI framework.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 11 */}
            <div className="bg-white p-6 border border-navy/10 shadow-xs">
              <h3 className="font-serif text-[1.15rem] font-bold text-navy mb-2">FDI, ODI, ECB & Trade Forex</h3>
              <ul className="text-[0.82rem] text-navy/80 space-y-1.5 list-disc pl-4">
                <li>Trade forex documentation and cross-border remittances.</li>
                <li>Foreign Direct Investment (FDI) route and pricing compliance.</li>
                <li>Overseas Direct Investment (ODI) structuring for Indian companies.</li>
                <li>External Commercial Borrowings (ECB) eligibility and filings.</li>
                <li>Capital instrument allotments, transfers, and dividend remittances.</li>
              </ul>
            </div>

            {/* 12 */}
            <div className="bg-white p-6 border border-navy/10 shadow-xs">
              <h3 className="font-serif text-[1.15rem] font-bold text-navy mb-2">RBI FIRMS Filings & Regularisation</h3>
              <ul className="text-[0.82rem] text-navy/80 space-y-1.5 list-disc pl-4">
                <li>Form FC-GPR (allotment of capital instruments) filing.</li>
                <li>Form FC-TRS (transfer of capital instruments) filing.</li>
                <li>ESOP, Convertible Note, and Downstream Investment reporting.</li>
                <li>Single Master Form (SMF) on the RBI FIRMS portal.</li>
                <li>Compounding of contraventions and regularisation of delayed filings.</li>
              </ul>
            </div>

            {/* 13 */}
            <div className="bg-white p-6 border border-navy/10 shadow-xs">
              <h3 className="font-serif text-[1.15rem] font-bold text-navy mb-2">ECB Drawdowns & Treasury Coordination</h3>
              <ul className="text-[0.82rem] text-navy/80 space-y-1.5 list-disc pl-4">
                <li>Loan Registration Number (LRN) generation with the RBI.</li>
                <li>ECB drawdown coordination and permitted end-use reviews.</li>
                <li>Interest-payment tracking and Form ECB-2 monthly returns.</li>
                <li>Hedging, interest rate swap, and foreign-currency volatility support.</li>
              </ul>
            </div>

            {/* 14 */}
            <div className="bg-white p-6 border border-navy/10 shadow-xs">
              <h3 className="font-serif text-[1.15rem] font-bold text-navy mb-2">AD Bank, UIN, Escrow & Foreign Banking</h3>
              <ul className="text-[0.82rem] text-navy/80 space-y-1.5 list-disc pl-4">
                <li>Change of Authorised Dealer (AD) Bank and UIN transfer/migration.</li>
                <li>Cross-border escrow account structuring and agreements.</li>
                <li>Special Non-Resident Rupee (SNRR) and FCNR accounts.</li>
                <li>FIRC issuance, electronic EBRC reconciliation, and KYC documentation.</li>
                <li>Permissible fund repatriation and tax refund transfers.</li>
              </ul>
            </div>

            {/* 15 */}
            <div className="bg-white p-6 border border-navy/10 shadow-xs">
              <h3 className="font-serif text-[1.15rem] font-bold text-navy mb-2">International Taxation & Foreign Entity Tax</h3>
              <ul className="text-[0.82rem] text-navy/80 space-y-1.5 list-disc pl-4">
                <li>Foreign entity Indian tax assessment and tax-refund claims.</li>
                <li>Cross-border withholding tax and DTAA treaty benefits.</li>
                <li>Permanent Establishment (PE) reviews and business connection audits.</li>
                <li>Foreign Tax Credit (FTC) review and Form 67 filings.</li>
              </ul>
            </div>

            {/* 16 */}
            <div className="bg-white p-6 border border-navy/10 shadow-xs">
              <h3 className="font-serif text-[1.15rem] font-bold text-navy mb-2">India Entry & Foreign Setup (LO / BO / PO)</h3>
              <ul className="text-[0.82rem] text-navy/80 space-y-1.5 list-disc pl-4">
                <li>Structuring wholly owned subsidiaries, LLPs, or joint ventures.</li>
                <li>Establishment of Liaison Offices (LO), Branch Offices (BO), and Project Offices (PO).</li>
                <li>RBI approvals, DGFT registrations, and initial capital infusion.</li>
                <li>Exit, liquidation, and repatriation advisory.</li>
              </ul>
            </div>

            {/* 17 */}
            <div className="bg-white p-6 border border-navy/10 shadow-xs">
              <h3 className="font-serif text-[1.15rem] font-bold text-navy mb-2">M&A, Restructuring & Joint Ventures</h3>
              <ul className="text-[0.82rem] text-navy/80 space-y-1.5 list-disc pl-4">
                <li>Mergers, acquisitions, demergers, and capital reorganisations.</li>
                <li>Legal, financial, and tax due diligence coordination.</li>
                <li>Valuation coordination under FEMA and Companies Act.</li>
                <li>Definitive transaction documentation (SHA, SSA, BTA, APA).</li>
              </ul>
            </div>

            {/* 18 */}
            <div className="bg-white p-6 border border-navy/10 shadow-xs">
              <h3 className="font-serif text-[1.15rem] font-bold text-navy mb-2">GIFT City & IFSC Advisory</h3>
              <ul className="text-[0.82rem] text-navy/80 space-y-1.5 list-disc pl-4">
                <li>Assessment of proposed business models in GIFT City IFSC.</li>
                <li>Entity setup, regulatory approvals, and tax holiday structuring.</li>
                <li>Cross-border treasury, leasing, and fund entity coordination.</li>
                <li>Ongoing IFSCA compliance management.</li>
              </ul>
            </div>

            {/* 19 */}
            <div className="bg-white p-6 border border-navy/10 shadow-xs">
              <h3 className="font-serif text-[1.15rem] font-bold text-navy mb-2">Startup, Fundraising & Growth Advisory</h3>
              <ul className="text-[0.82rem] text-navy/80 space-y-1.5 list-disc pl-4">
                <li>Investor-ready financial reporting, models, and cap-table structuring.</li>
                <li>ESOP creation, valuation, and regulatory documentation.</li>
                <li>Due-diligence preparation for angel, seed, and VC funding rounds.</li>
                <li>Working-capital arrangements and transaction support.</li>
              </ul>
            </div>
          </div>

          {/* CTA Banner 2 */}
          <div className="mt-14 p-8 bg-navy text-cream flex flex-col md:flex-row items-center justify-between gap-6 border border-gold/30">
            <div>
              <h4 className="font-serif text-xl font-bold text-gold mb-1">Planning an FDI, ODI, ECB or cross-border transaction?</h4>
              <p className="text-cream/70 text-sm">Early review of FEMA, tax, banking, and reporting requirements eliminates regulatory bottlenecks.</p>
            </div>
            <Link to="/contact" className="btn-primary flex-shrink-0">Discuss a Cross-Border Transaction</Link>
          </div>
        </div>
      </section>

      {/* ══ WHO WE ASSIST & WHY PAUL LEGAL ══ */}
      <section className="bg-white py-24 px-[5vw] border-b border-navy/10">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* Who We Assist */}
            <div>
              <div className="eyebrow-row mb-2">
                <div className="eyebrow-line" />
                <span className="eyebrow-text">Client Focus</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-6">
                Who We Assist
              </h2>
              <div className="space-y-4 text-[0.9rem] text-navy/85">
                <div className="p-4 border-l-2 border-gold bg-cream/40">
                  <strong>Indian Companies:</strong> Accounting, payroll, GST, taxation, audit coordination, ROC and financial compliance.
                </div>
                <div className="p-4 border-l-2 border-gold bg-cream/40">
                  <strong>Startups & Growth Businesses:</strong> Accounting systems, MIS, Virtual CFO support, fundraising readiness and scalable compliance.
                </div>
                <div className="p-4 border-l-2 border-gold bg-cream/40">
                  <strong>SMEs & Promoter-Driven Businesses:</strong> Integrated finance, tax and regulatory support without maintaining multiple internal specialist teams.
                </div>
                <div className="p-4 border-l-2 border-gold bg-cream/40">
                  <strong>Foreign Subsidiaries in India:</strong> Accounting, taxation, payroll, transfer pricing, FEMA, FDI, FLA and corporate compliance.
                </div>
                <div className="p-4 border-l-2 border-gold bg-cream/40">
                  <strong>Multinational Groups:</strong> International taxation, transfer pricing, cross-border transactions and regulatory reporting.
                </div>
                <div className="p-4 border-l-2 border-gold bg-cream/40">
                  <strong>Foreign Investors:</strong> FDI, investment structuring, AD Bank documentation, FEMA reporting and repatriation.
                </div>
                <div className="p-4 border-l-2 border-gold bg-cream/40">
                  <strong>Indian Businesses Expanding Overseas:</strong> ODI, overseas entity structuring, remittances and regulatory compliance.
                </div>
              </div>
            </div>

            {/* Why Paul Legal Associates? */}
            <div>
              <div className="eyebrow-row mb-2">
                <div className="eyebrow-line" />
                <span className="eyebrow-text">Core Value</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-6">
                Why Paul Legal Associates?
              </h2>
              <div className="space-y-5 text-[0.9rem] text-muted">
                <div>
                  <h3 className="font-serif font-bold text-navy text-[1.05rem] mb-1">Integrated Legal, Financial & Regulatory Perspective</h3>
                  <p>Transactions often involve overlapping legal, tax, accounting and regulatory issues. Our approach identifies these dependencies at the outset.</p>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-navy text-[1.05rem] mb-1">One Coordinated Advisory Framework</h3>
                  <p>We help coordinate the relevant legal, accounting, tax, secretarial, valuation and banking workstreams instead of leaving the client to manage each in isolation.</p>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-navy text-[1.05rem] mb-1">Business-Focused Implementation</h3>
                  <p>Our focus is on practical implementation and overcoming operational transaction bottlenecks, not merely listing statutory provisions.</p>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-navy text-[1.05rem] mb-1">Cross-Border Depth</h3>
                  <p>Specialized expertise across FEMA, RBI, FDI, ODI, ECB, international taxation, and cross-border bank coordination.</p>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-navy text-[1.05rem] mb-1">Flexible Engagement Models</h3>
                  <p>Engage on a recurring monthly retainer, project-specific advisory, or complete turnkey mandate aligned with your transaction lifecycle.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ ENGAGEMENT MODELS ══ */}
      <section className="bg-cream py-20 px-[5vw]">
        <div className="max-w-8xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-3">Engagement Models</h2>
            <p className="text-muted text-[0.92rem]">
              Professional fees are determined having regard to the nature and size of the business, turnover, transaction volume, employee strength, number of registrations, frequency of filings, cross-border exposure and complexity of the assignment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ENGAGEMENT_MODELS.map((model, idx) => (
              <div key={idx} className="bg-white p-4 border border-navy/10 flex items-center gap-3">
                <span className="text-gold text-xs">✦</span>
                <span className="text-[0.88rem] font-medium text-navy">{model}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FREQUENTLY ASKED QUESTIONS (ACCORDION) ══ */}
      <section className="bg-white py-24 px-[5vw] border-b border-navy/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="eyebrow-row justify-center mb-2">
              <div className="eyebrow-line" />
              <span className="eyebrow-text">FAQ</span>
              <div className="eyebrow-line" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-navy">Frequently Asked Questions</h2>
          </div>

          <div className="divide-y divide-navy/10 border-y border-navy/10">
            {FAQS.map((faq, i) => (
              <div key={i} className="py-5">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex justify-between items-center text-left font-serif text-[1.1rem] font-semibold text-navy hover:text-gold transition-colors cursor-pointer"
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  <span className="text-gold text-xl font-mono ml-4">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="mt-3 text-[0.92rem] text-muted leading-[1.8] pr-8 animate-pageFadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA & REGULATORY DISCLAIMER ══ */}
      <section className="bg-navy py-24 px-[5vw] text-cream text-center">
        <div className="max-w-4xl mx-auto">
          <div className="eyebrow-row justify-center mb-2">
            <div className="eyebrow-line" />
            <span className="eyebrow-text text-gold">Consultation</span>
            <div className="eyebrow-line" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream mb-4">
            Speak With Our Finance, Tax & Regulatory Advisory Team
          </h2>
          <p className="text-cream/80 text-[1rem] leading-relaxed max-w-2xl mx-auto mb-4">
            Businesses should not have to independently coordinate multiple advisors simply to understand how one commercial transaction affects their legal, financial, tax, banking and regulatory obligations.
          </p>
          <p className="text-cream/60 text-[0.9rem] leading-relaxed max-w-2xl mx-auto mb-8">
            Tell us what your business needs. Connect with our team to identify the relevant workstreams and proposed engagement structure.
          </p>

          <div className="flex justify-center gap-4 flex-wrap mb-10">
            <Link to="/contact" className="btn-primary">
              Book a Consultation
            </Link>
            {/* <Link to="/contact" className="btn-outline-navy !text-cream !border-cream/30 hover:!border-gold">
              Contact Paul Legal Associates
            </Link> */}
          </div>

          <div className="text-2xs uppercase tracking-widest text-gold/80 mb-12">
            Accounting | Payroll | GST | Corporate Tax | Audit | Transfer Pricing | Virtual CFO | FEMA | FDI | ODI | ECB | RBI Compliance | India Entry | International Tax | M&A
          </div>

          {/* ══ REGULATORY DISCLAIMER ══ */}
          <div className="p-6 border border-gold/15 bg-navy-deep text-[0.8rem] text-cream/60 leading-relaxed text-left">
            <h3 className="text-2xs font-semibold tracking-widest uppercase text-gold mb-2">
              Professional & Regulatory Disclaimer
            </h3>
            <p>
              Certain services including statutory audits, certifications, attestations, valuations, company-secretarial certifications and other functions reserved by law for specified professionals are undertaken or issued, where applicable, through appropriately qualified independent professionals in accordance with applicable statutory and professional requirements. The precise scope of each engagement is determined based on the client’s requirements, applicable law and the professional responsibilities of the relevant advisor.
            </p>
          </div>
        </div>
      </section>

      <CredentialsBar />
    </>
  );
};

export default FinanceTaxRegulatoryAdvisory;