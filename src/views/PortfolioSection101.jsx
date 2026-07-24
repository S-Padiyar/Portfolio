function PortfolioSection101({
  GithubLogo,
  LOGO_IMAGES,
  LinkedInLogo,
  PixelFrame,
  PixelIcon,
  T,
  aiOpen,
  beep,
  fontScale,
  handleLogoDoubleClick,
  isTablet,
  localTime,
  logoSparkle,
  logoSpin,
  pixelFont,
  setAiOpen,
  setSettingsOpen,
  settingsOpen,
  themeKey
}) {
  return <div style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 16px",
    background: T.panel,
    borderBottom: `3px solid ${T.border}`,
    flexWrap: "wrap",
    gap: 10,
    rowGap: 8
  }}>
        <div style={{
      display: "flex",
      alignItems: "center",
      gap: 12
    }}>
          <div style={{
        position: "relative",
        width: 34,
        height: 34,
        flexShrink: 0
      }}>
            <PixelFrame theme={T} onClick={handleLogoDoubleClick} style={{
          width: 34,
          height: 34,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          transition: "transform 700ms ease",
          transform: logoSpin ? "rotate(360deg) scale(1.5)" : "rotate(0deg) scale(1)"
        }}>
              <img src={LOGO_IMAGES[themeKey]} alt="SP logo" draggable={false} style={{
            width: 20,
            height: 20,
            imageRendering: "pixelated",
            pointerEvents: "none",
            display: "block"
          }} />
            </PixelFrame>
            {logoSparkle && [{
          x: -8,
          y: -8,
          delay: 0,
          size: 5
        }, {
          x: 38,
          y: -6,
          delay: 40,
          size: 4
        }, {
          x: 40,
          y: 22,
          delay: 90,
          size: 5
        }, {
          x: -10,
          y: 26,
          delay: 60,
          size: 4
        }, {
          x: 16,
          y: -14,
          delay: 120,
          size: 4
        }, {
          x: 28,
          y: 38,
          delay: 150,
          size: 3
        }].map((s, i) => <div key={i} style={{
          position: "absolute",
          left: s.x,
          top: s.y,
          width: s.size,
          height: s.size,
          background: T.accent,
          boxShadow: `0 0 4px ${T.accent}`,
          animation: `logo-sparkle 550ms ease-out ${s.delay}ms forwards`,
          pointerEvents: "none"
        }} />)}
          </div>
          <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 34,
        gap: 2
      }}>
            <div style={{
          fontFamily: pixelFont,
          fontSize: `${9 * fontScale}px`,
          letterSpacing: "1px",
          lineHeight: 1,
          margin: 0
        }} title="you found a tooltip. congrats, I guess.">SUNMAY PADIYAR</div>
            <div style={{
          fontSize: `${9 * fontScale}px`,
          color: T.textDim,
          letterSpacing: "1px",
          lineHeight: 1,
          margin: 0
        }}>PORTFOLIO</div>
          </div>
        </div>
        <div style={{
      display: "flex",
      gap: 8,
      alignItems: "center",
      flexWrap: "wrap"
    }}>
          <PixelFrame theme={T} onClick={() => beep(300)} style={{
        padding: "6px 10px",
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: `${10 * fontScale}px`
      }}>
            <PixelIcon name="briefcase" size={12} />
            {!isTablet && "RESUME"}
          </PixelFrame>
          <PixelFrame theme={T} onClick={() => beep(300)} style={{
        padding: "6px 10px",
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: `${10 * fontScale}px`
      }}>
            <PixelIcon name="mail" size={12} />
            {!isTablet && "EMAIL"}
          </PixelFrame>
          <PixelFrame theme={T} onClick={() => beep(300)} style={{
        padding: "6px 10px",
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: `${10 * fontScale}px`
      }}>
            <PixelIcon name="calendar" size={12} />
            {!isTablet && "CALENDAR"}
          </PixelFrame>
          <PixelFrame theme={T} onClick={() => beep(300)} style={{
        padding: "6px 10px",
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: `${10 * fontScale}px`
      }}>
            <LinkedInLogo size={13} color={T.text} />
            {!isTablet && "LINKEDIN"}
          </PixelFrame>
          <PixelFrame theme={T} onClick={() => beep(300)} style={{
        padding: "6px 10px",
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: `${10 * fontScale}px`
      }}>
            <GithubLogo size={13} color={T.text} />
            {!isTablet && "GITHUB"}
          </PixelFrame>
          <div style={{
        width: 2,
        height: 22,
        background: T.border,
        margin: "0 4px"
      }} />
          <PixelFrame theme={T} active={aiOpen} onClick={() => {
        setAiOpen(v => !v);
        beep(500);
      }} style={{
        width: 34,
        height: 34,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
            <PixelIcon name="robot" size={16} color={aiOpen ? T.bg : T.accent} />
          </PixelFrame>
          <PixelFrame theme={T} active={settingsOpen} onClick={() => {
        setSettingsOpen(v => !v);
        beep(260);
      }} style={{
        width: 34,
        height: 34,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
            <PixelIcon name="gear" size={16} color={settingsOpen ? T.bg : T.accent} />
          </PixelFrame>
          <div style={{
        width: 2,
        height: 22,
        background: T.border,
        margin: "0 4px"
      }} />
          <div style={{
        display: "flex",
        alignItems: "center",
        gap: 6
      }}>
            <PixelIcon name="clock" size={12} color={T.accent} />
            <span style={{
          fontFamily: pixelFont,
          fontSize: `${11 * fontScale}px`,
          color: T.text,
          lineHeight: 1
        }}>{localTime()}</span>
          </div>
        </div>
      </div>;
}
export default PortfolioSection101;
