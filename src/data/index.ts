import type { NavLink, PracticeArea, TeamMember, Stat, Testimonial, OfficeHour, Value, Milestone, Article } from "../types";

export const NAV_LINKS: NavLink[] = [
  { label: "Home",       path: "/" },
  { label: "About Us",   path: "/about" },
  { label: "Expertise",  path: "/expertise" },
  { label: "Our Partners",   path: "/partners" },
  { label: "Insights",   path: "/insights" },
  { label: "Contact",    path: "/contact" },
];

export const TAGLINE = "Enduring Values. Delivering Results.";
export const TAGLINE_SUB = "Advocates, High Court of Bombay";
export const FIRM_HEADLINE = "Property Law • Legal Compliance • Strategic Legal Advisory";
export const FIRM_DESC = "Trusted legal counsel for individuals, businesses, developers and institutions.";

export const STATS: Stat[] = [
  { value: "30+",   label: "Years of Expertise" },
  { value: "3",     label: "Expert Advocates" },
  { value: "6",     label: "Practice Areas" },
  { value: "100%",  label: "Client Focused" },
];

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: "property",
    icon: "🏢",
    title: "Property & Real Estate",
    shortDesc: "Title diligence, conveyancing, redevelopment, RERA and registrations.",
    fullDesc: "Our property law practice covers the entire lifecycle of real estate transactions. From title due diligence and conveyancing to redevelopment agreements, RERA compliance and registrations, we provide end-to-end support for individuals, developers and institutions.",
    highlights: ["Title Due Diligence", "Conveyancing & Documentation", "RERA Compliance", "Redevelopment Projects", "Property Registrations", "Land Acquisition Matters", "SRA & BMC Representations"],
  },
  {
    id: "litigation",
    icon: "⚖️",
    title: "Commercial Litigation & Arbitration",
    shortDesc: "Representation before courts, tribunals and authorities.",
    fullDesc: "We provide tenacious representation before the Bombay High Court, Supreme Court, tribunals and regulatory authorities. Our litigation practice combines thorough preparation with strategic advocacy to protect our clients' interests at every stage.",
    highlights: ["Bombay High Court Practice", "Supreme Court Matters", "Commercial Arbitration", "Tribunal Representation", "SRA & BMC Proceedings", "Civil & Commercial Disputes"],
  },
  {
    id: "compliance",
    icon: "📋",
    title: "Legal Compliance & Audit",
    shortDesc: "Compliance reviews, labour law audits, due diligence and governance frameworks.",
    fullDesc: "We help organisations build robust compliance frameworks, conduct thorough due diligence reviews, and navigate complex regulatory environments. Our compliance practice covers labour law, governance, PF/ESI and corporate regulatory requirements.",
    highlights: ["Labour Law Compliance", "PF, ESI & Gratuity Audits", "Due Diligence Reviews", "Governance Frameworks", "Regulatory Compliance", "Risk Advisory", "Compliance Audit Reporting"],
  },
  {
    id: "banking",
    icon: "🏛️",
    title: "Banking Laws",
    shortDesc: "Advisory on banking transactions, lending matters, recovery support and regulatory issues.",
    fullDesc: "Our banking law practice assists banks, financial institutions and corporate clients with transactional advisory, regulatory compliance and recovery proceedings. We provide practical, business-focused guidance on complex financial arrangements.",
    highlights: ["Banking Transaction Advisory", "Lending & Security Documentation", "Recovery Proceedings", "Regulatory Compliance", "Financial Regulatory Issues", "Secured Financing"],
  },
  {
    id: "corporate",
    icon: "💼",
    title: "Corporate & Commercial Advisory",
    shortDesc: "Contracts, transactions, corporate support and legal documentation.",
    fullDesc: "We support businesses at every stage of their legal journey — from structuring transactions and drafting contracts to corporate governance and mergers & acquisitions. Our commercial advisory practice delivers practical, commercially sound legal solutions.",
    highlights: ["Contract Drafting & Review", "Mergers & Acquisitions", "Corporate Governance", "Joint Ventures", "Commercial Transactions", "Legal Documentation", "Private Equity Related Work"],
  },
  {
    id: "land",
    icon: "🌿",
    title: "Land Acquisitions",
    shortDesc: "Advisory on land acquisition matters, compensation, title issues and related proceedings.",
    fullDesc: "We advise on all aspects of land acquisition — from initial title investigations and compensation negotiations to representation before the Land Acquisition Authority and appellate forums. We serve both landowners and acquiring bodies.",
    highlights: ["Land Acquisition Proceedings", "Compensation Claims", "Title Investigation", "LA Authority Representations", "Appellate Proceedings", "Regulatory & Compliance Issues"],
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "polachan",
    photo: "/images/polachan.webp",
    name: "Adv. P. P. Polachan",
    title: "Partner",
    role: "Partner | Property Lawyer Expert",
    experience: "30+ Years Experience",
    specialisation: "Property Law & Commercial Practice",
    tagline: "More than three decades of legal practice and courtroom experience.",
    highlights: [
      "Practicing before Bombay High Court and Supreme Court.",
      "Wide-ranging practice in corporate, commercial, banking, financial, property, real estate and consumer matters.",
      "Experienced in mergers, acquisitions, commercial transactions and legal advisory.",
      "Participated in the 240-day trial in Armilan Dyeing Ltd. vs. Maharashtra State Financial Corporation in 1993.",
    ],
    quote: "Precision in Law. Clarity in Counsel. Confidence in Outcomes.",
  },
  {
    id: "sojan",
    photo: "/images/sojan.webp",
    name: "Adv. Sojan Paul",
    title: "Managing Partner",
    role: "Managing Partner | Property Lawyer Expert",
    experience: "10+ Years Experience",
    specialisation: "Property Law, RERA & Land Acquisitions",
    tagline: "Property-focused legal counsel with strong transactional and regulatory expertise.",
    highlights: [
      "Proud Managing Partner and the Pillar of Strength Behind the Firm.",
      "Specialisation in Property Law, RERA, registrations, secured financing, compliance, mergers & acquisitions and private equity related work.",
      "Entrusted with redevelopment projects for builders and developers.",
      "Drafts crucial agreements and represents clients before SRA, BMC, RERA, and the Hon'ble High Court.",
      "Known for a keen eye for detail and strong protection of client rights and interests.",
      "Specialises in Land Acquisition matters — a dynamic and young Property Law Advocate in the vicinity.",
    ],
    quote: "A Young and Dynamic Legal Mind. Empowering Clients Through Expertise and Dedication.",
  },
  {
    id: "sonam",
    photo: "/images/sonam.webp",
    name: "Adv. Sonam Paul",
    title: "Partner",
    role: "Partner | Legal Compliance & Audit Expert",
    experience: "8+ Years Experience",
    specialisation: "Legal Compliance, Labour Law & Audit",
    tagline: "A seasoned legal and regulatory compliance professional with 8+ years of experience.",
    highlights: [
      "Advises domestic and multinational clients on labour and employment laws, regulatory compliance, governance, workforce management and legal risk mitigation.",
      "Extensive experience in compliance audits, due diligence reviews, governance initiatives and compliance framework implementation.",
      "Expertise in PF, ESI, gratuity, bonus, social security, industrial relations, contractor compliance, occupational health & safety and Labour Code readiness.",
      "Prior experience with BBSR & Associates LLP and Ernst & Young LLP in risk advisory.",
      "Recognised for combining legal expertise with practical business advisory capabilities.",
    ],
    quote: "Precision in Law. Clarity in Counsel. Confidence in Outcomes.",
  },
];

