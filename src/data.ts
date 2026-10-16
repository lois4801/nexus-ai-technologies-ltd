/* All deck content — sourced from the Nexus AI Technologies Ltd business plan
   (Nova Scotia, October 2026 draft) and ISED Canada / Statistics Canada
   SME statistics (2024–2025). Financials are founder-supplied projections. */

export const SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "problem", label: "Problem" },
  { id: "opportunity", label: "Opportunity" },
  { id: "model", label: "Model" },
  { id: "services", label: "Services" },
  { id: "innovation", label: "Platform" },
  { id: "financials", label: "Financials" },
  { id: "ask", label: "The Ask" },
  { id: "roadmap", label: "Roadmap" },
  { id: "edge", label: "Why Nexus" },
  { id: "contact", label: "Contact" },
] as const;

export const PROBLEM_POINTS = [
  {
    n: "01",
    title: "No in-house engineering",
    body: "Most smaller organizations can't justify a technical hire — so digital work stalls, or ships without ownership.",
  },
  {
    n: "02",
    title: "Fragmented systems",
    body: "Website here, spreadsheets there, inbox everywhere. Tools don't talk, so staff re-type the same data all week.",
  },
  {
    n: "03",
    title: "Repetitive manual work",
    body: "Quotes, follow-ups, scheduling, reporting — hours of automatable process absorbed by people every single day.",
  },
  {
    n: "04",
    title: "Data without insight",
    body: "Business data exists but never becomes a decision. Owners fly blind on margins, pipeline and demand.",
  },
];

export const MARKET_STATS = [
  {
    value: 1099521,
    display: "1.10M",
    label: "Employer businesses in Canada",
    sub: "Statistics Canada Business Register, Dec 2024",
  },
  {
    value: 98.2,
    display: "98.2%",
    label: "of them are small businesses",
    sub: "1.08M firms with 1–99 employees",
  },
  {
    value: 25320,
    display: "25,320",
    label: "SMBs in Nova Scotia",
    sub: "Nexus's home market — most in Atlantic Canada",
  },
  {
    value: 12.5,
    display: "12.5%",
    label: "of Canadian smaller firms use AI",
    sub: "ISED SME AI Adoption Blueprint — the gap is the opportunity",
  },
];

export const ENGINES = {
  now: {
    tag: "Engine 01 — Now",
    title: "Scoped client services",
    body: "Websites, e-commerce, custom software, AI chatbots and workflows, BI dashboards — sold as fixed-scope, milestone-billed projects.",
    points: ["Revenue from month one", "Direct line to real customer problems", "Funds and informs the platform"],
  },
  next: {
    tag: "Engine 02 — Next",
    title: "Proprietary AI platform",
    body: "A narrowly-scoped business automation & intelligence proof of concept, validated with real users before any subscription launch.",
    points: ["Recurring revenue potential", "IP built from observed demand", "Commercialization gate before scale"],
  },
};

export type PricingItem = {
  name: string;
  min: number;
  max: number;
  unit: string;
  stage: string;
};

export const PRICING: Record<"projects" | "recurring" | "saas", PricingItem[]> = {
  projects: [
    { name: "Business website", min: 1500, max: 3000, unit: "/ project", stage: "Service prep" },
    { name: "Premium website", min: 3500, max: 8000, unit: "/ project", stage: "Service prep" },
    { name: "E-commerce", min: 3000, max: 10000, unit: "/ project", stage: "Service prep" },
    { name: "Custom software", min: 5000, max: 30000, unit: "/ project", stage: "Service prep" },
    { name: "AI chatbot", min: 1000, max: 4000, unit: "/ project", stage: "Prototype" },
    { name: "AI workflows", min: 2000, max: 15000, unit: "/ project", stage: "Prototype" },
    { name: "BI dashboard", min: 1500, max: 10000, unit: "/ project", stage: "Service / demo" },
    { name: "AI / API integration", min: 1000, max: 8000, unit: "/ project", stage: "Service prep" },
    { name: "Consulting", min: 100, max: 200, unit: "/ hour", stage: "Service prep" },
  ],
  recurring: [
    { name: "Website care", min: 75, max: 300, unit: "/ month", stage: "Planned" },
    { name: "AI / software care", min: 200, max: 1000, unit: "/ month", stage: "Planned" },
  ],
  saas: [{ name: "Proprietary SaaS", min: 29, max: 299, unit: "/ month", stage: "Future — gated on validation" }],
};

