// Original seeded shade sequence used by the four-row brick background.
const BRICK_SHADES = [
  0.49041495, 0.56078961, 0.11547497, 0.24397719,
  0.44320988, 0.50638289, 0.07855796, 0.87887088,
  0.58942044, 0.41082390, 0.28443930, 0.78125429,
  0.65744170, 0.07658179, 0.49855110, 0.23507802
];

export function BrickBackground({ theme }) {
  const T = theme;
  const bw = 40;
  const bh = 20;
  // Build one 4-row tile block (repeats seamlessly) with per-brick shading
  const tileRows = 4;
  const bricks = [];
  for (let r = 0; r < tileRows; r++) {
    const offset = r % 2 === 0 ? 0 : -bw / 2;
    for (let c = -1; c < 3; c++) {
      const shade = BRICK_SHADES[r * 4 + c + 1];
      const fill = shade > 0.75 ? theme.panelAlt : shade > 0.4 ? theme.panel : theme.bg;
      bricks.push(<rect key={`${r}-${c}`} x={c * bw + offset} y={r * bh} width={bw - 2} height={bh - 2} fill={fill} opacity={0.6} />);
    }
  }
  return (
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <defs>
        <pattern id="brick-tile" width={bw * 2} height={bh * tileRows} patternUnits="userSpaceOnUse">
          {bricks}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={theme.border} opacity={0.12} />
      <rect width="100%" height="100%" fill="url(#brick-tile)" />
    </svg>
  );
}

export function ScanlineOverlay() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 1px, transparent 3px)",
        mixBlendMode: "multiply",
        opacity: 0.12,
      }}
    />
  );
}

export function PixelHeart({ size = 10, filled = true, color = "#c94545", bg = "#3a1e1e" }) {
  const grid = [".XX.XX.", "XXXXXXX", "XXXXXXX", ".XXXXX.", "..XXX..", "...X..."];
  return (
    <svg width={size} height={(size * 6) / 7} viewBox="0 0 7 6">
      {grid.map((row, y) =>
        row.split("").map((c, x) => (c === "X" ? <rect key={`${x}-${y}`} x={x} y={y} width={1.05} height={1.05} fill={filled ? color : bg} /> : null))
      )}
    </svg>
  );
}