export const VALUES: Value[] = [
  { icon: "🛡️", title: "Integrity",            desc: "We uphold the highest standards of ethics and professionalism in every engagement." },
  { icon: "⏱️", title: "Responsiveness",        desc: "We deliver timely, cost-effective and tailored outcomes for clients." },
  { icon: "📚", title: "Knowledge",              desc: "We provide complex legal solutions and, where required, work alongside tax, business and accounting advisors." },
  { icon: "🔧", title: "Practical Solutions",   desc: "We offer commercially sound, practical advice designed to achieve real-world results." },
  { icon: "🤝", title: "Personalized Attention", desc: "We build lasting relationships and provide solutions tailored to your unique needs." },
];

export const PHILOSOPHY = [
  { icon: "⚖️", text: "We aim to provide the best feasible legal answers to complicated legal problems." },
  { icon: "💡", text: "An innovative approach towards law-related issues." },
  { icon: "🛡️", text: "Determined to comply with the letter and spirit of law." },
  { icon: "💬", text: "Strong emphasis on transparency, client communication and understanding the client's position." },
  { icon: "⭐", text: "A creative and experienced team that listens." },
  { icon: "🤲", text: "Active involvement in charitable organizations and giving back to society." },
];

export const ABOUT_HIGHLIGHTS = [
  { icon: "⚖️", title: "Full-service law firm",          desc: "Offering litigation and non-litigation support." },
  { icon: "🏛️", title: "Established Presence",           desc: "Land Acquisitions, Property Laws, Legal, Compliance, Regulatory & Audit." },
  { icon: "⏱️", title: "Timely, cost-effective",         desc: "And tailored legal outcomes." },
  { icon: "🤝", title: "Client-focused approach",        desc: "Guided by integrity, responsiveness and knowledge." },
  { icon: "📅", title: "Operating as a legal advisory entity", desc: "For more than 3 decades." },
];