export const PLATFORM_FEATURES = [
  { title: "Permissioned workflow automation", body: "Bounded, auditable automations — never an uncontrolled agent loose in a client's business." },
  { title: "Selected API & database connections", body: "Modular integrations that meet clients inside the tools they already pay for." },
  { title: "Document retrieval", body: "Operational knowledge made queryable, with sources attached to every answer." },
  { title: "Audit trails", body: "Every automated action logged — trust is a feature, not a promise." },
  { title: "Human review steps", body: "Checkpoints where people approve what AI proposes. Control stays with the owner." },
  { title: "Operational summaries", body: "Plain-language briefings that turn raw activity into Monday-morning decisions." },
];

export const RD_PROGRAM = [
  { step: "Requirements & feasibility", detail: "1–2 industry use cases, baseline manual workflow, measurable success criteria" },
  { step: "Prototype engineering", detail: "Backend/API integration, UX, data ingestion, bounded model orchestration" },
  { step: "Validation", detail: "Functional evaluations, permission testing, error handling, security review" },
  { step: "Market evidence", detail: "10–15 structured interviews, demos, willingness-to-pay research, pilot feedback" },
  { step: "Commercialization gate", detail: "Proceed only if reliability, customer value, support cost and pricing hold up" },
];

export const FINANCIALS = [
  { year: "Year 1", sales: 59200, gross: 59200, net: 47001, cash: 54310 },
  { year: "Year 2", sales: 89600, gross: 82880, net: 57138, cash: 118510 },
  { year: "Year 3", sales: 127600, gross: 76864, net: 31177, cash: 153540 },
];

export const USE_OF_PROCEEDS = [
  { name: "Core prototype engineering", amount: 12000, color: "#ff3b2f" },
  { name: "Architecture & integration", amount: 6000, color: "#ff6a4d" },
  { name: "Testing, QA & security", amount: 5000, color: "#ff9678" },
  { name: "Specialist contractor work", amount: 6000, color: "#e8502f" },
  { name: "Customer discovery & pilots", amount: 4000, color: "#c9b8a3" },
  { name: "Documentation & commercialization", amount: 4000, color: "#8b857a" },
  { name: "Cloud & prototype infrastructure", amount: 3000, color: "#5c564c" },
];

export const MILESTONES = [
  { stage: "Discovery", deliverable: "Defined use case + baseline", evidence: "Interview notes, specification" },
  { stage: "Prototype", deliverable: "Working limited-function demo", evidence: "Test environment, recorded demo" },
  { stage: "Validation", deliverable: "Reliability & security assessment", evidence: "Evaluation and defect logs" },
  { stage: "Pilot", deliverable: "Prospective-user feedback", evidence: "Consent-based pilot notes" },
  { stage: "Decision gate", deliverable: "Commercialization plan", evidence: "Cost model, pricing, go/no-go" },
];

export const ROADMAP = [
  {
    year: "Year 1",
    title: "Validate",
    items: ["Validate demand with 10–15 structured interviews", "Launch corporate portfolio & low-cost outreach", "Win and deliver first profitable engagements", "Deliver the defined Phase 1 prototype"],
    stat: "$59.2K",
    statLabel: "projected sales",
  },
  {
    year: "Year 2",
    title: "Systematize",
    items: ["Build referrals & recurring maintenance revenue", "Standardize repeatable service packages", "Validate platform pilots with real users"],
    stat: "$89.6K",
    statLabel: "projected sales",
  },
  {
    year: "Year 3",
    title: "Scale",
    items: ["Increase average contract size", "Product commercialization decision", "First developer hire — only if cash flow sustains it"],
    stat: "$127.6K",
    statLabel: "projected sales",
  },
];

export const DIFFERENTIATORS = [
  { title: "Integrated delivery", body: "Software + AI + analytics in one engagement — not three vendors pointing at each other." },
  { title: "Direct founder communication", body: "The person who scopes the work is the person who builds it. Nothing lost in handoff." },
  { title: "Transparent fixed scopes", body: "Written scope, milestone billing — 50/25/25 — and no surprise invoices." },
  { title: "Design-grade interfaces", body: "Tools staff actually enjoy using. Adoption is where most automation projects die." },
  { title: "Ongoing support", body: "Care plans keep systems healthy after launch — recurring revenue for Nexus, peace of mind for clients." },
];

export const RISKS = [
  { risk: "Unvalidated demand", mitigation: "Interview milestones before product spend; services revenue stands alone" },
  { risk: "Founder time constraints", mitigation: "Small fixed-scope projects sized to part-time delivery" },
  { risk: "Delivery cost overruns", mitigation: "Written scopes, milestone gates, staged expenditure" },
  { risk: "Third-party AI dependency", mitigation: "Modular architecture; providers are swappable by design" },
  { risk: "Privacy / security failure", mitigation: "Access controls, audit trails, test evidence before pilots" },
  { risk: "Grant ineligibility or cash gap", mitigation: "Base case assumes no grant; award case planned separately" },
];

export const fmtCAD = (n: number) => "$" + n.toLocaleString("en-CA");
