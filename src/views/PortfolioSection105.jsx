function PortfolioSection105({
  GUILD_QUESTS,
  PixelFrame,
  T,
  beep,
  claimQuestXp,
  fontScale,
  isMobile,
  isTablet,
  pixelFont,
  setSelectedQuestId
}) {
  return <div style={{
    position: "relative"
  }}>
                <div style={{
      marginBottom: 16
    }}>
                  <div style={{
        fontFamily: pixelFont,
        fontSize: `${11 * fontScale}px`,
        color: T.text,
        marginBottom: 6
      }}>
                    GUILD HALL
                  </div>
                  <div style={{
        fontSize: `${9 * fontScale}px`,
        color: T.textDim,
        lineHeight: 1.6
      }}>
                    Quest flyers pinned to the guild wall — click one for the full quest log entry.
                  </div>
                </div>

                <div style={{
      position: "relative"
    }}>
                  <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
        gap: isMobile ? 34 : 40,
        padding: isMobile ? "10px 6px" : "18px 10px"
      }}>
                    {GUILD_QUESTS.map((q, i) => {
          const rotations = [-3, 2.5, -2, 3, -2.5, 1.5];
          const rot = rotations[i % rotations.length];
          return <div key={q.id} style={{
            position: "relative",
            transform: `rotate(${rot}deg)`
          }}>
                          <div style={{
              position: "absolute",
              top: -9,
              left: "50%",
              transform: `translateX(-50%) rotate(${-rot}deg)`,
              zIndex: 3,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: T.accent,
              border: `2px solid ${T.accentDark}`,
              boxShadow: "1px 2px 3px rgba(0,0,0,0.45)"
            }} />
                          <PixelFrame theme={T} onClick={() => {
              setSelectedQuestId(q.id);
              claimQuestXp(q);
              beep(340);
            }} style={{
              padding: isMobile ? "18px 14px 14px" : "20px 16px 16px",
              background: T.panelAlt,
              boxShadow: "5px 6px 0 rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              gap: 6
            }}>
                            <div style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 4
              }}>
                              <PixelFrame theme={T} style={{
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: T.accent
                }}>
                                <span style={{
                    fontFamily: pixelFont,
                    fontSize: `${10 * fontScale}px`,
                    color: T.bg
                  }}>{q.rank}</span>
                              </PixelFrame>
                            </div>
                            <div style={{
                fontFamily: pixelFont,
                fontSize: `${9 * fontScale}px`,
                color: T.text,
                textAlign: "center",
                lineHeight: 1.6
              }}>
                              {q.title.toUpperCase()}
                            </div>
                            <div style={{
                fontSize: `${9 * fontScale}px`,
                color: T.accent,
                textAlign: "center"
              }}>{q.org}</div>
                            <div style={{
                fontSize: `${8 * fontScale}px`,
                color: T.textFaint,
                textAlign: "center"
              }}>{q.duration}</div>
                            <div style={{
                fontSize: `${9 * fontScale}px`,
                color: T.textDim,
                textAlign: "center",
                lineHeight: 1.6,
                marginTop: 2
              }}>
                              {q.summary}
                            </div>
                            <div style={{
                fontSize: `${8 * fontScale}px`,
                color: T.textFaint,
                textAlign: "center",
                marginTop: 4
              }}>
                              +{q.reward} XP &middot; VIEW &rarr;
                            </div>
                          </PixelFrame>
                        </div>;
        })}
                  </div>
                </div>
              </div>;
}
export default PortfolioSection105;
