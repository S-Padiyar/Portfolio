import PortfolioSection104 from "./PortfolioSection104";
function PortfolioSection109({
  AVATAR_IMAGES,
  NAV_ITEMS,
  PixelFrame,
  PixelHeart,
  PixelIcon,
  T,
  active,
  avatarRef,
  beep,
  commits,
  commitsError,
  companion,
  fontScale,
  handleAvatarClick,
  handleNavClick,
  hiddenRoomUnlocked,
  isMobile,
  isTablet,
  level,
  pixelFont,
  setHiddenRoomOpen,
  themeKey,
  xp,
  xpGain
}) {
  return <div style={{
    width: isMobile ? "100%" : isTablet ? 180 : 220,
    padding: isMobile ? "16px" : "22px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRight: isMobile ? "none" : `3px solid ${T.border}`,
    borderBottom: isMobile ? `3px solid ${T.border}` : "none",
    background: T.panel,
    flexShrink: 0
  }}>
          <PortfolioSection104 AVATAR_IMAGES={AVATAR_IMAGES} PixelFrame={PixelFrame} PixelHeart={PixelHeart} T={T} avatarRef={avatarRef} companion={companion} fontScale={fontScale} handleAvatarClick={handleAvatarClick} level={level} pixelFont={pixelFont} themeKey={themeKey} xp={xp} xpGain={xpGain} />

          <div style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      flexGrow: 1
    }}>
            {NAV_ITEMS.map(item => <PixelFrame key={item.id} theme={T} active={active === item.id} onClick={() => handleNavClick(item.id)} title={item.label} data-platform={companion ? "true" : undefined} style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 10px",
        fontSize: `${11 * fontScale}px`
      }}>
                <PixelIcon name={item.icon} size={14} color={active === item.id ? T.bg : T.accent} />
                <span style={{
          color: active === item.id ? T.bg : T.text
        }}>
                  {item.label}
                </span>
              </PixelFrame>)}
            {hiddenRoomUnlocked && <PixelFrame theme={T} onClick={() => {
        setHiddenRoomOpen(true);
        beep(600, 0.06);
      }} title="Dungeon" style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 10px",
        fontSize: `${11 * fontScale}px`,
        border: `2px dashed ${T.border}`
      }}>
                <PixelIcon name="gear" size={14} color={T.accent} />
                <span style={{
          color: T.text
        }}>Hidden Dungeon</span>
              </PixelFrame>}
          </div>

          {/* Live GitHub commit feed */}
          <PixelFrame theme={T} style={{
      width: "100%",
      marginTop: 16,
      padding: "10px 10px",
      display: "flex",
      flexDirection: "column",
      gap: 8
    }}>
            <div style={{
        display: "flex",
        alignItems: "center",
        gap: 6
      }}>
              <span style={{
          width: 12,
          height: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }}>
                <span style={{
            width: 6,
            height: 6,
            display: "block",
            background: "#5ec95e",
            boxShadow: "0 0 0 2px rgba(0,0,0,0.15)"
          }} />
              </span>
              <span style={{
          fontFamily: pixelFont,
          fontSize: `${12 * fontScale}px`,
          color: T.accent,
          lineHeight: 1.6
        }}>Quest Log</span>
            </div>
            <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        maxHeight: 210,
        overflowY: "auto"
      }}>
              {commits?.length ? commits.map((c, i) => <div key={i} title={c.url} onClick={() => { beep(360); window.open(c.url, "_blank", "noopener,noreferrer"); }} style={{
          fontFamily: "var(--copy-font)",
          fontSize: `${9 * fontScale}px`,
          color: T.text,
          lineHeight: 1.5,
          padding: "6px 0",
          borderBottom: i < commits.length - 1 ? `1px solid ${T.border}` : "none",
          cursor: "pointer"
        }}>
          <span style={{
            color: T.accent,
            fontWeight: 700,
            fontSize: `${11 * fontScale}px`
          }}>▸ {c.repo}</span>
                      <br />
          <span style={{
            color: T.textDim,
            fontSize: `${9 * fontScale}px`
          }}>Pushed: &quot;{c.msg.slice(0, 30)}&quot;</span>
                    </div>) : <div style={{
          fontSize: `${9 * fontScale}px`,
          color: T.textFaint,
          lineHeight: 1.4
        }}>
                      {commitsError || commits?.length === 0 ? "No public commits found." : "Loading GitHub commits..."}
                    </div>}
            </div>
          </PixelFrame>
        </div>;
}
export default PortfolioSection109;