export const MILESTONES: Milestone[] = [
  { year: "1991", event: "Firm established in Navi Mumbai with a focus on property law and corporate advisory." },
  { year: "1993", event: "Participated in the landmark 240-day trial — Armilan Dyeing Ltd. vs. MSFC." },
  { year: "2000", event: "Expanded into regulatory compliance and banking law practice areas." },
  { year: "2010", event: "Grew the team and established presence at the Bombay High Court." },
  { year: "2018", event: "Launched dedicated Legal Compliance & Audit division serving multinational clients." },
  { year: "2024", event: "Celebrating 30+ years of enduring values and delivering results for clients across Maharashtra." },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: "t1", quote: "Paul Legal Associates guided us through a complex redevelopment project with exceptional skill. Their RERA expertise and attention to detail gave us complete confidence throughout.", author: "Rajesh Sharma", matter: "Developer, Navi Mumbai" },
  { id: "t2", quote: "Adv. Sojan Paul handled our property acquisition dispute with tenacity and precision. We couldn't have asked for better legal representation at every stage.", author: "Meena Iyer", matter: "Property Owner, Panvel" },
  { id: "t3", quote: "Adv. Sonam Paul's compliance audit transformed our HR and legal risk framework. Her expertise with Ernst & Young background is evident in every recommendation she makes.", author: "Vikram Desai", matter: "HR Director, Multinational Corporation" },
];

export const OFFICE_HOURS: OfficeHour[] = [
  { day: "Monday – Friday", time: "10:00 AM – 6:30 PM" },
  { day: "Saturday",        time: "10:00 AM – 2:00 PM" },
  { day: "Sunday",          time: "By Appointment Only" },
];

export const CONTACT_INFO = {
  address: "Office No. 301, 3rd Floor, Om Sai Building,\nPlot No.101/3, Swami Nityanand Road,\nNear Garden Hotel, Panvel,\nNavi Mumbai, Maharashtra 410 206.",
  phone:   "+91 7977063567",
  email:   "info@paullegalassociates.com",
  website: "www.paullegalassociates.com",
};

export const CREDENTIALS = [
  { icon: "📅", label: "30+ Years of Expertise" },
  { icon: "🏛️", label: "Bombay High Court" },
  { icon: "🏢", label: "Property Law Experts" },
  { icon: "🛡️", label: "Compliance & Audit Advisory" },
];

export const PRACTICE_AREA_OPTIONS = PRACTICE_AREAS.map(p => p.title);

