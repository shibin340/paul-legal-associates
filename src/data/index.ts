import type { NavLink, PracticeArea, TeamMember, Stat, Testimonial, OfficeHour, Value, Milestone } from "../types";

export const NAV_LINKS: NavLink[] = [
  { label: "Home",       path: "/" },
  { label: "About Us",   path: "/about" },
  { label: "Expertise",  path: "/expertise" },
  { label: "Our Team",   path: "/team" },
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
    photo: "/images/polachan.jpg",
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
    photo: "/images/sojan.jpg",
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
    photo: "/images/sonam.jpg",
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
