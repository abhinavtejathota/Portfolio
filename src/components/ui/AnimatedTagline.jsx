import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

function parseTagline(tagline) {
  const parts = tagline.split(" · ");
  if (parts.length < 2) {
    return { prefix: tagline, words: [] };
  }
  const prefix = parts[0].trim();
  const words = parts
    .slice(1)
    .join(" · ")
    .split(/,\s*/)
    .map((w) => w.trim())
    .filter(Boolean);
  return { prefix, words };
}

export default function AnimatedTagline({ tagline }) {
  const { prefix, words } = parseTagline(tagline);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length === 0) return undefined;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 1600);
    return () => clearInterval(id);
  }, [words.length]);

  if (words.length === 0) {
    return (
      <p className="mt-3 text-lg text-white/80 sm:text-xl md:text-2xl">{tagline}</p>
    );
  }

  return (
    <p className="mt-2 flex flex-wrap items-baseline justify-center gap-x-2 text-lg text-white/80 sm:mt-3 sm:text-xl md:text-2xl">
      <span>{prefix}</span>
      <span className="text-white/40" aria-hidden="true">
        ·
      </span>
      <span className="relative inline-flex min-w-[5.5ch] justify-start text-left">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[index]}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 whitespace-nowrap text-pixel-cyan"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
        <span className="invisible whitespace-nowrap" aria-hidden="true">
          {words.reduce((a, b) => (a.length >= b.length ? a : b))}
        </span>
      </span>
    </p>
  );
}
