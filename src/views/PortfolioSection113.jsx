function PortfolioSection113({
  PixelIcon,
  T,
  bodyFont,
  fontScale,
  letter,
  pixelFont,
  setOpenLetterId
}) {
  return <div onClick={() => setOpenLetterId(null)} style={{
    position: "fixed",
    inset: 0,
    background: `${T.bg}cc`,
    zIndex: 998,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  }}>
            <div onClick={e => e.stopPropagation()} style={{
      background: "linear-gradient(160deg, #d9c48e, #c7ab72)",
      border: `3px solid ${T.border}`,
      boxShadow: `4px 4px 0 ${T.bg}`,
      padding: "30px 26px 34px",
      maxWidth: 440,
      width: "100%",
      position: "relative",
      transform: "rotate(-0.5deg)",
      clipPath: "polygon(0% 0%, 100% 0%, 100% 96%, 96% 100%, 90% 96%, 84% 100%, 78% 96%, 72% 100%, 66% 96%, 60% 100%, 54% 96%, 48% 100%, 42% 96%, 36% 100%, 30% 96%, 24% 100%, 18% 96%, 12% 100%, 6% 96%, 0% 100%)"
    }}>
              <div onClick={() => setOpenLetterId(null)} style={{
        position: "absolute",
        top: 12,
        right: 14,
        cursor: "pointer"
      }}>
                <PixelIcon name="close" size={12} color="#3d2f1a" />
              </div>
              <div style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: 10
      }}>
                <div style={{
          fontFamily: pixelFont,
          fontSize: `${7 * fontScale}px`,
          color: "#3d5c26",
          letterSpacing: "1px"
        }}>
                  ★ LOOT ACQUIRED ★
                </div>
              </div>
              <div style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: 16
      }}>
                <div style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: T.accent,
          border: `2px solid ${T.accentDark}`,
          boxShadow: "2px 2px 0 rgba(0,0,0,0.2)"
        }} />
              </div>
              <div style={{
        textAlign: "center",
        marginBottom: 18
      }}>
                <div style={{
          fontFamily: pixelFont,
          fontSize: `${10 * fontScale}px`,
          lineHeight: 1.7,
          color: "#241a0d"
        }}>
                  {letter.subject.toUpperCase()}
                </div>
                <div style={{
          fontSize: `${9 * fontScale}px`,
          color: "#4a3a20",
          marginTop: 6
        }}>
                  {letter.from} &middot; {letter.date}
                </div>
              </div>
              <div style={{
        height: 2,
        background: "#a68d55",
        marginBottom: 18
      }} />
              <div style={{
        fontSize: `${11 * fontScale}px`,
        color: "#241a0d",
        lineHeight: 1.9,
        fontFamily: bodyFont
      }}>
                {letter.body}
              </div>
            </div>
          </div>;
}
export default PortfolioSection113;
