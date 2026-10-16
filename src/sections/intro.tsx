import { motion } from "framer-motion";
import { Asterisk, Counter, Reveal, SectionHead, Ticker } from "../components/bits";
import { MARKET_STATS, PROBLEM_POINTS } from "../data";
import { scrollToSection } from "../components/Nav";

/* ================= HERO ================= */
export function Hero() {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex flex-col overflow-hidden">
      {/* 4K cinematic backdrop */}
      <div className="absolute inset-0" aria-hidden>
        <img
          src="img/hero-bg.jpg"
          alt=""
          width={3840}
          height={2160}
          fetchPriority="high"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b0a] via-[rgba(12,11,10,0.72)] to-[rgba(12,11,10,0.35)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(12,11,10,0.55)] via-transparent to-[#0c0b0a]" />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      {/* corner meta labels — Spector-style microcopy */}
      <div className="hidden md:block absolute top-20 left-8 font-mono2 text-[11px] tracking-[0.2em] uppercase text-[var(--nx-muted)] leading-relaxed">
        <span className="text-[var(--nx-red)]">●</span> ピッチデック
        <br />
        Nova Scotia, Canada
        <br />
        October 2026
      </div>
      <div className="hidden md:block absolute top-20 right-8 text-right font-mono2 text-[11px] tracking-[0.2em] uppercase text-[var(--nx-muted)] leading-relaxed">
        Funding
        <br />
        Innovation
        <br />
        Growth
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 md:px-8 pt-24 pb-8 max-w-[1400px] w-full mx-auto">
        <motion.p
          className="kicker mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Confidential — for funding discussions
        </motion.p>

        <h1 className="display leading-[0.92]">
          <motion.span
            className="block text-[clamp(3rem,10vw,9rem)] text-[var(--nx-red)] whitespace-nowrap"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Nexus AI
          </motion.span>
          <motion.span
            className="block text-[clamp(1.55rem,7.2vw,6.5rem)] text-outline whitespace-nowrap"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            Technologies Ltd
          </motion.span>
          <motion.span
            className="flex items-center gap-3 md:gap-6 text-[clamp(1.9rem,8.8vw,8rem)] whitespace-nowrap"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Asterisk className="w-[clamp(1.5rem,6.5vw,5.5rem)] h-[clamp(1.5rem,6.5vw,5.5rem)] text-[var(--nx-red)] shrink-0" />
            <span>Gets to work</span>
          </motion.span>
        </h1>

        <motion.div
          className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p className="max-w-[46ch] text-base md:text-xl leading-relaxed text-[var(--nx-cream-dim)]">
            Intelligent solutions. Practical business value. We help small and medium-sized organizations modernize,
            automate, and finally use their data — starting in Atlantic Canada.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scrollToSection("ask")}
              className="inline-flex items-center justify-center min-h-[44px] whitespace-nowrap bg-[var(--nx-red)] text-[#0c0b0a] font-mono2 text-xs font-semibold tracking-[0.15em] uppercase px-6 cursor-pointer transition-colors duration-150 hover:bg-[var(--nx-cream)]"
            >
              The ask — $40K
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("problem")}
              className="inline-flex items-center justify-center min-h-[44px] whitespace-nowrap border border-[var(--nx-line-strong)] text-[var(--nx-cream)] font-mono2 text-xs tracking-[0.15em] uppercase px-6 cursor-pointer transition-colors duration-150 hover:border-[var(--nx-red)] hover:text-[var(--nx-red)]"
            >
              Read the pitch ↓
            </button>
          </div>
        </motion.div>

        {/* key numbers strip */}
        <motion.div
          className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 border-t border-[var(--nx-line)]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          {[
            { v: "$40,000", l: "Initial non-repayable grant target" },
            { v: "$70,000", l: "Broader phased development goal" },
            { v: "$1,500", l: "Founder bootstrapped capital — skin in the game" },
            { v: "$0", l: "Founder salary in Year 1" },
          ].map((s) => (
            <div key={s.l} className="py-5 pr-4 border-r border-[var(--nx-line)] last:border-r-0 max-md:odd:border-r max-md:[&:nth-child(2)]:border-r-0">
              <div className="display text-2xl md:text-4xl text-[var(--nx-cream)] tabular">{s.v}</div>
              <div className="font-mono2 text-[10px] md:text-[11px] tracking-[0.12em] uppercase text-[var(--nx-muted)] mt-2 leading-relaxed">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <Ticker
        items={[
          "AI automation",
          "Custom software",
          "Business intelligence",
          "Web & e-commerce",
          "Nova Scotia built",
          "Fixed-scope delivery",
          "Human-in-the-loop AI",
        ]}
      />
    </section>
  );
}

/* ================= PROBLEM ================= */
export function Problem() {
  return (
    <section id="problem" className="relative px-4 md:px-8 py-24 md:py-36 max-w-[1400px] mx-auto">
      <SectionHead
        index="01"
        kicker="The problem"
        title="Small business runs on"
        accent="broken workflows."
        sub="Owners and operations leads at growing organizations face the same four walls — and enterprise software was never priced or designed for them."
      />
      <div className="grid md:grid-cols-2 border-t border-l border-[var(--nx-line)]">
        {PROBLEM_POINTS.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.08}>
            <div className="group relative border-b border-r border-[var(--nx-line)] p-6 md:p-10 h-full transition-colors duration-200 hover:bg-[var(--nx-panel)]">
              <div className="font-mono2 text-[11px] tracking-[0.25em] text-[var(--nx-red)] mb-4">{p.n}</div>
              <h3 className="display text-xl md:text-3xl mb-3 normal-case tracking-normal leading-tight" style={{ textTransform: "none" }}>
                {p.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-[var(--nx-cream-dim)] max-w-[48ch]">{p.body}</p>
              <span className="absolute top-6 right-6 w-2 h-2 bg-[var(--nx-red)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden />
            </div>
          </Reveal>
        ))}
      </div>
      {/* cinematic strip */}
      <Reveal delay={0.1}>
        <div className="group relative mt-14 md:mt-20 h-[42vh] md:h-[56vh] overflow-hidden border border-[var(--nx-line)]">
          <img
            src="img/problem.jpg"
            alt="Fragmented gears and disconnected glowing nodes scattered across a dark surface — the reality of manual workflows"
            width={3840}
            height={2160}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,11,10,0.92)] via-[rgba(12,11,10,0.25)] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <p className="display text-xl md:text-4xl max-w-[20ch] leading-tight">
              The answer: <span className="text-[var(--nx-red)]">outcomes-led engagements.</span>
            </p>
            <p className="font-mono2 text-[10px] md:text-xs tracking-[0.12em] uppercase text-[var(--nx-cream-dim)] max-w-[36ch] leading-relaxed md:text-right">
              Clarify the bottleneck → scope the smallest useful solution → build, validate, support.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ================= OPPORTUNITY ================= */