export const ARTICLE_CATEGORIES = [
  "All",
  "Property Law",
  "Legal Compliance",
  "Litigation",
  "Banking Laws",
  "Corporate Advisory",
  "Land Acquisition",
];

export const ARTICLES: Article[] = [
  {
    id: "a1",
    slug: "rera-compliance-checklist-developers",
    title: "RERA Compliance: A Practical Checklist for Developers in Maharashtra",
    category: "Property Law",
    excerpt: "Navigating RERA registration and ongoing compliance can be daunting for developers. Here's a practical, field-tested checklist drawn from our redevelopment practice.",
    coverIcon: "🏢",
    author: "Adv. Sojan Paul",
    authorRole: "Managing Partner",
    date: "March 18, 2026",
    readTime: "6 min read",
    tags: ["RERA", "Real Estate", "Compliance", "Redevelopment"],
    content: [
      {
        paragraphs: [
          "The Real Estate (Regulation and Development) Act, 2016 fundamentally changed how developers in Maharashtra structure, market and execute residential and commercial projects. Yet, more than seven years after MahaRERA became operational, we continue to see avoidable compliance lapses derail otherwise sound projects.",
          "Having represented developers and builders before MahaRERA and the Bombay High Court for over a decade, our redevelopment practice has distilled the most common pitfalls into a practical checklist. This is not an exhaustive legal treatise — it is the set of questions we ask every client before a single brick is laid.",
        ],
      },
      {
        heading: "1. Registration Before Advertisement",
        paragraphs: [
          "The single most litigated issue we encounter is developers advertising, marketing or accepting bookings before obtaining a valid RERA registration number. Section 3 of the Act makes registration mandatory for any project where the land exceeds 500 square metres or involves more than eight apartments.",
          "Before any marketing collateral is printed — brochures, hoardings, digital ads — confirm the registration certificate is in hand. Retrofitting compliance after the fact invites penalties under Section 59 and can taint otherwise valid sale agreements.",
        ],
      },
      {
        heading: "2. The 70% Escrow Requirement",
        paragraphs: [
          "Seventy percent of amounts realised from allottees must be deposited in a separate RERA escrow account, to be used only for land and construction costs of that specific project. We routinely see developers commingle funds across projects — a practice that exposes promoters to both regulatory action and personal liability.",
        ],
        list: [
          "Maintain project-wise separate bank accounts from day one",
          "Engage a chartered engineer, architect and CA to certify withdrawal requests",
          "Reconcile escrow withdrawals against the percentage of construction completed",
        ],
      },
      {
        heading: "3. Quarterly Disclosures and the QPR",
        paragraphs: [
          "The Quarterly Progress Report is not a formality — MahaRERA actively cross-references QPR filings against complaint data and site inspections. Delayed or inaccurate QPRs are now one of the most common grounds for show-cause notices we handle.",
        ],
      },
      {
        heading: "4. Redevelopment-Specific Considerations",
        paragraphs: [
          "For societies undergoing redevelopment, RERA registration is required even where existing members are merely being rehoused, if any portion of the project is sold to third parties. We've represented several developers where this nuance was overlooked, leading to costly remediation.",
          "Our recommendation: treat every redevelopment project as RERA-applicable unless your legal counsel has specifically confirmed an exemption applies.",
        ],
      },
      {
        heading: "Final Word",
        paragraphs: [
          "RERA compliance is not a one-time exercise — it is a discipline that must be embedded into a developer's operational rhythm. The cost of a compliance lapse, in penalties, reputational damage and allottee litigation, dwarfs the cost of proper legal structuring at the outset.",
          "If you are planning a new project or redevelopment in Navi Mumbai or the wider MMR region, our property law team would be glad to walk through your specific structure before you proceed.",
        ],
      },
    ],
  },
  {
    id: "a2",
    slug: "labour-code-readiness-2026",
    title: "Labour Code Readiness: What Every Employer Needs to Know in 2026",
    category: "Legal Compliance",
    excerpt: "With the consolidated Labour Codes reshaping employment compliance, organisations need a structured readiness plan. Here's how we advise our compliance clients.",
    coverIcon: "📋",
    author: "Adv. Sonam Paul",
    authorRole: "Partner, Legal Compliance & Audit",
    date: "February 27, 2026",
    readTime: "7 min read",
    tags: ["Labour Law", "Compliance", "HR Advisory", "Audit"],
    content: [
      {
        paragraphs: [
          "The consolidation of 29 central labour laws into four Labour Codes — Wages, Industrial Relations, Social Security, and Occupational Safety, Health & Working Conditions — represents the most significant overhaul of India's employment law framework in decades.",
          "Drawing on my prior experience in risk advisory at Ernst & Young and BBSR & Associates, and now advising clients directly on Labour Code readiness, I want to share the practical framework we use to assess organisational preparedness.",
        ],
      },
      {
        heading: "Why 'Wait and See' Is No Longer Viable",
        paragraphs: [
          "Many organisations adopted a wait-and-see posture given the staggered state-wise implementation timelines. That posture is increasingly risky. Several states have already notified rules under the Codes, and the definitional changes — particularly around 'wages' and 'fixed term employment' — have immediate payroll and contractual implications regardless of full notification.",
        ],
      },
      {
        heading: "The Five-Point Readiness Framework",
        paragraphs: [
          "We assess every compliance client against five dimensions before recommending a remediation roadmap:",
        ],
        list: [
          "Wage structuring — Does your CTC breakdown align with the new 50% basic wage threshold for allowances?",
          "Contract & fixed-term employment — Are FTE contracts compliant with parity-in-benefits requirements?",
          "Social security coverage — Is your PF/ESI applicability assessment current given expanded gig and platform worker coverage?",
          "Working conditions documentation — Are appointment letters, leave registers and working-hour records audit-ready?",
          "Industrial relations protocol — Is your grievance redressal and standing orders framework updated for the consolidated IR Code?",
        ],
      },
      {
        heading: "Common Gaps We Find in Compliance Audits",
        paragraphs: [
          "In our compliance audit engagements, the most frequent gap is not malicious non-compliance but simply outdated documentation that hasn't kept pace with regulatory drafting. Appointment letters drafted under the old Factories Act framework, gratuity calculations that haven't accounted for wage code redefinitions, and contractor compliance certificates that are years out of date.",
          "We strongly recommend a structured compliance audit — not a generic HR review, but a clause-by-clause mapping against the four Codes — before the remaining state notifications come into force.",
        ],
      },
      {
        heading: "Practical Next Steps",
        paragraphs: [
          "If your organisation operates across multiple states, prioritise a jurisdiction-wise gap analysis rather than a single national policy update — implementation timelines and state-specific rules still vary materially.",
          "Our legal compliance and audit practice works with both domestic and multinational clients to build this readiness systematically, combining legal expertise with the practical business advisory lens that comes from a Big Four risk advisory background.",
        ],
      },
    ],
  },
  {
    id: "a3",
    slug: "land-acquisition-compensation-rights",
    title: "Land Acquisition in Maharashtra: Understanding Your Compensation Rights",
    category: "Land Acquisition",
    excerpt: "Landowners facing acquisition proceedings often don't realise the full scope of their rights under the 2013 Act. This piece breaks down the compensation framework.",
    coverIcon: "🌿",
    author: "Adv. P. P. Polachan",
    authorRole: "Partner",
    date: "January 30, 2026",
    readTime: "8 min read",
    tags: ["Land Acquisition", "Compensation", "Property Rights"],
    content: [
      {
        paragraphs: [
          "Over three decades of practice before the Bombay High Court, I have represented landowners — individual families as well as institutional holders — in proceedings under both the erstwhile Land Acquisition Act, 1894 and the present Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013.",
          "One pattern remains constant: landowners rarely receive proper guidance at the notification stage, when the most consequential decisions about valuation methodology and objection rights are made.",
        ],
      },
      {
        heading: "The Compensation Formula — More Than Market Value",
        paragraphs: [
          "Under the 2013 Act, compensation is not simply the prevailing market rate. The statute mandates a multiplier — typically twice the market value in rural areas — plus a Solatium of 100% on the market value and compensation amount combined, and interest from the date of notification.",
          "We routinely find that initial award calculations by acquiring authorities undervalue the land by excluding comparable sale instances or by applying outdated circle rate references. This is precisely where a proper objection, backed by independent valuation evidence, makes a measurable difference to the final award.",
        ],
      },
      {
        heading: "The Critical Objection Window",
        paragraphs: [
          "Section 15 of the 2013 Act provides a narrow window — typically 60 days from the Section 11 notification — to file objections regarding the area, suitability of land for acquisition, or the public purpose itself. Missing this window forecloses several remedies that become unavailable later in the process.",
        ],
        list: [
          "Verify the notification date precisely — limitation runs strictly",
          "Engage an independent valuer before filing objections, not after",
          "Document any comparable sale transactions in the vicinity proactively",
          "Request a copy of the Social Impact Assessment if one was conducted",
        ],
      },
      {
        heading: "When the Award Is Inadequate",
        paragraphs: [
          "If the final award remains unsatisfactory, landowners retain the right to seek a reference to the Reference Court under Section 64, which can independently re-assess compensation. We have secured significant enhancements for clients at this stage, particularly where the acquiring body relied on stale valuation data.",
          "It bears noting that participating in the reference process does not preclude simultaneously pursuing rehabilitation and resettlement entitlements, which are assessed independently of the monetary award.",
        ],
      },
      {
        heading: "A Note on Infrastructure Corridor Acquisitions",
        paragraphs: [
          "With significant infrastructure development across the Navi Mumbai region — including corridor projects connecting to the international airport — we are seeing a marked increase in acquisition notifications. Landowners in these corridors should treat any preliminary notification as the trigger to seek legal advice immediately, not after the award is announced.",
        ],
      },
    ],
  },
  {
    id: "a4",
    slug: "commercial-arbitration-vs-litigation",
    title: "Commercial Arbitration vs. Litigation: Choosing the Right Forum",
    category: "Litigation",
    excerpt: "Drafting dispute resolution clauses without strategic thought is one of the most common — and costly — mistakes in commercial contracts. Here's our framework.",
    coverIcon: "⚖️",
    author: "Adv. P. P. Polachan",
    authorRole: "Partner",
    date: "January 12, 2026",
    readTime: "5 min read",
    tags: ["Arbitration", "Commercial Litigation", "Contracts"],
    content: [
      {
        paragraphs: [
          "Having argued matters before the Bombay High Court for over three decades — including the 240-day trial in Armilan Dyeing Ltd. vs. Maharashtra State Financial Corporation — I have seen first-hand how the choice of dispute resolution forum, decided years earlier at the contract drafting stage, shapes the entire trajectory of a commercial dispute.",
          "Too often, arbitration clauses are inserted as templated boilerplate, copied from a previous agreement without strategic consideration of whether arbitration actually serves the parties' interests in that specific commercial relationship.",
        ],
      },
      {
        heading: "When Arbitration Makes Sense",
        paragraphs: [
          "Arbitration is genuinely advantageous where confidentiality matters commercially, where the dispute is likely to involve technical or industry-specific evidence best assessed by a specialist arbitrator, or where the parties have an ongoing relationship that benefits from a less adversarial, more flexible process.",
        ],
        list: [
          "Confidential commercial disputes (M&A disputes, IP licensing)",
          "Disputes requiring technical/industry expertise in the decision-maker",
          "Cross-border contracts where neutral forum selection matters",
          "High-value disputes where procedural speed materially affects damages",
        ],
      },
      {
        heading: "When Litigation Remains Preferable",
        paragraphs: [
          "Despite arbitration's popularity, court litigation retains real advantages in specific scenarios. Where interim relief — injunctions, attachment before judgment — is critical, courts generally offer more robust and immediately enforceable remedies. Where a dispute involves third parties who aren't bound by the arbitration agreement, litigation may be unavoidable to achieve a complete resolution.",
          "We have also found that for disputes primarily about documentary interpretation — straightforward breach of contract claims with limited factual complexity — the cost and time of arbitrator selection and procedural setup can exceed any speed advantage over a well-managed court process.",
        ],
      },
      {
        heading: "Drafting Recommendations",
        paragraphs: [
          "Whichever forum you choose, the clause itself deserves careful drafting attention. Vague or contradictory dispute resolution clauses — what practitioners call 'pathological clauses' — generate satellite litigation about the forum itself before the underlying dispute is ever addressed.",
        ],
        list: [
          "Specify the seat and venue precisely, not just the governing law",
          "Define the number of arbitrators and appointment mechanism unambiguously",
          "Clarify whether institutional rules (e.g., MCIA, SIAC) apply or ad-hoc arbitration",
          "Address interim relief — confirm courts retain jurisdiction for emergency relief pending arbitration",
        ],
      },
      {
        heading: "Our Approach",
        paragraphs: [
          "When we draft or review commercial agreements for clients, the dispute resolution clause receives the same strategic attention as the commercial terms themselves. It is, after all, the clause that determines how every other clause in the contract will ultimately be enforced.",
        ],
      },
    ],
  },
  {
    id: "a5",
    slug: "due-diligence-property-transactions",
    title: "Title Due Diligence: The Non-Negotiables Before Any Property Purchase",
    category: "Property Law",
    excerpt: "Whether you're an individual buyer or an institutional investor, certain due diligence steps simply cannot be skipped. We outline the essential checklist.",
    coverIcon: "🏛️",
    author: "Adv. Sojan Paul",
    authorRole: "Managing Partner",
    date: "December 8, 2025",
    readTime: "6 min read",
    tags: ["Due Diligence", "Property Law", "Conveyancing"],
    content: [
      {
        paragraphs: [
          "In our property law practice, the disputes we are called to resolve almost always trace back to inadequate due diligence at the time of purchase. A clean, marketable title is the foundation of every property transaction — and verifying it properly requires more than a cursory document check.",
        ],
      },
      {
        heading: "The 30-Year Title Chain",
        paragraphs: [
          "Maharashtra practice generally requires examining the chain of title for a minimum of 30 years, tracing every transfer — sale, gift, inheritance, partition — to confirm an unbroken and legally valid chain of ownership. Gaps or ambiguities in this chain are the single most common source of future litigation.",
        ],
      },
      {
        heading: "Essential Document Verification",
        paragraphs: [
          "Beyond the sale deed itself, a thorough due diligence exercise must verify several supporting documents, each of which can reveal encumbrances or defects not apparent from the title deed alone.",
        ],
        list: [
          "7/12 extract (or Property Card for urban areas) — confirms current revenue record ownership",
          "Search report from the Sub-Registrar's office — reveals any registered encumbrances, mortgages or charges",
          "Property tax receipts — confirms no outstanding municipal dues that could attach to the property",
          "NA (Non-Agricultural) conversion order — essential where agricultural land is being purchased for non-agricultural use",
          "Society NOC and share certificate — for apartment purchases, confirms the seller's standing with the society",
          "Pending litigation search — confirms no civil suits, injunctions or attachment orders affect the property",
        ],
      },
      {
        heading: "RERA-Specific Diligence for Under-Construction Property",
        paragraphs: [
          "For under-construction purchases, diligence must extend to the project's RERA registration status, the developer's track record on the RERA portal, and critically, confirmation that the specific unit being purchased is reflected accurately in the registered project plan. We have seen disputes arise where carpet area calculations or unit numbering changed between booking and registration.",
        ],
      },
      {
        heading: "Redevelopment and Society Properties",
        paragraphs: [
          "Where a property is part of a society undergoing or contemplating redevelopment, additional diligence is essential — confirming the society's conveyance status, any existing development agreement terms, and whether the specific unit carries any redevelopment-related restrictions on transfer.",
        ],
      },
      {
        heading: "Why Professional Diligence Pays for Itself",
        paragraphs: [
          "The cost of professional title due diligence is a small fraction of the property's value — yet it is the single most effective safeguard against the disputes, encumbrances and litigation that can otherwise consume years and far exceed that initial cost. We recommend engaging legal counsel before signing any agreement to sell, not merely before the final registration.",
        ],
      },
    ],
  },
  {
    id: "a6",
    slug: "mergers-acquisitions-legal-essentials",
    title: "M&A Essentials: Legal Considerations Founders Often Overlook",
    category: "Corporate Advisory",
    excerpt: "From representation warranties to escrow structuring, founders navigating their first M&A transaction often miss critical legal protections. Here's what matters.",
    coverIcon: "💼",
    author: "Adv. Sojan Paul",
    authorRole: "Partner",
    date: "November 22, 2025",
    readTime: "7 min read",
    tags: ["M&A", "Corporate Law", "Due Diligence", "Contracts"],
    content: [
      {
        paragraphs: [
          "Across decades of advising on mergers, acquisitions and commercial transactions, a recurring theme emerges when working with founders navigating their first M&A process: commercial enthusiasm often outpaces legal preparation, and critical protections get negotiated away under deal-closing pressure.",
        ],
      },
      {
        heading: "Representations and Warranties Deserve More Than a Skim",
        paragraphs: [
          "The representations and warranties section is frequently treated as standard legal boilerplate by founders eager to close. In reality, this is where liability allocation actually happens. A warranty that is too broadly worded, or a disclosure schedule that is incomplete, can expose a seller to indemnification claims years after closing.",
          "Equally, buyers who accept thin warranty coverage without adequate due diligence often discover the gaps only when integration reveals problems the warranties should have covered.",
        ],
      },
      {
        heading: "Escrow and Indemnification Structuring",
        paragraphs: [
          "Escrow arrangements — holding back a percentage of consideration to cover potential indemnification claims — are standard, but the structuring details matter enormously. Key negotiation points include:",
        ],
        list: [
          "Escrow percentage and duration relative to deal size and risk profile",
          "Basket and cap thresholds — the minimum claim size and maximum liability exposure",
          "Survival periods for different categories of warranties (tax and IP warranties often survive longer)",
          "Whether escrow is the sole remedy or indemnification can extend beyond it",
        ],
      },
      {
        heading: "Regulatory Approvals — Plan the Timeline Early",
        paragraphs: [
          "Depending on the sector and deal size, approvals from the Competition Commission of India, sectoral regulators, or RBI (for transactions involving foreign investment) can materially affect closing timelines. We routinely advise clients to map the regulatory approval pathway during the term sheet stage, not after signing definitive agreements — the difference in negotiating leverage is significant.",
        ],
      },
      {
        heading: "Employee and Contractual Continuity",
        paragraphs: [
          "Particularly in asset-purchase structures, the treatment of existing employment contracts, key vendor agreements, and any change-of-control clauses in material contracts requires careful pre-closing review. A change-of-control clause triggering termination rights in a critical supplier agreement can materially affect the value being acquired.",
        ],
      },
      {
        heading: "Our Recommendation",
        paragraphs: [
          "Engage legal counsel at the term sheet stage, not after definitive documentation begins. The most valuable legal interventions in M&A transactions happen early — when commercial terms are still flexible — rather than at the eleventh hour when deal fatigue makes thorough negotiation more difficult.",
        ],
      },
    ],
  },
];

export const getArticleBySlug = (slug: string): Article | undefined =>
  ARTICLES.find(a => a.slug === slug);

export const getRelatedArticles = (current: Article, count = 3): Article[] =>
  ARTICLES.filter(a => a.id !== current.id && a.category === current.category).slice(0, count)
    .concat(ARTICLES.filter(a => a.id !== current.id && a.category !== current.category))
    .slice(0, count);


