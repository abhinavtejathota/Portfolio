import PixelCharacter from "./PixelCharacter";

export default function GuideWalker({ accent = "#ffe600", label = "Click!", compact = false }) {
  const radius = compact ? 28 : 52;
  const ring = compact ? 56 : 100;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden="true">
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          animation: `orbit-hint-${compact ? "sm" : "lg"} 4s linear infinite`,
        }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <PixelCharacter type="guide" pose="idle" scale={compact ? 1.5 : 2} animate />
          {!compact && (
            <div
              className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 font-pixel text-[0.45rem]"
              style={{
                backgroundColor: accent,
                color: "#0d0d1a",
                boxShadow: "2px 2px 0 #000",
              }}
            >
              {label}
            </div>
          )}
        </div>
      </div>
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed opacity-20"
        style={{ width: ring, height: ring, borderColor: accent }}
      />
      <style>{`
        @keyframes orbit-hint-sm {
          0% { transform: translate(-50%, -50%) rotate(0deg) translateX(${radius}px) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateX(${radius}px) rotate(-360deg); }
        }
        @keyframes orbit-hint-lg {
          0% { transform: translate(-50%, -50%) rotate(0deg) translateX(${radius}px) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateX(${radius}px) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