export function Opportunity() {
  return (
    <section id="opportunity" className="relative border-y border-[var(--nx-line)] bg-[var(--nx-panel)] grid-bg-fine">
      <div className="px-4 md:px-8 py-24 md:py-36 max-w-[1400px] mx-auto">
        <SectionHead
          index="02"
          kicker="The opportunity"
          title="A million businesses. Almost"
          accent="no AI."
          sub="Canada's small-business economy is enormous — and its AI adoption gap is the wedge. Nexus starts where it can reach: 25,320 SMBs in Nova Scotia."
        />

        <div className="grid md:grid-cols-2 gap-px bg-[var(--nx-line)] border border-[var(--nx-line)]">
          {MARKET_STATS.map((s, i) => (
            <div key={s.label} className="bg-[var(--nx-bg)] p-6 md:p-10">
              <Reveal delay={i * 0.06}>
                <div className="display text-[clamp(2.8rem,6vw,5.5rem)] text-[var(--nx-red)] leading-none">
                  <Counter
                    to={s.value}
                    format={(v) => {
                      if (s.display === "1.10M") return (v / 1e6).toFixed(2);
                      if (s.display.includes("%")) return v.toFixed(1);
                      return Math.round(v).toLocaleString("en-CA");
                    }}
                  />
                  {s.display === "1.10M" && <span className="text-[0.5em] align-top">M</span>}
                  {s.display.includes("%") && <span className="text-[0.5em] align-top">%</span>}
                </div>
                <div className="mt-3 text-base md:text-lg font-medium text-[var(--nx-cream)]">{s.label}</div>
                <div className="mt-1 font-mono2 text-[11px] tracking-[0.1em] uppercase text-[var(--nx-muted)]">{s.sub}</div>
              </Reveal>
            </div>
          ))}
        </div>

        {/* adoption gap visual */}
        <Reveal delay={0.15}>
          <div className="mt-14 md:mt-20">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
              <h3 className="display text-xl md:text-3xl">The AI adoption gap</h3>
              <span className="font-mono2 text-[11px] tracking-[0.15em] uppercase text-[var(--nx-muted)]">
                Canadian smaller firms — ISED, 2025
              </span>
            </div>
            <div className="relative h-16 md:h-20 border border-[var(--nx-line)] overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[var(--nx-red)] flex items-center px-4"
                initial={{ width: 0 }}
                whileInView={{ width: "12.5%" }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-mono2 text-xs md:text-sm font-semibold text-[#0c0b0a] whitespace-nowrap">12.5% use AI</span>
              </motion.div>
              <div className="absolute inset-y-0 right-0 flex items-center justify-end px-4">
                <span className="font-mono2 text-xs md:text-sm text-[var(--nx-cream-dim)] whitespace-nowrap text-right">
                  87.5% still waiting for a practical way in
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm md:text-base text-[var(--nx-cream-dim)] max-w-[68ch] leading-relaxed">
              Small businesses already contribute <strong className="text-[var(--nx-cream)]">34.2% of Canada's GDP</strong> and
              employ <strong className="text-[var(--nx-cream)]">46.6% of the private workforce</strong> — yet lack the in-house
              teams to modernize. Serving them isn't a niche. It's the mainstream, underserved.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
