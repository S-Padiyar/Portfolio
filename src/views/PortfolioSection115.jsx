function PortfolioSection115({
  PixelHeart,
  T,
  fontScale,
  pixelFont
}) {
  return <div style={{
    position: "fixed",
    inset: 0,
    background: `${T.bg}ee`,
    zIndex: 999,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 14
  }}>
          <div style={{
      fontFamily: pixelFont,
      fontSize: `${18 * fontScale}px`,
      color: T.accent,
      textAlign: "center",
      lineHeight: 1.8
    }}>
            CHEAT CODE
            <br />
            ACCEPTED
          </div>
          <div style={{
      display: "flex",
      gap: 4
    }}>
            {[1, 2, 3, 4, 5].map(i => <PixelHeart key={i} size={16} filled color={T.accent} bg={T.border} />)}
          </div>
          <div style={{
      fontSize: `${10 * fontScale}px`,
      color: T.textDim
    }}>A companion has joined you. Use arrow keys to walk.</div>
        </div>;
}
export default PortfolioSection115;
