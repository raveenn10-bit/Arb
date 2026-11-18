/**
 * Single source of truth for company details and site content.
 * Update contact numbers, WhatsApp, address and lists here — every page reads from this file.
 */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProd) return `https://${vercelProd}`;
  return "https://www.pakarabmps.com";
}

export const site = {
  name: "Pak Arab Manpower Supply LLC",
  shortName: "Pak Arab",
  nameArabic: "باك عرب لتوريد العمالة ذ.م.م",
  /**
   * Canonical site URL. Set NEXT_PUBLIC_SITE_URL in Vercel once a custom domain is live
   * (e.g. https://www.pakarabmps.com). Otherwise the Vercel production domain is used,
   * so canonicals, sitemap and structured data always point at the site actually being served.
   */
  url: resolveSiteUrl(),
  /** Date content was last reviewed, used for sitemap lastModified. */
  lastUpdated: "2026-11-18",
  tagline: "Industrial workforce for the UAE's oil, gas and construction projects",
  description:
    "ICV-certified manpower supplier in Abu Dhabi. Skilled engineers, supervisors and tradesmen for onshore and offshore oil & gas, civil construction, mechanical and electrical projects across the UAE.",
  /** WhatsApp number in international format, digits only (no +, spaces or leading zeros). */
  whatsapp: "971553842555",
  whatsappDisplay: "+971 55 384 2555",
  phones: [
    { label: "Office", display: "+971 2 679 2576", tel: "+97126792576" },
    { label: "Mobile", display: "+971 55 384 2555", tel: "+971553842555" },
    { label: "Mobile", display: "+971 56 699 5962", tel: "+971566995962" },
  ],
  email: "info@pakarabmps.com",
  copyrightYear: 2026,
  address: {
    line1: "Office No. 01, M-Floor, Building C-225",
    line2: "Shabiya-12, Mussafah Commercial",
    poBox: "P.O. Box 133046",
    city: "Abu Dhabi",
    country: "United Arab Emirates",
    countryCode: "AE",
    mapQuery: "Shabiya 12, Mussafah, Abu Dhabi",
  },
} as const;

export const nav = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/workforce", label: "Workforce" },
  { href: "/clients", label: "Clients" },
  { href: "/contact", label: "Contact" },
] as const;

export const credentials = [
  {
    id: "icv",
    title: "ICV Certified",
    detail: "In-Country Value certified under the UAE ICV programme.",
  },
  {
    id: "adnoc",
    title: "ADNOC Approved",
    detail: "Approved supplier with ADNOC-approved Job Performers available.",
  },
  {
    id: "cicpa",
    title: "CICPA Eligible",
    detail: "Eligible for CICPA permits for restricted and offshore sites.",
  },
  {
    id: "iso",
    title: "ISO 9001 · 14001 · 45001",
    detail: "Quality, environmental and occupational health & safety systems.",
  },
] as const;

export const isoStandards = [
  { code: "ISO 9001:2015", name: "Quality Management System" },
  { code: "ISO 14001:2015", name: "Environmental Management System" },
  { code: "ISO 45001:2018", name: "Occupational Health & Safety" },
] as const;

export type SectorSlug = "oil-gas" | "civil-construction" | "mechanical" | "electrical-instrumentation";

export type Sector = {
  slug: SectorSlug;
  index: string;
  title: string;
  short: string;
  summary: string;
  body: string[];
  image: string;
  imageAlt: string;
  imagePosition?: string;
  highlights: string[];
  tradeGroups: TradeGroup[];
  divisions: Array<"MEP" | "Civil">;
};

export type TradeGroup =
  | "Management & Engineering"
  | "Supervision & Foremen"
  | "Welding & Fabrication"
  | "Rigging & Lifting"
  | "Electrical & Instrumentation"
  | "Civil Trades"
  | "Operators & Drivers"
  | "HSE & Site Support"
  | "Admin & Facilities";

export type Trade = { name: string; group: TradeGroup; division: "MEP" | "Civil" };

