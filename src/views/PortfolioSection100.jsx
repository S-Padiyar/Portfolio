function PortfolioSection100({
  ACHIEVEMENTS,
  PixelFrame,
  PixelIcon,
  T,
  THEMES,
  beep,
  fontScale,
  isMobile,
  pixelFont,
  setFontScale,
  setSettingsOpen,
  setSoundOn,
  setThemeKey,
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
    background: T.panel,
    borderLeft: `3px solid ${T.border}`,
    zIndex: 20,
    padding: 20,
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
        color: T.accent,
        lineHeight: 1.6
      }}>SETTINGS</div>
              <div onClick={() => setSettingsOpen(false)} style={{
        cursor: "pointer"
      }}>
                <PixelIcon name="close" size={14} color={T.textDim} />
              </div>
            </div>

            <div style={{
      marginBottom: 22
    }}>
              <div style={{
        fontSize: `${10 * fontScale}px`,
        color: T.textDim,
        marginBottom: 10,
        letterSpacing: "1px"
      }}>THEME</div>
              <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 8
      }}>
                {Object.keys(THEMES).map(key => <PixelFrame key={key} theme={T} active={themeKey === key} onClick={() => {
          if (themeKey !== key) unlockAchievement("shape_shifter");
          setThemeKey(key);
          beep(380);
        }} style={{
          padding: "8px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: `${11 * fontScale}px`
        }}>
                    <span style={{
            color: themeKey === key ? T.bg : T.text
          }}>
                      {THEMES[key].name.toUpperCase()}
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
      marginBottom: 22
    }}>
              <div style={{
        fontSize: `${10 * fontScale}px`,
        color: T.textDim,
        marginBottom: 10,
        letterSpacing: "1px"
      }}>SOUND</div>
              <PixelFrame theme={T} active={soundOn} onClick={() => setSoundOn(v => !v)} style={{
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
          color: soundOn ? T.bg : T.text
        }}>
                  <PixelIcon name="speaker" size={12} color={soundOn ? T.bg : T.textDim} />
                  {soundOn ? "ON" : "OFF"}
                </span>
              </PixelFrame>
            </div>

            <div>
              <div style={{
        fontSize: `${10 * fontScale}px`,
        color: T.textDim,
        marginBottom: 10,
        letterSpacing: "1px"
      }}>
                FONT SIZE
              </div>
              <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8
      }}>
                <PixelFrame theme={T} onClick={() => setFontScale(v => Math.max(0.85, +(v - 0.1).toFixed(2)))} style={{
          width: 30,
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14
        }}>
                  -
                </PixelFrame>
                <div style={{
          flex: 1,
          textAlign: "center",
          fontSize: `${11 * fontScale}px`,
          border: `2px solid ${T.border}`,
          padding: "6px 0",
          background: T.panelAlt
        }}>
                  {Math.round(fontScale * 100)}%
                </div>
                <PixelFrame theme={T} onClick={() => setFontScale(v => Math.min(1.4, +(v + 0.1).toFixed(2)))} style={{
          width: 30,
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14
        }}>
                  +
                </PixelFrame>
              </div>
            </div>

            <div style={{
      marginTop: 24,
      paddingTop: 14,
      borderTop: `2px dashed ${T.border}`
    }}>
              <div style={{
        fontSize: `${10 * fontScale}px`,
        color: T.textDim,
        marginBottom: 10,
        letterSpacing: "1px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
                <span>ACHIEVEMENTS</span>
                <span style={{
          color: T.textFaint,
          fontSize: `${8 * fontScale}px`
        }}>
                  {Object.keys(unlockedAchievements).length}/{ACHIEVEMENTS.length}
                </span>
              </div>
              <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 6
      }}>
                {ACHIEVEMENTS.map(a => {
          const isUnlocked = !!unlockedAchievements[a.id];
          return <PixelFrame key={a.id} theme={T} style={{
            padding: "8px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            opacity: isUnlocked ? 1 : 0.35,
            transition: "opacity 300ms ease"
          }}>
                      <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 6
            }}>
                        <span style={{
                fontFamily: pixelFont,
                fontSize: `${8 * fontScale}px`,
                color: isUnlocked ? T.accent : T.textFaint,
                letterSpacing: "0.5px"
              }}>
                          {isUnlocked ? a.label : "???"}
                        </span>
                        <span style={{
                fontSize: `${7 * fontScale}px`,
                color: T.textFaint,
                flexShrink: 0
              }}>+{a.xp} XP</span>
                      </div>
                      <div style={{
              fontSize: `${7 * fontScale}px`,
              color: T.textDim,
              lineHeight: 1.5
            }}>
                        {isUnlocked ? a.desc : "Locked. Keep exploring to find it."}
                      </div>
                    </PixelFrame>;
        })}
              </div>
            </div>
          </div>;
}
export default PortfolioSection100;
