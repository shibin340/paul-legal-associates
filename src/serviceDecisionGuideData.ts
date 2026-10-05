type GuideLink = { href: string; label: string };
export type DecisionGuide = {
  heading: string;
  introduction: string;
  documents: string[];
  steps: string[];
  consideration: string;
  sources: GuideLink[];
  related: GuideLink[];
};

// Practical preparation material for existing services, not a statement that
// any regulator, lender or court will approve a particular outcome.
export const remainingDecisionGuides: Record<string, DecisionGuide> = {
  'property-transactions-conveyancing': {
    heading: 'Plan the transfer before agreeing the signing date',
    introduction: 'A resale flat, inherited property, CIDCO leasehold plot and development transaction require different transfer documents. Conveyancing work should connect the ownership review to the agreed price, payment stages, possession and conditions for completion. Tell us whether you are buying, selling, gifting or documenting another transfer in Panvel, Navi Mumbai or elsewhere in Maharashtra.',
    documents: [
      'The property schedule, current ownership papers and available earlier registered deeds or agreements.',
      'Agreed commercial terms, draft documents, payment information and the proposed completion date.',
      'Relevant society, developer, CIDCO, lender or revenue correspondence, including any consent or outstanding requirement.',
      'Details of the parties and how each will sign: personally, through an entity, as an heir or through an authorised representative.'
    ],
    steps: [
      'Identify the asset, parties and transaction structure; assess whether a separate title review or authority verification is needed.',
      'Review the draft for the property description, consideration, responsibilities, possession and the conditions that must be met before completion.',
      'Agree the signing, payment, registration and document-handover sequence against the actual records; identify post-transfer follow-up separately.'
    ],
    consideration: 'Flag a loan, co-owner, succession issue, power of attorney or unresolved permission early. A standard deed should not be used to hide a missing approval or an unclear ownership chain. Registration preparation and a substantive title review answer different questions.',
    sources: [{ href: 'https://igrmaharashtra.gov.in/Home', label: 'Maharashtra Department of Registration and Stamps: records, guidance and citizen services' }],
    related: [
      { href: '/expertise/property-title-verification-due-diligence/', label: 'Prepare for a property title review' },
      { href: '/expertise/property-registration-services-mumbai-navi-mumbai/', label: 'Plan the registration stage' },
      { href: '/partners/sojan-paul/', label: 'Adv. Sojan Paul — property practice' }
    ]
  },
  'property-registration-services-mumbai-navi-mumbai': {
    heading: 'Prepare the document and the parties for registration',
    introduction: 'Before arranging a property-document registration in Mumbai, Navi Mumbai or Panvel, identify the instrument being signed, the property particulars and the capacity of every signatory. A sale, gift, release, mortgage or another instrument can raise different document, stamp and presentation questions. The initial review should establish what is ready and what still needs attention.',
    documents: [
      'The latest draft, its property schedule and annexures, with the proposed signing date.',
      'Earlier title documents and available property, society or authority records relevant to this instrument.',
      'Identity and signing-capacity details for the parties; flag an entity, power of attorney, overseas signatory or inheritance.',
      'Any existing valuation advice, duty or fee receipts, appointment details, or query received from the registration office.'
    ],
    steps: [
      'Check that the document, property identifiers, parties and annexures describe the same transaction.',
      'Assess the applicable instrument, valuation, duty, fees, signing authority and registration arrangements using the current official requirements.',
      'Coordinate presentation and follow up on the registered copy and transaction-specific record changes after registration.'
    ],
    consideration: 'Do not assume an online booking means every document or signatory requirement is satisfied. Avoid signing an incomplete draft merely to keep an appointment. Tell us if the document has already been executed, since its date can affect the next step.',
    sources: [{ href: 'https://igrmaharashtra.gov.in/Home', label: 'Official Maharashtra registration, appointment, valuation and document-search services' }],
    related: [
      { href: '/expertise/property-transactions-conveyancing/', label: 'Transfer documentation and conveyancing' },
      { href: '/expertise/property-title-verification-due-diligence/', label: 'Ownership and title due diligence' },
      { href: '/partners/sojan-paul/', label: 'Adv. Sojan Paul — property practice' }
    ]
  },
  'navi-mumbai-airport-land-transactions': {
    heading: 'Separate the airport-area location from the land’s legal position',
    introduction: 'Land near Navi Mumbai International Airport can involve an ordinary purchase, CIDCO or NAINA planning records, an acquisition notice, or project-affected-person documents. Proximity to the airport does not answer which permissions, restrictions or entitlements apply to a particular parcel. Begin with the village, survey or hissa number and the specific transaction or notice.',
    documents: [
      'Village, taluka, survey/hissa numbers, land area and a plan identifying the exact parcel.',
      'Available title deeds, 7/12 extracts, mutations and information about the present holder and land use.',
      'Relevant acquisition, rehabilitation, allotment, CIDCO or town-planning papers and correspondence, if applicable.',
      'A proposed transaction draft and any representations about access, development rights, permissions or compensation.'
    ],
    steps: [
      'Match the property identifiers across ownership records, plans and the transaction papers.',
      'Identify which authority, scheme, notification or allotment condition actually affects that parcel and check its current stage.',
      'Distinguish the ownership, planning, acquisition and transfer questions before committing to a price or signing sequence.'
    ],
    consideration: 'A neighbouring parcel or a general airport-area advertisement is not evidence of the same rights for your land. Flag an approaching notice-response or transaction date, and retain the complete source document rather than a cropped plan or screenshot.',
    sources: [
      { href: 'https://cidco.maharashtra.gov.in/', label: 'CIDCO: official project, planning and land information' },
      { href: 'https://raigad.gov.in/en/land-acquisition-department/', label: 'Raigad District Land Acquisition Department' }
    ],
    related: [
      { href: '/expertise/naina-town-planning-scheme-services/', label: 'Scheme-specific NAINA preparation' },
      { href: '/expertise/land-acquisition-compensation-matters/', label: 'Acquisition notices and compensation matters' },
      { href: '/partners/sojan-paul/', label: 'Adv. Sojan Paul — property and land acquisition practice' }
    ]
  },
  'corporate-commercial-ma-startup-law': {
    heading: 'Identify the transaction, the entities and the approval path',
    introduction: 'A founder agreement, minority investment, share acquisition and business transfer raise different diligence and documentation questions. For an investment or acquisition, describe what is being acquired, the entity structure, the commercial objective and whether a term sheet or definitive draft already exists. A startup’s formation and governance work should also fit its actual ownership and operations.',
    documents: [
      'Entity names, incorporation information, ownership/capital structure and relevant constitutional documents.',
      'The term sheet, proposed structure, current draft and the next negotiation or completion date.',
      'Material contracts, licences, financing/security records and known disputes or compliance concerns relevant to diligence.',
      'Existing shareholder arrangements, authority/approval records and any foreign investor or cross-border element.'
    ],
    steps: [
      'Establish the transaction perimeter and decide the scope of corporate, contract and regulatory review.',
      'Review diligence issues alongside price, conditions, representations, indemnities, governance and exit provisions.',
      'Map approvals, signing and closing deliverables, with responsibility for post-closing filings or follow-up clearly identified.'
    ],
    consideration: 'Flag a foreign-investment element before treating a domestic template as sufficient. A term sheet, incorporation record or portal extract alone does not establish that an acquisition is ready to close. Sensitive diligence material should be shared through an agreed channel.',
    sources: [{ href: 'https://www.mca.gov.in/', label: 'Ministry of Corporate Affairs: official company services and legal resources' }],
    related: [
      { href: '/expertise/corporate-commercial-advisory/', label: 'Corporate and commercial advisory' },
      { href: '/expertise/contract-drafting-vetting-transaction-documentation/', label: 'Contract drafting and transaction documentation' },
      { href: '/finance-tax-regulatory-advisory/', label: 'Finance and cross-border regulatory advisory' }
    ]
  },
  'arbitration-mediation-adr': {
    heading: 'Start with the dispute clause and the stage of the dispute',
    introduction: 'Contract negotiation, an arbitration notice, an existing tribunal proceeding and a proposed mediation call for different work. Keep the complete agreement and amendments available so that the dispute mechanism can be considered with the facts, parties, relief sought and any urgent date. A reference to arbitration does not resolve every question about forum or procedure.',
    documents: [
      'The complete signed agreement and amendments, including seat, venue, governing-law, appointment and notice provisions.',
      'A brief chronology, key invoices/payment records, performance documents and material correspondence.',
      'Any invocation notice, reply, appointment communication, tribunal order, award or related court paper.',
      'The practical outcome sought, settlement discussions and any approaching response, hearing or enforcement date.'
    ],
    steps: [
      'Review the dispute clause and facts to identify the applicable route and immediate procedural questions.',
      'Plan notice, appointment, case preparation or interim-response work according to the current stage.',
      'Assess consensual settlement or mediation alongside the continuing proceeding where appropriate; record any agreed resolution carefully.'
    ],
    consideration: 'Do not assume every dispute is arbitrable or that mediation automatically pauses a deadline. Preserve evidence and mention urgent dates at first contact. Award challenges and enforcement questions require a separate review of the actual award and procedural record.',
    sources: [{ href: 'https://www.indiacode.nic.in/handle/123456789/1978', label: 'India Code: Arbitration and Conciliation Act, 1996' }],
    related: [
      { href: '/expertise/commercial-litigation-arbitration/', label: 'Commercial dispute preparation' },
      { href: '/insights/commercial-arbitration-vs-litigation/', label: 'Commercial arbitration and litigation: decision questions' }
    ]
  },
  'labour-employment-hr-workplace-compliance': {
    heading: 'Map the workplace, workforce and compliance question',
    introduction: 'An employer reviewing contracts or payroll compliance needs different information from an employee responding to a termination or another workplace issue. For employers in Panvel, Navi Mumbai or elsewhere in Maharashtra, identify each workplace, the nature of operations, workforce arrangements and the records or notice that prompted the review.',
    documents: [
      'Establishment locations, business activities, workforce numbers and contractor or staffing arrangements.',
      'Relevant employment contracts, policies, payroll components, attendance records and separation documents.',
      'Existing statutory registrations, contribution/return records, inspection correspondence or notices relevant to the enquiry.',
      'A short factual chronology and the next response, payroll, hearing or organisational decision date.'
    ],
    steps: [
      'Identify which current law, notification and workplace-specific requirement applies before using a standard compliance checklist.',
      'Compare contracts, payroll and records with the relevant obligations; distinguish missing documentation from a substantive compliance issue.',
      'Agree practical corrective work, responsibilities and a review calendar, or the response required in a live dispute.'
    ],
    consideration: 'Do not assume one salary structure, contribution rate or headcount rule applies to every establishment. Keep sensitive employee or complaint details out of an initial public enquiry. A POSH committee or live complaint requires its own confidentiality and conflict review.',
    sources: [
      { href: 'https://www.epfindia.gov.in/site_en/For_Employers.php', label: 'EPFO: official employer services and guidance' },
      { href: 'https://www.esic.gov.in/', label: 'ESIC: official employer and contribution information' }
    ],
    related: [
      { href: '/expertise/posh-compliance-internal-committee/', label: 'POSH policy and Internal Committee support' },
      { href: '/insights/pf-esic-factory-contract-labour-compliance/', label: 'PF, ESIC and workplace-compliance records' },
      { href: '/partners/sonam-paul/', label: 'Adv. Sonam Paul — labour law and compliance practice' }
    ]
  },
  'taxation-gst-fiscal-litigation': {
    heading: 'Identify the tax period, notice and issue before preparing a response',
    introduction: 'A registration or transaction-advisory question differs from a return mismatch, tax demand, adjudication order or appeal. State which tax and period are involved, the authority that issued the paper and the present stage. Business records and the complete notice are more useful than a summary of the amount alone.',
    documents: [
      'The complete notice or order, annexures, reference number, service details and any stated response or hearing date.',
      'Relevant registration particulars, returns, reconciliations, invoices, contracts and transaction records for the period.',
      'Earlier replies, payment/challan records, departmental correspondence and any appeal or recovery papers.',
      'A short explanation of the disputed issue and the accounting or factual records available to support it.'
    ],
    steps: [
      'Separate a compliance correction or reconciliation from a disputed legal position and identify the applicable current provision.',
      'Review the notice, evidence and procedural stage before preparing submissions or deciding the response route.',
      'Coordinate the document, accounting and legal work needed for the agreed action, with dates and responsibilities recorded.'
    ],
    consideration: 'Do not use a generic internet deadline or rate without checking the exact tax, period and document. Flag missing records or an approaching date immediately. An initial enquiry should describe the issue without uploading confidential tax or customer information.',
    sources: [
      { href: 'https://www.cbic.gov.in/', label: 'CBIC: official indirect-tax notifications and resources' },
      { href: 'https://www.gst.gov.in/', label: 'GST portal: official taxpayer services' }
    ],
    related: [
      { href: '/finance-tax-regulatory-advisory/', label: 'Ongoing finance, tax and regulatory advisory' },
      { href: '/expertise/corporate-commercial-advisory/', label: 'Corporate and commercial transaction advice' }
    ]
  },
  'banking-finance-securities-debt-restructuring': {
    heading: 'Separate repayment planning from a live recovery or security issue',
    introduction: 'A borrower proposing revised repayment terms, a guarantor receiving a demand and a business reviewing financing documents face different questions. Identify the lender, facility, borrower/guarantor role, secured assets and any current notice or proceeding. A settlement or restructuring proposal should be based on the actual loan record and a workable commercial position.',
    documents: [
      'Sanction letters, facility agreements, repayment schedules and any amendments or restructuring correspondence.',
      'Current statements, payment history, the disputed balance and records supporting the repayment or settlement proposal.',
      'Guarantee, mortgage or other security documents and details of the affected property or assets.',
      'Every relevant demand, possession/recovery notice, order, proceeding reference and approaching response date.'
    ],
    steps: [
      'Review contractual obligations, the account history and the stage of any enforcement or dispute.',
      'Distinguish a negotiated repayment/settlement proposal from a legal challenge or response to a particular notice.',
      'Prepare the appropriate documentation, representation or response against the verified facts and the current applicable framework.'
    ],
    consideration: 'A proposal does not guarantee lender approval or suspend recovery action. Do not rely on a verbal assurance about a payment, waiver or security release; retain written records. Notify the firm of a live hearing or notice date before discussing a longer-term restructuring plan.',
    sources: [{ href: 'https://www.rbi.org.in/', label: 'Reserve Bank of India: official directions, notifications and borrower resources' }],
    related: [
      { href: '/expertise/commercial-litigation-arbitration/', label: 'Commercial dispute and notice preparation' },
      { href: '/expertise/property-title-verification-due-diligence/', label: 'Property and security-title review' },
      { href: '/finance-tax-regulatory-advisory/', label: 'Business finance and regulatory advisory' }
    ]
  },
  'maritime-shipping-admiralty-law': {
    heading: 'Identify the vessel, governing documents and closing stage',
    introduction: 'A vessel purchase, a payment/closing question, a registration transfer and a maritime dispute need different documents. Start with the vessel name and IMO number, the parties, flag and transaction stage. For a purchase or sale, the executed memorandum of agreement and amendments should be considered alongside title, security, delivery and payment arrangements.',
    documents: [
      'Vessel name, IMO number, flag/registry details and the parties’ full legal names and roles.',
      'The executed MOA, addenda, delivery/acceptance notices, cancellation dates and proposed closing checklist.',
      'Available registry/title, mortgage, discharge, corporate-authority and related transfer documents.',
      'Payment instructions and relevant correspondence, or the contracts, notices and procedural papers for a dispute.'
    ],
    steps: [
      'Match the vessel and parties across the agreement, corporate and registry papers, and identify the applicable jurisdiction and transaction conditions.',
      'Review closing deliverables, title/security questions, payment arrangements and the order in which documents and funds are to move.',
      'Confirm the agreed handover/registration steps or assess the immediate response in a live maritime dispute.'
    ],
    consideration: 'Flag changed bank details, third-party payment instructions, outstanding mortgages or approaching contractual dates early. Independent verification of payment authority and instructions is distinct from simply receiving a signed document. A cross-border transaction requires attention to the actual flag and governing documents.',
    sources: [{ href: 'https://www.dgshipping.gov.in/', label: 'Directorate General of Shipping: official Indian shipping and registry resources' }],
    related: [
      { href: '/expertise/contract-drafting-vetting-transaction-documentation/', label: 'Transaction document and contract review' },
      { href: '/expertise/commercial-litigation-arbitration/', label: 'Commercial dispute preparation' }
    ]
  }
};