export const sectors: Sector[] = [
  {
    slug: "oil-gas",
    index: "01",
    title: "Oil & Gas",
    short: "Onshore & offshore",
    summary:
      "Technical and non-technical crews for refineries, plants, pipelines and offshore platforms, with ADNOC-approved Job Performers and CICPA-eligible mobilisation.",
    body: [
      "The UAE's oil and gas industry runs on reliable people. We have supplied technical and non-technical manpower to major operators and EPC contractors across the sector, onshore and offshore.",
      "Our ICV and ADNOC credentials, together with CICPA permit eligibility, mean our teams can be mobilised to controlled sites with the documentation already in order.",
    ],
    image: "/images/crew-refinery-sunset.webp",
    imageAlt: "Pak Arab Manpower Supply crew in red branded coveralls reviewing plans at a refinery at sunset",
    imagePosition: "70% center",
    highlights: [
      "ADNOC-approved Job Performers and Performing Authorities",
      "CICPA-eligible workforce for restricted and offshore sites",
      "Shutdown, turnaround and long-term maintenance crews",
      "Short- and long-term contracts",
    ],
    tradeGroups: [
      "Management & Engineering",
      "Supervision & Foremen",
      "Welding & Fabrication",
      "Rigging & Lifting",
      "HSE & Site Support",
    ],
    divisions: ["MEP"],
  },
  {
    slug: "civil-construction",
    index: "02",
    title: "Civil & Construction",
    short: "Building & infrastructure",
    summary:
      "Masons, carpenters, steel fixers, foremen and supervisors for building, infrastructure and fit-out projects across the Emirates.",
    body: [
      "The UAE remains one of the region's most active construction markets. We support contractors with skilled and competitively priced civil teams, from general helpers to experienced foremen and supervisors.",
      "Every worker is inducted before mobilisation, and our site coordinators stay in contact with your project team for the whole contract.",
    ],
    image: "/images/scaffold-carpentry.webp",
    imageAlt: "Construction workers in hard hats assembling timber formwork on site",
    highlights: [
      "Shuttering, gypsum and finishing carpenters",
      "Block, plaster, ceramic, interlock and concrete masons",
      "Steel fixers, bar benders and scaffolders",
      "Civil chargehands, foremen and supervisors",
    ],
    tradeGroups: ["Civil Trades", "Supervision & Foremen", "Operators & Drivers", "Rigging & Lifting", "HSE & Site Support"],
    divisions: ["Civil"],
  },
  {
    slug: "mechanical",
    index: "03",
    title: "Mechanical",
    short: "Piping, fabrication & millwright",
    summary:
      "Welders, fitters, fabricators, millwrights and mechanical helpers for piping, structural and equipment installation work.",
    body: [
      "Mechanical scopes demand qualified hands. We provide multi-process welders (GTAW/SMAW), piping and structural fitters and fabricators, millwright technicians and the supervisors who lead them.",
      "Crews can be supplied for fabrication shops, plant installation, shutdowns and ongoing maintenance.",
    ],
    image: "/images/pipe-welding.webp",
    imageAlt: "Welder in protective mask joining a large steel pipe in a fabrication shop",
    highlights: [
      "Multi-process welders (GTAW/SMAW) and SMAW welders",
      "Piping & structural fitters and fabricators",
      "Millwright technicians and grinders",
      "Welding engineers, supervisors and QA/QC inspectors",
    ],
    tradeGroups: ["Welding & Fabrication", "Supervision & Foremen", "Rigging & Lifting", "Management & Engineering"],
    divisions: ["MEP"],
  },
  {
    slug: "electrical-instrumentation",
    index: "04",
    title: "Electrical & MEP",
    short: "Electrical, instrumentation & HVAC",
    summary:
      "Industrial and domestic electricians, instrument technicians, HVAC technicians, ductmen and plumbers for MEP packages.",
    body: [
      "From plant instrumentation to building services, we supply the electrical and MEP trades that keep projects running.",
      "Industrial electricians and instrument technicians support oil & gas and process facilities, while HVAC, plumbing and domestic electrical teams cover commercial and residential builds.",
    ],
    image: "/images/instrument-technician.webp",
    imageAlt: "Technician in orange coveralls inspecting instrumentation panels at a plant",
    highlights: [
      "Industrial electricians and instrument technicians",
      "HVAC technicians and ductmen",
      "Plumbers and domestic electricians",
      "MEP supervision and project coordination",
    ],
    tradeGroups: ["Electrical & Instrumentation", "Supervision & Foremen", "HSE & Site Support"],
    divisions: ["MEP", "Civil"],
  },
];

