import { motion } from "framer-motion";
import PixelCharacter from "../pixels/PixelCharacter";
import GuideWalker from "../pixels/GuideWalker";

export default function SectionButton({
  label,
  accent,
  character,
  highlight = false,
  isActive,
  onClick,
  compact = false,
}) {
  const scale = compact ? 2 : 3;

  return (
    <div className="relative inline-flex flex-col items-center">
      <div className="relative">
        {highlight && !isActive && (
          <div className="hidden md:block">
            <GuideWalker accent={accent} label="Try me!" compact={compact} />
          </div>
        )}

        <button
          type="button"
          onClick={onClick}
          className={`pixel-btn pixel-border relative z-10 shrink-0 text-center leading-relaxed ${
            compact
              ? "min-w-[64px] px-2 py-2 text-[0.38rem] sm:min-w-[72px] sm:text-[0.4rem] md:min-w-[72px]"
              : "min-w-[108px] px-3 py-3 text-[0.55rem]"
          } ${isActive ? "text-pixel-bg" : "text-white"}`}
          style={{
            backgroundColor: isActive ? accent : "#16162a",
            boxShadow: isActive
              ? `inset 0 0 0 2px ${accent}, 0 0 0 2px #000, 4px 4px 0 0 #000, 0 0 12px ${accent}55`
              : undefined,
          }}
        >
          {label}
        </button>

        <motion.div
          className="pointer-events-none absolute left-1/2 z-0 hidden -translate-x-1/2 md:block"
          style={{ top: "calc(100% - 6px)" }}
          animate={isActive ? { y: -14, opacity: 1 } : { y: 4, opacity: 0.9 }}
          transition={{ type: "spring", stiffness: 500, damping: 22 }}
        >
          <PixelCharacter
            type={character}
            pose={isActive ? "jump" : "idle"}
            scale={scale}
          />
        </motion.div>
      </div>
    </div>
  );
}
