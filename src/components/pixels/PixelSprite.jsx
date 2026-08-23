import { PIXEL_SIZE } from "./sprites";

export default function PixelSprite({ grid, scale = PIXEL_SIZE, className = "" }) {
  if (!grid?.length) return null;

  const height = grid.length;
  const width = grid[0].length;

  return (
    <div
      className={`inline-block ${className}`}
      style={{
        width: width * scale,
        height: height * scale,
        imageRendering: "pixelated",
      }}
      aria-hidden="true"
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${width}, ${scale}px)`,
          gridTemplateRows: `repeat(${height}, ${scale}px)`,
          width: width * scale,
          height: height * scale,
        }}
      >
        {grid.flatMap((row, y) =>
          row.map((color, x) => (
            <div
              key={`${x}-${y}`}
              style={{
                width: scale,
                height: scale,
                backgroundColor: color ?? "transparent",
              }}
            />
          )),
        )}
      </div>
    </div>
  );
}
