function PortfolioSection104({
  AVATAR_IMAGES,
  PixelFrame,
  PixelHeart,
  T,
  avatarRef,
  companion,
  fontScale,
  handleAvatarClick,
  level,
  pixelFont,
  themeKey,
  xp,
  xpGain
}) {
  return <PixelFrame theme={T} style={{
    width: "100%",
    padding: "14px 12px",
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8
  }}>
            <div ref={avatarRef} style={{
      position: "relative"
    }}>
              <PixelFrame theme={T} onClick={handleAvatarClick} title="Avatar" data-platform={companion ? "true" : undefined} style={{
        width: 96,
        height: 97,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: T.panelAlt,
        border: `2px solid ${T.border}`,
        overflow: "hidden"
      }}>
                <img src={AVATAR_IMAGES[themeKey]} alt="Pixel avatar of Sunmay" draggable={false} style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          imageRendering: "pixelated",
          display: "block"
        }} />
              </PixelFrame>
            </div>
            <div style={{
      fontFamily: pixelFont,
      fontSize: `${10 * fontScale}px`,
      lineHeight: 1.6,
      textAlign: "center",
      marginTop: -4
    }}>SUNMAY</div>
            <div style={{
      position: "relative",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
              <div style={{
        fontSize: `${9 * fontScale}px`,
        color: T.textDim,
        letterSpacing: "1px",
        paddingLeft: "1px",
        textAlign: "center",
        marginBottom: 4
      }}>
                LV. {level} &middot; BUILDER
              </div>
              {xpGain && <div key={xpGain.id} style={{
        position: "absolute",
        top: -4,
        fontFamily: pixelFont,
        fontSize: `${10 * fontScale}px`,
        color: T.accent,
        letterSpacing: "0.5px",
        animation: "xp-float 900ms ease-out forwards",
        pointerEvents: "none",
        textShadow: `0 0 4px ${T.accent}88`
      }}>
                  +{xpGain.amount} XP
                </div>}
              {/* The track must leave real content height after its border and padding. */}
              <div title="XP" aria-label={`${xp} of 100 experience points`} style={{
        position: "relative",
        width: "100%",
        maxWidth: 140,
        alignSelf: "center",
        height: 5,
        border: `1px solid ${T.border}`,
        background: T.panelAlt,
        padding: 0,
        boxSizing: "border-box",
        overflow: "hidden"
      }}>
                <div style={{
          height: "100%",
          minHeight: 1,
          // XP is stored as progress within the current 100-point level.
          width: `${Math.max(0, Math.min(xp, 100))}%`,
          background: T.accent,
          transition: "width 300ms ease"
        }} />
              </div>
            </div>
            <a
              href="https://www.gatech.edu/"
              target="_blank"
              rel="noopener noreferrer"
              title="https://www.gatech.edu/"
              aria-label="GT '30 — https://www.gatech.edu/"
              style={{
      color: T.accent,
      fontSize: `${11 * fontScale}px`,
      letterSpacing: "0.5px",
      paddingLeft: "0.5px",
      textAlign: "center",
      marginTop: -2,
      textDecoration: "none"
    }}>
              RANK: GT &apos;30
            </a>

            <div style={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 3,
      justifyContent: "center"
    }}>
              {[1, 2, 3, 4, 5].map(i => <PixelHeart key={i} size={11} filled={i <= 4} color={T.accent} bg={T.border} />)}
            </div>

            <div style={{
      width: "100%",
      marginTop: 4,
      display: "flex",
      flexDirection: "column",
      gap: 6
    }}>
              {[{
        label: "CODE",
        val: 90
      }, {
        label: "DESIGN",
        val: 65
      }, {
        label: "ROBOTICS",
        val: 80
      }].map(s => <div key={s.label}>
                  <div style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: `${9 * fontScale}px`,
          color: T.textDim,
          marginBottom: 2
        }}>
                    <span>{s.label}</span>
                    <span style={{
            color: T.accent
          }}>{s.val}%</span>
                  </div>
                  <div style={{
          height: 8,
          background: T.panelAlt,
          border: `1px solid ${T.border}`,
          position: "relative"
        }}>
                    <div style={{
            width: `${s.val}%`,
            height: "100%",
            background: T.accent
          }} />
                  </div>
                </div>)}
            </div>
          </PixelFrame>;
}
export default PortfolioSection104;
