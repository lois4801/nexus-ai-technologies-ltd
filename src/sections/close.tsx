import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Asterisk, Counter, Reveal, SectionHead, Ticker } from "../components/bits";
import { DIFFERENTIATORS, FINANCIALS, MILESTONES, RISKS, ROADMAP } from "../data";
import { CashLine, FinancialBars, ProceedsDonut } from "../components/charts";

/* ================= FINANCIALS ================= */
export function Financials() {
  const [view, setView] = useState<"pl" | "cash">("pl");
  const y3 = FINANCIALS[2];

  return (
    <section id="financials" className="border-y border-[var(--nx-line)] bg-[var(--nx-panel)] grid-bg-fine">
      <div className="px-4 md:px-8 py-24 md:py-36 max-w-[1400px] mx-auto">
        <SectionHead
          index="06"
          kicker="Three-year forecast"
          title="Profitable from"
          accent="year one."
          sub="Founder-supplied projections, pre-audit. The base case assumes zero grant funding and zero founder salary in Year 1 — the forecast stands on service revenue alone."
        />

        {/* headline metrics */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16">
          {[
            { v: 59200, l: "Year 1 projected sales", f: true },
            { v: y3.sales / FINANCIALS[0].sales, l: "revenue multiple by Year 3", f: false },
            { v: 47001, l: "Year 1 projected net profit", f: true },
          ].map((m, i) => (
            <Reveal key={m.l} delay={i * 0.08}>
              <div className="border-t-2 border-[var(--nx-red)] pt-4">
                <div className="display text-[clamp(1.6rem,4.5vw,3.6rem)] text-[var(--nx-cream)] leading-none">
                  {m.f ? (
                    <Counter to={m.v} format={(v) => "$" + Math.round(v / 1000).toLocaleString() + "K"} />
                  ) : (
                    <Counter to={m.v} format={(v) => v.toFixed(1) + "×"} />
                  )}
                </div>
                <div className="font-mono2 text-[10px] md:text-[11px] tracking-[0.12em] uppercase text-[var(--nx-muted)] mt-2">{m.l}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* chart toggle */}
        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Financial chart view">
          {(
            [
              { k: "pl", l: "Revenue & profit" },
              { k: "cash", l: "Cash projection" },
            ] as const
          ).map((t) => (
            <button
              key={t.k}
              type="button"
              role="tab"
              aria-selected={view === t.k}
              onClick={() => setView(t.k)}
              className={`min-h-[44px] px-5 font-mono2 text-[11px] md:text-xs tracking-[0.15em] uppercase border cursor-pointer transition-colors duration-150 ${
                view === t.k
                  ? "bg-[var(--nx-cream)] border-[var(--nx-cream)] text-[#0c0b0a] font-semibold"
                  : "border-[var(--nx-line-strong)] text-[var(--nx-muted)] hover:text-[var(--nx-cream)]"
              }`}
            >
              {t.l}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
            className="border border-[var(--nx-line)] bg-[var(--nx-bg)] p-5 md:p-10"
          >
            {view === "pl" ? <FinancialBars /> : <CashLine />}
          </motion.div>
        </AnimatePresence>

        <p className="mt-6 font-mono2 text-[10px] md:text-[11px] tracking-[0.06em] text-[var(--nx-muted)] leading-relaxed max-w-[80ch]">
          Figures reproduce the founder-supplied P&L snapshot — unaudited, pre-contract, and to be rebuilt bottom-up
          (customers × hours × capacity) before any external filing. Hover or tap the chart for exact values.
        </p>
      </div>
    </section>
  );
}

/* ================= THE ASK ================= */
export function Ask() {
  return (
    <section id="ask" className="px-4 md:px-8 py-24 md:py-36 max-w-[1400px] mx-auto">
      <SectionHead
        index="07"
        kicker="The ask"
        title="$40,000. Seven work packages."
        accent="Zero fluff."
        sub="One defined technical validation project — non-repayable support sought against a compatible program. A possible $30,000 Phase 2 follows only if Phase 1 evidence earns it. Explore each package."
      />

      <ProceedsDonut />

      {/* milestones */}
      <div className="mt-20 md:mt-28">
        <Reveal>
          <h3 className="display text-xl md:text-3xl mb-8">
            What the money buys <span className="text-[var(--nx-red)]">— evidence at every gate</span>
          </h3>
        </Reveal>
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <div className="grid grid-cols-5 min-w-[720px] border-t border-l border-[var(--nx-line)]">
            {MILESTONES.map((m, i) => (
              <Reveal key={m.stage} delay={i * 0.06} className="h-full">
                <div className="border-b border-r border-[var(--nx-line)] p-4 md:p-6 h-full flex flex-col transition-colors duration-200 hover:bg-[var(--nx-panel)]">
                  <div className="font-mono2 text-[10px] tracking-[0.2em] text-[var(--nx-red)] mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="display text-sm md:text-lg leading-tight mb-3">{m.stage}</div>
                  <div className="text-xs md:text-sm text-[var(--nx-cream)] leading-snug">{m.deliverable}</div>
                  <div className="mt-auto pt-3 font-mono2 text-[10px] text-[var(--nx-muted)] leading-relaxed">
                    Evidence: {m.evidence}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={0.15}>
          <div className="mt-10 grid md:grid-cols-3 gap-px bg-[var(--nx-line)] border border-[var(--nx-line)]">
            {[
              { v: "$40K", l: "Phase 1 target", d: "One defined validation project, mutually exclusive work packages backed by quotations" },
              { v: "+$30K", l: "Possible Phase 2", d: "A hypothetical later phase — not secured, not assumed in any forecast" },
              { v: "$0", l: "Working capital in the ask", d: "No promotional spend presented as eligible without program confirmation" },
            ].map((c) => (
              <div key={c.l} className="bg-[var(--nx-bg)] p-6 md:p-8">
                <div className="display text-3xl md:text-4xl text-[var(--nx-red)]">{c.v}</div>
                <div className="font-mono2 text-[11px] tracking-[0.15em] uppercase text-[var(--nx-cream)] mt-2">{c.l}</div>
                <p className="text-sm text-[var(--nx-cream-dim)] mt-2 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= ROADMAP ================= */
export function Roadmap() {
  return (
    <section id="roadmap" className="border-y border-[var(--nx-line)] bg-[var(--nx-panel)]">
      <div className="px-4 md:px-8 py-24 md:py-36 max-w-[1400px] mx-auto">
        <SectionHead
          index="08"
          kicker="Growth roadmap"
          title="Validate. Systematize."
          accent="Scale."
          sub="Three years, three disciplines. Every expansion is conditional on signed work and cash flow — growth is earned, not assumed."
        />
        <div className="grid md:grid-cols-3 gap-px bg-[var(--nx-line)] border border-[var(--nx-line)]">
          {ROADMAP.map((r, i) => (
            <Reveal key={r.year} delay={i * 0.1} className="h-full">
              <div className="group bg-[var(--nx-bg)] p-6 md:p-10 h-full flex flex-col transition-colors duration-200 hover:bg-[var(--nx-panel-2)]">
                <div className="flex items-baseline justify-between mb-6">
                  <span className="display text-2xl md:text-3xl">{r.year}</span>
                  <span className="font-mono2 text-[10px] tracking-[0.2em] uppercase text-[var(--nx-red)]">{r.title}</span>
                </div>
                <ul className="space-y-3 flex-1">
                  {r.items.map((it) => (
                    <li key={it} className="flex gap-3 text-sm md:text-[15px] leading-relaxed text-[var(--nx-cream-dim)]">
                      <span className="mt-[7px] w-1.5 h-1.5 shrink-0 bg-[var(--nx-red)]" aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-[var(--nx-line)]">
                  <div className="display text-3xl md:text-4xl text-[var(--nx-cream)] tabular">{r.stat}</div>
                  <div className="font-mono2 text-[10px] tracking-[0.15em] uppercase text-[var(--nx-muted)] mt-1">{r.statLabel}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-8 font-mono2 text-[11px] md:text-xs tracking-[0.06em] text-[var(--nx-muted)]">
            → Marketing released in stages: $1,660 / $4,100 / $6,700 across Years 1–3. First developer hire only when
            contracts sustain it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= WHY NEXUS + RISKS ================= */
export function Edge() {
  const [openRisk, setOpenRisk] = useState(0);
  return (
    <section id="edge" className="px-4 md:px-8 py-24 md:py-36 max-w-[1400px] mx-auto">
      <SectionHead
        index="09"
        kicker="Why Nexus"
        title="Built different."
        accent="Honest about it."
        sub="Differentiation is a strategic intention we prove through client outcomes — and we put our risks on the table before you ask."
      />

      <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
        {/* differentiators */}
        <div>
          <Reveal>
            <h3 className="font-mono2 text-xs tracking-[0.2em] uppercase text-[var(--nx-red)] mb-6">The edge</h3>
          </Reveal>
          <ul className="divide-y divide-[var(--nx-line)] border-y border-[var(--nx-line)]">
            {DIFFERENTIATORS.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.05}>
                <li className="py-5 group">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono2 text-[11px] text-[var(--nx-muted)]">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <div className="text-base md:text-xl font-bold group-hover:text-[var(--nx-red)] transition-colors duration-150">
                        {d.title}
                      </div>
                      <p className="mt-1 text-sm md:text-base text-[var(--nx-cream-dim)] leading-relaxed">{d.body}</p>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* risks accordion */}
        <div>
          <Reveal>
            <h3 className="font-mono2 text-xs tracking-[0.2em] uppercase text-[var(--nx-red)] mb-6">
              The risks — and the mitigation
            </h3>
          </Reveal>
          <div className="border-t border-[var(--nx-line)]">
            {RISKS.map((r, i) => {
              const open = openRisk === i;
              return (
                <div key={r.risk} className="border-b border-[var(--nx-line)]">
                  <button
                    type="button"
                    onClick={() => setOpenRisk(open ? -1 : i)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between gap-4 py-4 md:py-5 text-left cursor-pointer min-h-[44px] group"
                  >
                    <span className={`text-sm md:text-base font-semibold transition-colors duration-150 ${open ? "text-[var(--nx-red)]" : "text-[var(--nx-cream)] group-hover:text-[var(--nx-red)]"}`}>
                      {r.risk}
                    </span>
                    <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
                      <Asterisk className="w-4 h-4 text-[var(--nx-red)]" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-10 text-sm md:text-[15px] leading-relaxed text-[var(--nx-cream-dim)]">
                          <span className="font-mono2 text-[10px] tracking-[0.15em] uppercase text-[var(--nx-red)]">Mitigation — </span>
                          {r.mitigation}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= CONTACT / CTA ================= */
export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden">
      {/* 4K finale backdrop */}
      <div className="absolute inset-0" aria-hidden>
        <img
          src="img/cta.jpg"
          alt=""
          width={3840}
          height={2160}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0b0a] via-[rgba(12,11,10,0.55)] to-[rgba(12,11,10,0.88)]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>
      <div className="relative z-10">
      <div className="px-4 md:px-8 pt-24 md:pt-36 pb-10 max-w-[1400px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono2 text-[11px] tracking-[0.25em] text-[var(--nx-red)]">10</span>
            <span className="h-px w-10 bg-[var(--nx-red)]" aria-hidden />
            <span className="kicker">Next step</span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display text-[clamp(3rem,10vw,9rem)] leading-[0.9]">
            Let's build the
            <br />
            <span className="text-[var(--nx-red)]">proof</span>
            <span className="text-outline"> together.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 max-w-[58ch] text-base md:text-xl leading-relaxed text-[var(--nx-cream-dim)]">
            The funding request accelerates a trajectory that paying customers already define — it never replaces them.
            Review the full plan, the work packages, and the evidence gates.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a
              href="nexus-ai-business-plan.pdf"
              download="Nexus_AI_Technologies_Business_Plan.pdf"
              className="inline-flex items-center justify-center gap-3 min-h-[52px] bg-[var(--nx-red)] text-[#0c0b0a] font-mono2 text-xs font-semibold tracking-[0.15em] uppercase px-8 transition-colors duration-150 hover:bg-[var(--nx-cream)]"
            >
              Download the full business plan
              <span aria-hidden>↓</span>
            </a>
            <button
              type="button"
              onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center min-h-[52px] border border-[var(--nx-line-strong)] text-[var(--nx-cream)] font-mono2 text-xs tracking-[0.15em] uppercase px-8 cursor-pointer transition-colors duration-150 hover:border-[var(--nx-red)] hover:text-[var(--nx-red)]"
            >
              Replay the deck ↑
            </button>
          </div>
        </Reveal>

        <div className="mt-20 md:mt-28">
          <Ticker items={["$40K Phase 1", "Nova Scotia", "AI automation", "Evidence-gated", "Services first", "October 2026"]} />
          <footer className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-8 font-mono2 text-[10px] md:text-[11px] tracking-[0.15em] uppercase text-[var(--nx-muted)]">
            <div className="flex items-center gap-2">
              <Asterisk className="w-3.5 h-3.5 text-[var(--nx-red)]" />
              Nexus AI Technologies LTD
            </div>
            <div>Confidential planning draft — October 2026</div>
            <div className="max-w-[40ch] normal-case tracking-normal leading-relaxed">
              All financials are founder-supplied projections, unaudited. Market data: ISED Canada & Statistics Canada,
              2024–2025.
            </div>
          </footer>
        </div>
      </div>
      </div>
    </section>
  );
}
