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
      const shade = ((r * 3 + c + 7) * 9301 + 49297) % 233280 / 233280;
      const fill = shade > 0.75 ? T.panelAlt : shade > 0.4 ? T.panel : T.bg;
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
      <rect width="100%" height="100%" fill={T.border} opacity={0.12} />
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
