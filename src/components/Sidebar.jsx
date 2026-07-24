import PlayerStatus from "./PlayerStatus";
import PixelFrame from "./PixelFrame";
import PixelIcon from "./PixelIcon";
import { NAV_ITEMS } from "../data/nav";

function Sidebar({
  theme,
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
    borderRight: isMobile ? "none" : `3px solid ${theme.border}`,
    borderBottom: isMobile ? `3px solid ${theme.border}` : "none",
    background: theme.panel,
    flexShrink: 0
  }}>
          <PlayerStatus theme={theme} avatarRef={avatarRef} companion={companion} fontScale={fontScale} handleAvatarClick={handleAvatarClick} level={level} pixelFont={pixelFont} themeKey={themeKey} xp={xp} xpGain={xpGain} />

          <div style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      flexGrow: 1
    }}>
            {NAV_ITEMS.map(item => <PixelFrame key={item.id} theme={theme} active={active === item.id} onClick={() => handleNavClick(item.id)} title={item.label} data-platform={companion ? "true" : undefined} style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 10px",
        fontSize: `${11 * fontScale}px`
      }}>
                <PixelIcon name={item.icon} size={14} color={active === item.id ? theme.bg : theme.accent} />
                <span style={{
          color: active === item.id ? theme.bg : theme.text
        }}>
                  {item.label}
                </span>
              </PixelFrame>)}
            {hiddenRoomUnlocked && <PixelFrame theme={theme} onClick={() => {
        setHiddenRoomOpen(true);
        beep(600, 0.06);
      }} title="Dungeon" style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 10px",
        fontSize: `${11 * fontScale}px`,
        border: `2px dashed ${theme.border}`
      }}>
                <PixelIcon name="book" size={14} color={theme.accent} />
                <span style={{
          color: theme.text
        }}>Hidden Dungeon</span>
              </PixelFrame>}
          </div>

          {/* Live GitHub commit feed */}
          <PixelFrame theme={theme} style={{
      width: "100%",
      marginTop: 16,
      padding: "10px 10px",
      display: "flex",
      flexDirection: "column",
      gap: 4
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
          color: theme.accent,
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
              {commits?.length ? commits.map((commit, index) => <a key={commit.url} href={commit.url} target="_blank" rel="noopener noreferrer" title={commit.url} onClick={() => beep(360)} style={{
          fontFamily: "var(--copy-font)",
          fontSize: `${9 * fontScale}px`,
          color: theme.text,
          lineHeight: 1.5,
          padding: "4px 0 6px",
          borderBottom: index < commits.length - 1 ? `1px solid ${theme.border}` : "none",
          cursor: "pointer",
          textDecoration: "none"
        }}>
          <span style={{
            color: theme.accent,
            fontWeight: 700,
            fontSize: `${11 * fontScale}px`
          }}>▸ {commit.repository}</span>
                      <br />
          <span style={{
            color: theme.textDim,
            fontSize: `${9 * fontScale}px`,
            overflowWrap: "anywhere"
          }}>Pushed: &quot;{commit.message}&quot;</span>
                    </a>) : <div style={{
          fontSize: `${9 * fontScale}px`,
          color: theme.textFaint,
          lineHeight: 1.4
        }}>
                      {commitsError || commits?.length === 0 ? "No public commits found." : "Loading GitHub commits..."}
                    </div>}
            </div>
          </PixelFrame>
        </div>;
}
export default Sidebar;