export const trades: Trade[] = [
  // MEP — onshore/offshore
  { name: "Site Manager", group: "Management & Engineering", division: "MEP" },
  { name: "Mechanical Engineer", group: "Management & Engineering", division: "MEP" },
  { name: "Project Engineer", group: "Management & Engineering", division: "MEP" },
  { name: "Construction Engineer", group: "Management & Engineering", division: "MEP" },
  { name: "Welding Engineer", group: "Management & Engineering", division: "MEP" },
  { name: "Project Coordinator", group: "Management & Engineering", division: "MEP" },
  { name: "Material Coordinator", group: "Management & Engineering", division: "MEP" },
  { name: "Welding Supervisor", group: "Supervision & Foremen", division: "MEP" },
  { name: "Structural Supervisor", group: "Supervision & Foremen", division: "MEP" },
  { name: "Structural Foreman", group: "Supervision & Foremen", division: "MEP" },
  { name: "Piping Foreman", group: "Supervision & Foremen", division: "MEP" },
  { name: "Job Performer (ADNOC Approved)", group: "Supervision & Foremen", division: "MEP" },
  { name: "Performing Authority", group: "Supervision & Foremen", division: "MEP" },
  { name: "QA/QC Inspector", group: "HSE & Site Support", division: "MEP" },
  { name: "Safety Officer", group: "HSE & Site Support", division: "MEP" },
  { name: "Multi-process Welder (GTAW/SMAW)", group: "Welding & Fabrication", division: "MEP" },
  { name: "Welder (SMAW)", group: "Welding & Fabrication", division: "MEP" },
  { name: "Piping & Structural Fabricator", group: "Welding & Fabrication", division: "MEP" },
  { name: "Piping & Structural Fitter", group: "Welding & Fabrication", division: "MEP" },
  { name: "Grinder", group: "Welding & Fabrication", division: "MEP" },
  { name: "Iron Worker", group: "Welding & Fabrication", division: "MEP" },
  { name: "Erector", group: "Welding & Fabrication", division: "MEP" },
  { name: "Millwright Technician", group: "Welding & Fabrication", division: "MEP" },
  { name: "Mechanical Helper", group: "Welding & Fabrication", division: "MEP" },
  { name: "Painter (Brush & Spray)", group: "Welding & Fabrication", division: "MEP" },
  { name: "Sand Blaster", group: "Welding & Fabrication", division: "MEP" },
  { name: "Rigging Supervisor", group: "Rigging & Lifting", division: "MEP" },
  { name: "Rigging Foreman", group: "Rigging & Lifting", division: "MEP" },
  { name: "Rigger", group: "Rigging & Lifting", division: "MEP" },
  { name: "Scaffolder", group: "Rigging & Lifting", division: "MEP" },
  { name: "Man-lift Operator", group: "Rigging & Lifting", division: "MEP" },
  { name: "Industrial Electrician", group: "Electrical & Instrumentation", division: "MEP" },
  { name: "Instrument Technician", group: "Electrical & Instrumentation", division: "MEP" },
  // Civil
  { name: "General Helper (Labourer)", group: "Civil Trades", division: "Civil" },
  { name: "Steel Fixer", group: "Civil Trades", division: "Civil" },
  { name: "Bar Bender", group: "Civil Trades", division: "Civil" },
  { name: "Shuttering Carpenter", group: "Civil Trades", division: "Civil" },
  { name: "Gypsum Carpenter", group: "Civil Trades", division: "Civil" },
  { name: "Finishing Carpenter", group: "Civil Trades", division: "Civil" },
  { name: "Block / Plaster Mason", group: "Civil Trades", division: "Civil" },
  { name: "Ceramic Mason", group: "Civil Trades", division: "Civil" },
  { name: "Interlock Mason", group: "Civil Trades", division: "Civil" },
  { name: "Pasco Mason", group: "Civil Trades", division: "Civil" },
  { name: "Concrete Mason", group: "Civil Trades", division: "Civil" },
  { name: "Painter (Brush)", group: "Civil Trades", division: "Civil" },
  { name: "Painter (Spray)", group: "Civil Trades", division: "Civil" },
  { name: "Scaffolder (Civil)", group: "Rigging & Lifting", division: "Civil" },
  { name: "Rigger & Jointer", group: "Rigging & Lifting", division: "Civil" },
  { name: "Domestic Electrician", group: "Electrical & Instrumentation", division: "Civil" },
  { name: "HVAC Technician", group: "Electrical & Instrumentation", division: "Civil" },
  { name: "Ductman", group: "Electrical & Instrumentation", division: "Civil" },
  { name: "Plumber", group: "Electrical & Instrumentation", division: "Civil" },
  { name: "Forklift Operator", group: "Operators & Drivers", division: "Civil" },
  { name: "Hoist Operator", group: "Operators & Drivers", division: "Civil" },
  { name: "Light Duty Driver", group: "Operators & Drivers", division: "Civil" },
  { name: "Heavy Duty Driver", group: "Operators & Drivers", division: "Civil" },
  { name: "Chargehand (Civil)", group: "Supervision & Foremen", division: "Civil" },
  { name: "Foreman (Civil)", group: "Supervision & Foremen", division: "Civil" },
  { name: "Supervisor (Civil)", group: "Supervision & Foremen", division: "Civil" },
  { name: "Project Coordinator (Civil)", group: "Management & Engineering", division: "Civil" },
  { name: "HSE / Safety Officer", group: "HSE & Site Support", division: "Civil" },
  { name: "Flagman", group: "HSE & Site Support", division: "Civil" },
  { name: "Fire Watcher", group: "HSE & Site Support", division: "Civil" },
  { name: "Document Controller", group: "Admin & Facilities", division: "Civil" },
  { name: "Admin & Clerical Staff", group: "Admin & Facilities", division: "Civil" },
  { name: "Office Boy", group: "Admin & Facilities", division: "Civil" },
  { name: "Cleaner", group: "Admin & Facilities", division: "Civil" },
  { name: "Gardener", group: "Admin & Facilities", division: "Civil" },
  { name: "Landscape Worker", group: "Admin & Facilities", division: "Civil" },
];

