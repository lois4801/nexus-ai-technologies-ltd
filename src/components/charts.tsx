import { useMemo, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FINANCIALS, USE_OF_PROCEEDS, fmtCAD } from "../data";

/* ============ Grouped bar chart: Sales / Gross / Net per year ============ */
const SERIES = [
  { key: "sales", label: "Sales", color: "#ff3b2f" },
  { key: "gross", label: "Gross profit", color: "#c9b8a3" },
  { key: "net", label: "Net profit", color: "#847e70" },
] as const;

export function FinancialBars() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [hover, setHover] = useState<{ year: string; key: string } | null>(null);
  const max = 130000;

  return (
    <div ref={ref} className="w-full">
      {/* legend */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
        {SERIES.map((s) => (
          <div key={s.key} className="flex items-center gap-2">
            <span className="inline-block w-3 h-3" style={{ background: s.color }} aria-hidden />
            <span className="font-mono2 text-[11px] tracking-[0.15em] uppercase text-[var(--nx-cream-dim)]">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 md:gap-10 items-end">
        {FINANCIALS.map((y, yi) => (
          <div key={y.year}>
            <div className="flex items-end gap-1.5 md:gap-3 h-[180px] md:h-[280px]">
              {SERIES.map((s, si) => {
                const v = y[s.key as keyof typeof y] as number;
                const h = Math.max((v / max) * 100, 2);
                const active = hover?.year === y.year && hover?.key === s.key;
                return (
                  <button
                    key={s.key}
                    type="button"
                    aria-label={`${y.year} ${s.label}: ${fmtCAD(v)}`}
                    className="relative flex-1 h-full flex items-end cursor-pointer group"
                    onMouseEnter={() => setHover({ year: y.year, key: s.key })}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover({ year: y.year, key: s.key })}
                    onBlur={() => setHover(null)}
                  >
                    <motion.div
                      className="w-full origin-bottom transition-[filter] duration-150"
                      style={{
                        background: s.color,
                        height: `${h}%`,
                        filter: active ? "brightness(1.35)" : hover && !active ? "brightness(0.55)" : "none",
                      }}
                      initial={{ scaleY: 0 }}
                      animate={inView ? { scaleY: 1 } : {}}
                      transition={{ duration: 0.7, delay: yi * 0.15 + si * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    />
                    {/* tooltip */}
                    <span
                      className={`pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap bg-[var(--nx-cream)] text-[#0c0b0a] font-mono2 text-[10px] md:text-[11px] px-2 py-1 transition-opacity duration-150 ${active ? "opacity-100" : "opacity-0"}`}
                    >
                      {fmtCAD(v)}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-[var(--nx-line)] font-mono2 text-[11px] md:text-xs tracking-[0.2em] uppercase text-[var(--nx-cream)]">
              {y.year}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ Cash projection line ============ */
export function CashLine() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [active, setActive] = useState<number | null>(null);

  const W = 640;
  const H = 240;
  const PAD = 52;
  const max = 160000;

  const pts = FINANCIALS.map((d, i) => ({
    x: PAD + (i * (W - PAD * 2)) / (FINANCIALS.length - 1),
    y: H - PAD - (d.cash / max) * (H - PAD * 2),
    ...d,
  }));

  const path = useMemo(() => {
    return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  }, [pts]);

  const areaPath = `${path} L${pts[pts.length - 1].x},${H - PAD} L${pts[0].x},${H - PAD} Z`;

  return (
    <div ref={ref} className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Projected ending cash: Year 1 $54,310, Year 2 $118,510, Year 3 $153,540">
        {/* gridlines */}
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1={PAD}
            x2={W - PAD}
            y1={H - PAD - g * (H - PAD * 2)}
            y2={H - PAD - g * (H - PAD * 2)}
            stroke="rgba(241,237,227,0.08)"
            strokeDasharray="3 5"
          />
        ))}
        <motion.path
          d={areaPath}
          fill="url(#cashFill)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
        />
        <motion.path
          d={path}
          fill="none"
          stroke="#ff3b2f"
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="cashFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff3b2f" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ff3b2f" stopOpacity="0" />
          </linearGradient>
        </defs>
        {pts.map((p, i) => (
          <g
            key={p.year}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            style={{ cursor: "pointer" }}
          >
            <circle cx={p.x} cy={p.y} r="22" fill="transparent" />
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={active === i ? 8 : 5.5}
              fill={active === i ? "#ff3b2f" : "#0c0b0a"}
              stroke="#ff3b2f"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.9 + i * 0.15 }}
            />
            <text
              x={p.x}
              y={p.y - (active === i ? 20 : 16)}
              textAnchor="middle"
              fill="#f1ede3"
              fontSize="15"
              fontFamily="IBM Plex Mono, monospace"
              fontWeight="600"
            >
              {fmtCAD(p.cash)}
            </text>
            <text
              x={p.x}
              y={H - PAD + 20}
              textAnchor="middle"
              fill="#847e70"
              fontSize="11"
              fontFamily="IBM Plex Mono, monospace"
              style={{ letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              {p.year}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ============ Use of proceeds donut ============ */
export function ProceedsDonut() {
  const total = USE_OF_PROCEEDS.reduce((a, b) => a + b.amount, 0);
  const [active, setActive] = useState(0);

  const R = 120;
  const C = 2 * Math.PI * R;
  let acc = 0;
  const segs = USE_OF_PROCEEDS.map((s) => {
    const frac = s.amount / total;
    const seg = { ...s, frac, offset: acc };
    acc += frac;
    return seg;
  });

  const cur = USE_OF_PROCEEDS[active];

  return (
    <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-center">
      {/* donut */}
      <div className="relative mx-auto w-[260px] h-[260px] md:w-[340px] md:h-[340px]">
        <svg viewBox="0 0 300 300" className="w-full h-full -rotate-90" role="img" aria-label={`Use of proceeds donut, total ${fmtCAD(total)}`}>
          {segs.map((s, i) => (
            <motion.circle
              key={s.name}
              cx="150"
              cy="150"
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth={active === i ? 44 : 30}
              strokeDasharray={`${s.frac * C - 4} ${C - s.frac * C + 4}`}
              strokeDashoffset={-s.offset * C}
              className="cursor-pointer transition-[stroke-width] duration-200"
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-8">
          <div className="display text-3xl md:text-4xl text-[var(--nx-cream)]">{fmtCAD(cur.amount)}</div>
          <div className="font-mono2 text-[10px] md:text-[11px] tracking-[0.15em] uppercase text-[var(--nx-red)] mt-1">
            {Math.round((cur.amount / total) * 100)}% of ask
          </div>
        </div>
      </div>

      {/* legend list */}
      <ul className="divide-y divide-[var(--nx-line)] border-y border-[var(--nx-line)]">
        {USE_OF_PROCEEDS.map((s, i) => (
          <li key={s.name}>
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`w-full flex items-center gap-3 md:gap-4 py-3 md:py-3.5 text-left cursor-pointer transition-colors duration-150 ${
                active === i ? "text-[var(--nx-cream)]" : "text-[var(--nx-muted)]"
              }`}
              aria-pressed={active === i}
            >
              <span className="w-3 h-3 shrink-0" style={{ background: s.color }} aria-hidden />
              <span className="flex-1 text-sm md:text-base font-medium leading-snug">{s.name}</span>
              <span className="font-mono2 text-xs md:text-sm tabular">{fmtCAD(s.amount)}</span>
            </button>
          </li>
        ))}
        <li className="flex items-center gap-4 py-3.5 font-mono2 text-xs md:text-sm tracking-[0.15em] uppercase">
          <span className="flex-1 text-[var(--nx-cream)]">Total Phase 1</span>
          <span className="text-[var(--nx-red)] tabular">{fmtCAD(total)}</span>
        </li>
      </ul>
    </div>
  );
}

/* ============ Pricing range bars ============ */
export function RangeBar({ min, max, scaleMax, unit }: { min: number; max: number; scaleMax: number; unit: string }) {
  const left = (min / scaleMax) * 100;
  const width = ((max - min) / scaleMax) * 100;
  return (
    <div className="relative h-5 flex-1 min-w-[120px]" aria-hidden>
      <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--nx-line-strong)]" />
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 h-[9px] bg-[var(--nx-red)]"
        style={{ left: `${left}%` }}
        initial={{ width: 0 }}
        whileInView={{ width: `${Math.max(width, 2)}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
      <span
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[3px] h-[15px] bg-[var(--nx-cream)]"
        style={{ left: `${left}%` }}
      />
      <span
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[3px] h-[15px] bg-[var(--nx-cream)]"
        style={{ left: `${(max / scaleMax) * 100}%` }}
      />
      <span className="sr-only">{`${fmtCAD(min)} to ${fmtCAD(max)} ${unit}`}</span>
    </div>
  );
}
