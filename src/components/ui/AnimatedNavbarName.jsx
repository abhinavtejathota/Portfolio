import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "../../data/portfolio";

const FULL = profile.name.split(" ")[0] ?? "Dev";

function buildSequence(name) {
  const forward = Array.from({ length: name.length }, (_, i) => `${name.slice(0, i + 1)}.`);
  const backward = Array.from({ length: name.length - 1 }, (_, i) =>
    `${name.slice(0, name.length - 1 - i)}.`,
  );
  return [...forward, ...backward];
}

const NAME_SEQUENCE = buildSequence(FULL);
const PEAK = `${FULL}.`;

export default function AnimatedNavbarName() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let timer;

    const step = (current) => {
      if (cancelled) return;
      const next = (current + 1) % NAME_SEQUENCE.length;
      setIndex(next);
      const delay = NAME_SEQUENCE[next] === PEAK ? 850 : 340;
      timer = setTimeout(() => step(next), delay);
    };

    timer = setTimeout(() => step(0), 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  const text = NAME_SEQUENCE[index];

  return (
    <a
      href="#top"
      className="group relative inline-flex min-w-[96px] items-center sm:min-w-[128px] md:min-w-[148px]"
      aria-label={FULL}
    >
      <span
        className="pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-sm bg-pixel-cyan/5 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      <span className="relative inline-block min-w-[7.5ch] text-left font-pixel text-[0.58rem] leading-none sm:text-[0.68rem] md:text-[0.78rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={text}
            initial={{ opacity: 0, y: 6, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -5, filter: "blur(2px)" }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 whitespace-nowrap text-pixel-cyan drop-shadow-[0_0_8px_rgba(0,245,255,0.35)] group-hover:text-pixel-yellow"
          >
            {text}
          </motion.span>
        </AnimatePresence>
        <span className="invisible whitespace-nowrap" aria-hidden="true">
          {PEAK}
        </span>
      </span>
    </a>
  );
}