export const tradeGroups: TradeGroup[] = [
  "Management & Engineering",
  "Supervision & Foremen",
  "Welding & Fabrication",
  "Rigging & Lifting",
  "Electrical & Instrumentation",
  "Civil Trades",
  "Operators & Drivers",
  "HSE & Site Support",
  "Admin & Facilities",
];

export type Client = { slug: string; name: string; dark?: boolean; wide?: boolean };

export const clients: Client[] = [
  { slug: "adnoc", name: "ADNOC — Abu Dhabi National Oil Company" },
  { slug: "npcc", name: "NPCC — National Petroleum Construction Company" },
  { slug: "lamprell", name: "Lamprell" },
  { slug: "altrad", name: "Altrad" },
  { slug: "etisalat", name: "etisalat by e&" },
  { slug: "archirodon", name: "Archirodon" },
  { slug: "tecnicas-reunidas", name: "Técnicas Reunidas" },
  { slug: "emirates-steel", name: "Emirates Steel" },
  { slug: "cpp", name: "China Petroleum Pipeline Engineering — Abu Dhabi", wide: true },
  { slug: "china-comservice", name: "China Comservice" },
  { slug: "al-jaber", name: "Al Jaber Group" },
  { slug: "probus", name: "Probus Engineering & Construction" },
  { slug: "gisco", name: "GISCO — Gulf Industrial Services Co." },
  { slug: "descon", name: "Descon Engineering" },
  { slug: "denholm-yam", name: "Denholm Yam Contracting Company" },
  { slug: "asgc", name: "ASGC" },
  { slug: "ogasco", name: "OGASCO" },
  { slug: "eppi", name: "EPPI — Emirates Preinsulated Pipes Industries" },
  { slug: "micoda", name: "MICODA Process Systems International" },
  { slug: "robt-stone", name: "Robt Stone" },
  { slug: "nsh", name: "NSH" },
  { slug: "ali-sons", name: "Ali & Sons" },
  { slug: "al-shoumoukh", name: "Al Shoumoukh General Trading" },
  { slug: "tekzone", name: "Tekzone Industrial Construction" },
  { slug: "alnasr", name: "Al Nasr" },
  { slug: "galfa-coat", name: "Galva Coat Industries", wide: true },
];

