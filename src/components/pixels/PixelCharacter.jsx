import { motion } from "framer-motion";
import PixelSprite from "./PixelSprite";
import { SPRITES } from "./sprites";

export default function PixelCharacter({
  type = "dev",
  pose = "idle",
  scale = 3,
  className = "",
  animate = false,
}) {
  const spriteSet = SPRITES[type] ?? SPRITES.dev;
  const grid = spriteSet[pose] ?? spriteSet.idle;

  const Wrapper = animate ? motion.div : "div";
  const motionProps = animate
    ? {
        animate: { y: [0, -4, 0] },
        transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
      }
    : {};

  return (
    <Wrapper className={className} {...motionProps}>
      <PixelSprite grid={grid} scale={scale} />
    </Wrapper>
  );
}
