import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ---------- scroll reveal wrapper ---------- */
export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- animated counter ---------- */
export function Counter({
  to,
  format = (v: number) => Math.round(v).toLocaleString("en-CA"),
  duration = 1.6,
  className = "",
}: {
  to: number;
  format?: (v: number) => string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const text = useTransform(spring, (v) => format(v));
  const [out, setOut] = useState(format(0));

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(() => {
    const unsub = text.on("change", (v) => setOut(v));
    return unsub;
  }, [text]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {out}
    </span>
  );
}

/* ---------- section header: kicker + oversized headline ---------- */
export function SectionHead({
  index,
  kicker,
  title,
  accent,
  sub,
}: {
  index: string;
  kicker: string;
  title: string;
  accent?: string;
  sub?: string;
}) {
  return (
    <div className="mb-10 md:mb-16">
      <Reveal>
        <div className="flex items-center gap-3 mb-5">
          <span className="font-mono2 text-[11px] tracking-[0.25em] text-[var(--nx-red)]">{index}</span>
          <span className="h-px w-10 bg-[var(--nx-red)]" aria-hidden />
          <span className="kicker">{kicker}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display text-[clamp(2.6rem,7.5vw,6.5rem)] max-w-[16ch]">
          {title} {accent && <span className="text-[var(--nx-red)]">{accent}</span>}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-[62ch] text-base md:text-lg leading-relaxed text-[var(--nx-cream-dim)]">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- marquee ticker ---------- */
export function Ticker({ items, className = "" }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden border-y border-[var(--nx-line)] py-3 select-none ${className}`} aria-hidden>
      <div className="nx-marquee flex w-max whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="font-mono2 text-xs md:text-sm tracking-[0.18em] uppercase text-[var(--nx-muted)] flex items-center">
            <span className="px-6">{t}</span>
            <span className="text-[var(--nx-red)]">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- red asterisk mark ---------- */
export function Asterisk({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="square"
      />
    </svg>
  );
}
