function PortfolioSection113({
  PixelIcon,
  T,
  beep,
  bodyFont,
  fontScale,
  letter,
  pixelFont,
  setOpenLetterId
}) {
  return <div onClick={() => { beep(220); setOpenLetterId(null); }} title="Close" style={{
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
      background: T.panel,
      border: `2px solid ${T.border}`,
      boxShadow: `4px 4px 0 ${T.bg}`,
      padding: "30px 26px",
      maxWidth: 440,
      width: "100%",
      position: "relative",
      margin: "10px"
    }}>
              {/* Theme-colored scroll rails keep the silhouette readable
                  without introducing a separate parchment palette. */}
              <div aria-hidden="true" style={{
        position: "absolute",
        left: -10,
        right: -10,
        top: -8,
        height: 12,
        background: T.panelAlt,
        border: `2px solid ${T.border}`,
        boxShadow: `2px 2px 0 ${T.bg}`
      }} />
              <div aria-hidden="true" style={{
        position: "absolute",
        left: -10,
        right: -10,
        bottom: -8,
        height: 12,
        background: T.panelAlt,
        border: `2px solid ${T.border}`,
        boxShadow: `2px 2px 0 ${T.bg}`
      }} />
              <div onClick={() => { beep(220); setOpenLetterId(null); }} title="Close" style={{
        position: "absolute",
        top: 16,
        right: 14,
        cursor: "pointer"
      }}>
                <PixelIcon name="close" size={12} color={T.textDim} />
              </div>
              <div style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: 10
      }}>
                <div style={{
          fontFamily: pixelFont,
          fontSize: `${9 * fontScale}px`,
                  color: T.textFaint,
          letterSpacing: "1px"
        }}>
                  Message
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
          fontSize: `${12 * fontScale}px`,
          lineHeight: 1.7,
          color: T.text
        }}>
                  {letter.subject}
                </div>
                <div style={{
          fontSize: `${10 * fontScale}px`,
          color: T.textDim,
          marginTop: 6
        }}>
                  {letter.from} &middot; {letter.date}
                </div>
              </div>
              <div style={{
        height: 2,
        background: T.border,
        marginBottom: 18
      }} />
              <div style={{
        fontSize: `${13 * fontScale}px`,
        color: T.text,
        lineHeight: 1.9,
        fontFamily: "var(--copy-font)"
      }}>
                {letter.body}
              </div>
            </div>
          </div>;
}
export default PortfolioSection113;
