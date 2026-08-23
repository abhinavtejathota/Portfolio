import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PixelCharacter from "../pixels/PixelCharacter";

export default function SectionBlock({ section, children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px", amount: 0.35 });

  return (
    <section
      id={section.id}
      ref={ref}
      className="scroll-mt-[7.5rem] py-8 sm:scroll-mt-[8rem] md:scroll-mt-24 sm:py-12 md:py-16"
      aria-labelledby={`heading-${section.id}`}
    >
      <div className="mb-4 flex items-end gap-2 sm:mb-6 sm:gap-3 md:mb-8 md:gap-4">
        <motion.div
          animate={isInView ? { y: -8 } : { y: 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="shrink-0 scale-75 sm:scale-90 md:scale-100"
        >
          <PixelCharacter
            type={section.character}
            pose={isInView ? "jump" : "idle"}
            scale={4}
          />
        </motion.div>
        <h2
          id={`heading-${section.id}`}
          className="font-pixel text-[0.55rem] leading-relaxed sm:text-xs md:text-sm"
          style={{ color: section.accent }}
        >
          {section.heading ?? section.label}
        </h2>
      </div>

      <div className="pixel-border bg-pixel-panel/80 p-4 sm:p-5 md:p-7">{children}</div>
    </section>
  );
}