export const processSteps = [
  {
    title: "Share your requirement",
    body: "Tell us the trades, headcount, site location and contract length. A WhatsApp message or call is enough to start.",
  },
  {
    title: "Shortlist & vetting",
    body: "We match candidates from our pool, verify experience and certifications, and share profiles for your approval.",
  },
  {
    title: "Induction & mobilisation",
    body: "Approved workers complete induction and site documentation, including CICPA permits where the site requires them.",
  },
  {
    title: "On-site support",
    body: "We handle payroll, benefits and compliance, and keep a coordinator in contact with your team throughout the contract.",
  },
] as const;

export const faqs = [
  {
    q: "Do you supply manpower for both short-term and long-term projects?",
    a: "Yes. We supply individual tradesmen and complete crews for short assignments such as shutdowns and turnarounds, as well as long-term contracts for construction and maintenance.",
  },
  {
    q: "Can your workers be mobilised to CICPA-controlled or offshore sites?",
    a: "Pak Arab Manpower Supply is eligible for CICPA permits, so our workforce can be processed for restricted onshore and offshore sites. Permit timelines depend on the site and are confirmed when we receive your requirement.",
  },
  {
    q: "Which certifications do you hold?",
    a: "We are ICV (In-Country Value) certified and ADNOC approved, and we operate management systems aligned with ISO 9001 (quality), ISO 14001 (environment) and ISO 45001 (occupational health & safety).",
  },
  {
    q: "Who handles payroll, benefits and visa compliance?",
    a: "We do. Workers remain on our payroll, and we manage their salaries, benefits and labour-law compliance, so you get a productive team without the administrative load.",
  },
  {
    q: "How quickly can you mobilise a team?",
    a: "It depends on the trades, headcount and site permits. Send us your requirement and we will confirm availability and a realistic mobilisation date.",
  },
  {
    q: "Are your workers trained and inducted?",
    a: "Yes. Company policy requires every worker to complete induction before mobilisation, with refresher training at regular intervals. Our QA/QC function monitors performance on site.",
  },
  {
    q: "What does ICV certification mean when hiring a manpower supplier?",
    a: "ICV (In-Country Value) is a UAE government programme that measures how much of a supplier's spending stays in the UAE economy. ADNOC and many government entities consider a supplier's ICV certificate when evaluating tenders, so working with an ICV-certified manpower supplier such as Pak Arab can support your own bid and procurement requirements.",
  },
  {
    q: "What is a CICPA pass and why does it matter?",
    a: "CICPA is the Critical Infrastructure and Coastal Protection Authority, which controls access to restricted oil & gas, industrial and coastal sites in Abu Dhabi. Workers need a valid CICPA pass to enter these sites. Pak Arab Manpower Supply is eligible to process CICPA permits for its workforce.",
  },
  {
    q: "Which areas of the UAE do you cover?",
    a: "We are based in Mussafah, Abu Dhabi, and supply manpower to projects across all seven Emirates, onshore and offshore.",
  },
] as const;

export const emirates = [
  "Abu Dhabi",
  "Abu Dhabi — Offshore",
  "Al Ain",
  "Al Dhafra / Ruwais",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
] as const;

export const durations = [
  "Less than 1 month",
  "1 – 3 months",
  "3 – 6 months",
  "6 – 12 months",
  "More than 12 months",
  "Not sure yet",
] as const;
