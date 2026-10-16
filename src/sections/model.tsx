import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionHead, Asterisk } from "../components/bits";
import { ENGINES, PRICING, PLATFORM_FEATURES, RD_PROGRAM, fmtCAD, type PricingItem } from "../data";
import { RangeBar } from "../components/charts";

/* ================= DUAL-ENGINE MODEL ================= */
export function Model() {
  const [engine, setEngine] = useState<"now" | "next">("now");
  const cur = ENGINES[engine];

  return (
    <section id="model" className="px-4 md:px-8 py-24 md:py-36 max-w-[1400px] mx-auto">
      <SectionHead
        index="03"
        kicker="The model"
        title="Two engines,"
        accent="one flywheel."
        sub="Near-term revenue from scoped client services funds and informs the longer-term prize: validated proprietary AI software. The services business stands on its own — grant or no grant."
      />

      {/* engine switcher */}
      <div className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-14">
        <div className="flex md:flex-col gap-3" role="tablist" aria-label="Business engines">
          {(["now", "next"] as const).map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={engine === k}
              onClick={() => setEngine(k)}
              className={`flex-1 md:flex-none text-left p-5 md:p-6 border cursor-pointer transition-colors duration-200 min-h-[44px] ${
                engine === k
                  ? "border-[var(--nx-red)] bg-[var(--nx-panel)]"
                  : "border-[var(--nx-line)] hover:border-[var(--nx-line-strong)]"
              }`}
            >
              <div className={`font-mono2 text-[10px] tracking-[0.2em] uppercase mb-2 ${engine === k ? "text-[var(--nx-red)]" : "text-[var(--nx-muted)]"}`}>
                {ENGINES[k].tag}
              </div>
              <div className="display text-lg md:text-xl leading-tight">{ENGINES[k].title}</div>
            </button>
          ))}
          <div className="hidden md:flex items-center gap-3 mt-4 font-mono2 text-[11px] tracking-[0.12em] uppercase text-[var(--nx-muted)]">
            <Asterisk className="w-4 h-4 text-[var(--nx-red)]" />
            Services teach us what to build
          </div>
        </div>

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={engine}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="border border-[var(--nx-line)] bg-[var(--nx-panel)] p-6 md:p-12"
            >
              <p className="text-base md:text-xl leading-relaxed text-[var(--nx-cream)] max-w-[56ch]">{cur.body}</p>
              <ul className="mt-8 space-y-0 divide-y divide-[var(--nx-line)] border-y border-[var(--nx-line)]">
                {cur.points.map((p, i) => (
                  <li key={p} className="flex items-center gap-4 py-4">
                    <span className="font-mono2 text-[11px] text-[var(--nx-red)]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm md:text-base text-[var(--nx-cream-dim)]">{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center gap-3 font-mono2 text-[11px] md:text-xs tracking-[0.15em] uppercase">
                <span className={engine === "now" ? "text-[var(--nx-red)]" : "text-[var(--nx-muted)]"}>Cash flow</span>
                <motion.span layout className="text-[var(--nx-cream)]">→</motion.span>
                <span className="text-[var(--nx-muted)]">Customer insight</span>
                <span className="text-[var(--nx-cream)]">→</span>
                <span className={engine === "next" ? "text-[var(--nx-red)]" : "text-[var(--nx-muted)]"}>Platform IP</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ================= SERVICES & PRICING ================= */
const PRICE_TABS = [
  { key: "projects", label: "Project work", note: "Milestone billing — typically 50% deposit / 25% stage / 25% acceptance" },
  { key: "recurring", label: "Recurring care", note: "Planned monthly retainers — the compounding layer" },
  { key: "saas", label: "Future SaaS", note: "Not launched. Gated on prototype validation" },
] as const;

export function Services() {
  const [tab, setTab] = useState<keyof typeof PRICING>("projects");
  const items: PricingItem[] = PRICING[tab];
  const scaleMax = tab === "projects" ? 30000 : tab === "recurring" ? 1000 : 300;
  const note = PRICE_TABS.find((t) => t.key === tab)!.note;

  return (
    <section id="services" className="border-y border-[var(--nx-line)] bg-[var(--nx-panel)]">
      <div className="px-4 md:px-8 py-24 md:py-36 max-w-[1400px] mx-auto">
        <SectionHead
          index="04"
          kicker="Services & pricing"
          title="Priced to be"
          accent="said yes to."
          sub="Twelve offerings across three layers — from $1,000 chatbots to $30,000+ custom builds. Every range below is proposed and scoped per client; nothing here is speculative enterprise pricing."
        />

        {/* tabs */}
        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Pricing layers">
          {PRICE_TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={`min-h-[44px] px-5 font-mono2 text-[11px] md:text-xs tracking-[0.15em] uppercase border cursor-pointer transition-colors duration-150 ${
                tab === t.key
                  ? "bg-[var(--nx-red)] border-[var(--nx-red)] text-[#0c0b0a] font-semibold"
                  : "border-[var(--nx-line-strong)] text-[var(--nx-muted)] hover:text-[var(--nx-cream)] hover:border-[var(--nx-cream)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <div className="border-t border-[var(--nx-line-strong)]">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="group grid grid-cols-1 md:grid-cols-[minmax(180px,1fr)_2fr_minmax(120px,auto)] items-center gap-2 md:gap-6 py-4 border-b border-[var(--nx-line)] transition-colors duration-150 hover:bg-[rgba(241,237,227,0.03)]"
                >
                  <div>
                    <div className="text-sm md:text-lg font-semibold text-[var(--nx-cream)]">{item.name}</div>
                    <div className="font-mono2 text-[10px] tracking-[0.12em] uppercase text-[var(--nx-muted)] mt-0.5">{item.stage}</div>
                  </div>
                  <RangeBar min={item.min} max={item.max} scaleMax={scaleMax} unit={item.unit} />
                  <div className="font-mono2 text-xs md:text-sm tabular text-[var(--nx-cream)] md:text-right">
                    {fmtCAD(item.min)}–{fmtCAD(item.max)}
                    <span className="text-[var(--nx-muted)]"> {item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 font-mono2 text-[11px] md:text-xs tracking-[0.06em] text-[var(--nx-muted)]">→ {note}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ================= INNOVATION PLATFORM ================= */
export function Innovation() {
  return (
    <section id="innovation" className="px-4 md:px-8 py-24 md:py-36 max-w-[1400px] mx-auto">
      <SectionHead
        index="05"
        kicker="The innovation"
        title="Nexus AI Business Automation &"
        accent="Intelligence Platform"
        sub="Phase 1 is a narrowly scoped proof of concept — not a claimed finished enterprise product. Product decisions will be driven by observed customer problems, not speculative subscriptions."
      />

      {/* platform concept visual */}
      <Reveal>
        <figure className="group relative mb-14 md:mb-20 overflow-hidden border border-[var(--nx-line)]">
          <div className="h-[40vh] md:h-[62vh] overflow-hidden">
            <img
              src="img/platform.jpg"
              alt="Concept render of the Nexus AI automation platform — a floating glass interface with glowing red data streams, nodes and charts"
              width={3840}
              height={2160}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,11,10,0.85)] via-transparent to-[rgba(12,11,10,0.3)] pointer-events-none" />
          <figcaption className="absolute bottom-0 left-0 right-0 p-5 md:p-8 flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono2 text-[10px] md:text-xs tracking-[0.18em] uppercase text-[var(--nx-cream)]">
              Concept render — platform interface direction
            </span>
            <span className="font-mono2 text-[10px] md:text-xs tracking-[0.18em] uppercase text-[var(--nx-red)]">
              Phase 1 / Proof of concept
            </span>
          </figcaption>
        </figure>
      </Reveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--nx-line)] border border-[var(--nx-line)]">
        {PLATFORM_FEATURES.map((f, i) => (
          <div key={f.title} className="group bg-[var(--nx-bg)] p-6 md:p-8 transition-colors duration-200 hover:bg-[var(--nx-panel)]">
            <Reveal delay={i * 0.05}>
              <Asterisk className="w-5 h-5 text-[var(--nx-red)] mb-5 transition-transform duration-300 group-hover:rotate-90" />
              <h3 className="text-base md:text-lg font-bold leading-snug mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--nx-cream-dim)]">{f.body}</p>
            </Reveal>
          </div>
        ))}
      </div>

      {/* R&D program steps */}
      <div className="mt-16 md:mt-24">
        <Reveal>
          <h3 className="display text-xl md:text-3xl mb-8">
            The R&D program <span className="text-[var(--nx-red)]">— how we de-risk it</span>
          </h3>
        </Reveal>
        <ol className="relative border-l-2 border-[var(--nx-line-strong)] ml-2 md:ml-4 space-y-8 md:space-y-10">
          {RD_PROGRAM.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.07}>
              <li className="relative pl-8 md:pl-12">
                <span className="absolute -left-[9px] top-1 w-4 h-4 bg-[var(--nx-bg)] border-2 border-[var(--nx-red)]" aria-hidden />
                <div className="font-mono2 text-[10px] tracking-[0.2em] uppercase text-[var(--nx-red)] mb-1">
                  Step {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-base md:text-xl font-bold">{s.step}</div>
                <p className="mt-1 text-sm md:text-base text-[var(--nx-cream-dim)] max-w-[62ch] leading-relaxed">{s.detail}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
