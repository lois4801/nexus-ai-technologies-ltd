import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { SECTIONS } from "../data";
import { Asterisk } from "./bits";

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Nav() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (menuOpen) {
        if (e.key === "Escape") setMenuOpen(false);
        return;
      }
      const idx = SECTIONS.findIndex((s) => s.id === active);
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToSection(SECTIONS[Math.min(idx + 1, SECTIONS.length - 1)].id);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToSection(SECTIONS[Math.max(idx - 1, 0)].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, menuOpen]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 border-b border-[var(--nx-line)] bg-[rgba(12,11,10,0.82)] backdrop-blur-md">
        <div className="flex items-center justify-between h-14 md:h-16 px-4 md:px-8">
          <button
            type="button"
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 cursor-pointer group"
            aria-label="Nexus AI Technologies Ltd — back to top"
          >
            <Asterisk className="w-4 h-4 shrink-0 text-[var(--nx-red)] transition-transform duration-300 group-hover:rotate-90" />
            <span className="display text-xs md:text-sm tracking-[0.08em] whitespace-nowrap">Nexus AI Technologies Ltd</span>
          </button>

          <nav className="hidden lg:flex items-center gap-6" aria-label="Deck sections">
            {SECTIONS.slice(1, 8).map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToSection(s.id)}
                className={`font-mono2 text-[11px] tracking-[0.18em] uppercase cursor-pointer transition-colors duration-150 py-2 ${
                  active === s.id ? "text-[var(--nx-red)]" : "text-[var(--nx-muted)] hover:text-[var(--nx-cream)]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="hidden md:inline-flex items-center gap-2 bg-[var(--nx-red)] text-[#0c0b0a] font-mono2 text-[11px] font-semibold tracking-[0.15em] uppercase px-4 py-2.5 cursor-pointer transition-colors duration-150 hover:bg-[var(--nx-cream)]"
            >
              Get the deck
            </button>
            {/* mobile menu button */}
            <button
              type="button"
              className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-11 h-11 cursor-pointer"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className={`block w-6 h-[2px] bg-[var(--nx-cream)] transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
              <span className={`block w-6 h-[2px] bg-[var(--nx-cream)] transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
            </button>
          </div>
        </div>
        {/* scroll progress */}
        <motion.div className="h-[2px] bg-[var(--nx-red)] origin-left" style={{ scaleX: progress }} />
      </header>

      {/* mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-[rgba(12,11,10,0.97)] pt-20 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col" aria-label="Deck sections mobile">
              {SECTIONS.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    scrollToSection(s.id);
                  }}
                  className={`flex items-baseline gap-4 py-4 border-b border-[var(--nx-line)] text-left cursor-pointer ${
                    active === s.id ? "text-[var(--nx-red)]" : "text-[var(--nx-cream)]"
                  }`}
                >
                  <span className="font-mono2 text-[11px] text-[var(--nx-muted)]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-2xl">{s.label}</span>
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* right-edge deck dots (desktop) */}
      <nav className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-3" aria-label="Slide position">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollToSection(s.id)}
            aria-label={`Go to ${s.label}`}
            className="group flex items-center justify-end gap-2 cursor-pointer py-1"
          >
            <span
              className={`font-mono2 text-[10px] tracking-[0.15em] uppercase transition-opacity duration-150 ${
                active === s.id ? "opacity-100 text-[var(--nx-red)]" : "opacity-0 group-hover:opacity-100 text-[var(--nx-muted)]"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block transition-all duration-200 ${
                active === s.id ? "w-6 h-[3px] bg-[var(--nx-red)]" : "w-3 h-[3px] bg-[var(--nx-muted)] group-hover:bg-[var(--nx-cream)]"
              }`}
            />
          </button>
        ))}
      </nav>
    </>
  );
}
