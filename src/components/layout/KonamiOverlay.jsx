import { PixelHeart } from "@/components/layout/DecorativeUI";

function KonamiOverlay({
  theme,
  fontScale,
  pixelFont
}) {
  return <div style={{
    position: "fixed",
    inset: 0,
    background: `${theme.bg}ee`,
    zIndex: 999,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 14
  }}>
          <div style={{
      fontFamily: pixelFont,
      fontSize: `${16 * fontScale}px`,
      color: theme.accent,
      textAlign: "center",
      lineHeight: 1.3,
      whiteSpace: "nowrap"
    }}>
            CHEAT CODE ACCEPTED
          </div>
          <div style={{
      display: "flex",
      gap: 4
    }}>
            {[1, 2, 3, 4, 5].map(i => <PixelHeart key={i} size={16} filled color={theme.accent} bg={theme.border} />)}
          </div>
          <div style={{
      fontSize: `${10 * fontScale}px`,
      color: theme.textDim
    }}>Botmay has joined you. Use arrow keys to walk.</div>
        </div>;
}
export default KonamiOverlay;
