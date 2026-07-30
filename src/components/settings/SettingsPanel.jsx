import AchievementsPanel from "@/components/settings/AchievementsPanel";
import PixelFrame from "@/components/ui/PixelFrame";
import PixelIcon from "@/components/ui/PixelIcon";
import { THEMES } from "@/data/themes";

function SettingsPanel({
  theme,
  beep,
  fontScale,
  isMobile,
  pixelFont,
  readableFont,
  setFontScale,
  setReadableFont,
  setSettingsOpen,
  setSoundOn,
  setThemeKey,
  settingsView,
  soundOn,
  themeKey,
  unlockAchievement,
  unlockedAchievements
}) {
  return <div style={{
    position: "absolute",
    top: 0,
    right: 0,
    width: isMobile ? "100%" : 300,
    height: "100%",
    background: theme.panel,
    borderLeft: `2px solid ${theme.border}`,
    zIndex: 20,
    padding: "clamp(16px, 3vw, 20px)",
    overflowY: "auto"
  }}>
            <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20
    }}>
              <div style={{
        fontFamily: pixelFont,
        fontSize: `${11 * fontScale}px`,
        color: theme.accent,
        lineHeight: 1.6
      }}>{settingsView === "achievements" ? "Achievements" : "Settings"}</div>
              <button type="button" onClick={() => { beep(220); setSettingsOpen(false); }} title="Close" aria-label="Close settings" style={{
        appearance: "none",
        background: "none",
        border: 0,
        padding: 0,
        cursor: "pointer"
      }}>
                <PixelIcon name="close" size={14} color={theme.textDim} />
              </button>
            </div>

            <div style={{
      display: settingsView === "settings" ? "block" : "none",
      marginBottom: 22
    }}>
              <div style={{
        fontSize: `${10 * fontScale}px`,
        color: theme.textDim,
        marginBottom: 10,
        letterSpacing: "1px"
      }}>
                Font style
              </div>
              {/* One switch changes both heading and body fonts across every view. */}
      <PixelFrame theme={theme} active={readableFont} onClick={() => { beep(320); setReadableFont(v => !v); }} title="Font" style={{
        width: "100%",
        boxSizing: "border-box",
        padding: "8px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: `${11 * fontScale}px`
      }}>
                <span style={{
          color: readableFont ? theme.bg : theme.text
        }}>
                  {readableFont ? "Readable" : "Pixel"}
                </span>
              </PixelFrame>
            </div>

            <div style={{
      display: settingsView === "settings" ? "block" : "none",
      marginBottom: 22
    }}>
              <div style={{
        fontSize: `${10 * fontScale}px`,
        color: theme.textDim,
        marginBottom: 10,
        letterSpacing: "1px"
      }}>Theme</div>
              <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 8
      }}>
                {Object.keys(THEMES).map(key => <PixelFrame key={key} theme={theme} active={themeKey === key} onClick={() => {
          if (themeKey !== key) unlockAchievement("shape_shifter");
          setThemeKey(key);
          beep(380);
        }} title="Theme" style={{
          padding: "8px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: `${11 * fontScale}px`
        }}>
                    <span style={{
            color: themeKey === key ? theme.bg : theme.text
          }}>
                      {THEMES[key].name}
                    </span>
                    <span style={{
            width: 14,
            height: 14,
            background: THEMES[key].accent,
            border: `2px solid ${THEMES[key].accentDark}`
          }} />
                  </PixelFrame>)}
              </div>
            </div>

            <div style={{
      display: settingsView === "settings" ? "block" : "none",
      marginBottom: 22
    }}>
              <div style={{
        fontSize: `${10 * fontScale}px`,
        color: theme.textDim,
        marginBottom: 10,
        letterSpacing: "1px"
      }}>Sound</div>
      <PixelFrame theme={theme} active={soundOn} onClick={() => { if (soundOn) beep(280); setSoundOn(v => !v); }} title="Sound" style={{
        width: "100%",
        boxSizing: "border-box",
        padding: "8px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: `${11 * fontScale}px`
      }}>
                <span style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: soundOn ? theme.bg : theme.text
        }}>
                  <PixelIcon name="speaker" size={12} color={soundOn ? theme.bg : theme.textDim} />
                  {soundOn ? "On" : "Off"}
                </span>
              </PixelFrame>
            </div>

            <div style={{
      display: settingsView === "settings" ? "block" : "none"
    }}>
              <div style={{
        fontSize: `${10 * fontScale}px`,
        color: theme.textDim,
        marginBottom: 10,
        letterSpacing: "1px"
      }}>
                Font size
              </div>
              <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8
      }}>
                <PixelFrame theme={theme} onClick={() => { beep(240); setFontScale(v => Math.max(1, +(v - 0.05).toFixed(2))); }} title="Smaller" style={{
          width: 30,
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: `${14 * fontScale}px`
        }}>
                  -
                </PixelFrame>
                <div style={{
          flex: 1,
          textAlign: "center",
          fontSize: `${11 * fontScale}px`,
          border: `2px solid ${theme.border}`,
          padding: "6px 0",
          background: theme.panelAlt
        }}>
                  {Math.round(fontScale * 100)}%
                </div>
                <PixelFrame theme={theme} onClick={() => { beep(360); setFontScale(v => Math.min(1.4, +(v + 0.05).toFixed(2))); }} title="Larger" style={{
          width: 30,
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: `${14 * fontScale}px`
        }}>
                  +
                </PixelFrame>
              </div>
            </div>

            {settingsView === "achievements" && <AchievementsPanel
              theme={theme}
              fontScale={fontScale}
              pixelFont={pixelFont}
              unlockedAchievements={unlockedAchievements}
            />}
          </div>;
}
export default SettingsPanel;
