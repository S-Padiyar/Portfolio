import React from "react";
import { SPRITE_FRAMES } from "../data/spriteFrames";

// A small 2D character sprite — head, arms, torso, and animated legs —
// with idle, two walk frames, and a jump pose.
export default function PixelSprite({ frame = "idle", size = 40, color = "#e8a54b", outline = "#00000000", facing = 1 }) {
  const grid = SPRITE_FRAMES[frame] || SPRITE_FRAMES.idle;
  const cols = grid[0].length;
  const rows = grid.length;
  const cell = size / rows;
  const w = cell * cols;
  return (
    <svg
      width={w}
      height={size}
      viewBox={`0 0 ${cols} ${rows}`}
      style={{ imageRendering: "pixelated", display: "block", transform: facing < 0 ? "scaleX(-1)" : "none" }}
    >
      {grid.map((row, y) =>
        row.split("").map((c, x) =>
          c === "X" ? <rect key={`${x}-${y}`} x={x} y={y} width={1.05} height={1.05} fill={color} /> : null
        )
      )}
    </svg>
  );
}
