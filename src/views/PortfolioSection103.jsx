function PortfolioSection103({
  PixelFrame,
  PixelIcon,
  T,
  fontScale,
  isMobile,
  pixelFont
}) {
  return <div style={{
    position: "relative"
  }}>
                {(() => {
      const TRAITS = [{
        label: "Fast Learner",
        icon: "star"
      }, {
        label: "Team Player",
        icon: "heart"
      }, {
        label: "Detail-Oriented",
        icon: "bolt"
      }, {
        label: "Self-Starter",
        icon: "gear"
      }];
      const EQUIPMENT = [{
        label: "WEAPON",
        sub: "Primary language",
        icon: "sword"
      }, {
        label: "ARMOR",
        sub: "Go-to framework",
        icon: "shield"
      }, {
        label: "TRINKET",
        sub: "Favorite tool",
        icon: "gear"
      }, {
        label: "RELIC",
        sub: "A past project",
        icon: "scroll"
      }];
      return <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 18
      }}>
                      <PixelFrame theme={T} style={{
          padding: 16
        }}>
                        <div style={{
            fontFamily: pixelFont,
            fontSize: `${9 * fontScale}px`,
            color: T.text,
            marginBottom: 10,
            letterSpacing: "0.5px"
          }}>
                          CLASS OVERVIEW
                        </div>
                        <div style={{
            fontSize: `${9 * fontScale}px`,
            color: T.textDim,
            lineHeight: 1.7
          }}>
                          Placeholder class blurb — a couple sentences on the "Builder" class, the kind of problems this character likes to take on, and the overall playstyle.
                        </div>
                      </PixelFrame>

                      <PixelFrame theme={T} style={{
          padding: 16
        }}>
                        <div style={{
            fontFamily: pixelFont,
            fontSize: `${9 * fontScale}px`,
            color: T.text,
            marginBottom: 12,
            letterSpacing: "0.5px"
          }}>
                          TRAITS
                        </div>
                        <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: 10
          }}>
                          {TRAITS.map(t => <PixelFrame key={t.label} theme={T} style={{
              padding: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              background: T.panel
            }}>
                              <PixelIcon name={t.icon} size={14} color={T.accent} />
                              <div style={{
                fontSize: `${8 * fontScale}px`,
                color: T.text,
                textAlign: "center",
                lineHeight: 1.4
              }}>
                                {t.label}
                              </div>
                            </PixelFrame>)}
                        </div>
                      </PixelFrame>

                      <PixelFrame theme={T} style={{
          padding: 16
        }}>
                        <div style={{
            fontFamily: pixelFont,
            fontSize: `${9 * fontScale}px`,
            color: T.text,
            marginBottom: 12,
            letterSpacing: "0.5px"
          }}>
                          EQUIPMENT
                        </div>
                        <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: 10
          }}>
                          {EQUIPMENT.map(eq => <PixelFrame key={eq.label} theme={T} style={{
              padding: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              background: T.panel
            }}>
                              <PixelIcon name={eq.icon} size={16} color={T.accent} />
                              <div style={{
                fontFamily: pixelFont,
                fontSize: `${7 * fontScale}px`,
                color: T.text
              }}>{eq.label}</div>
                              <div style={{
                fontSize: `${7 * fontScale}px`,
                color: T.textFaint,
                textAlign: "center",
                lineHeight: 1.4
              }}>
                                {eq.sub}
                              </div>
                            </PixelFrame>)}
                        </div>
                      </PixelFrame>

                      <PixelFrame theme={T} style={{
          padding: 16
        }}>
                        <div style={{
            fontFamily: pixelFont,
            fontSize: `${9 * fontScale}px`,
            color: T.text,
            marginBottom: 10,
            letterSpacing: "0.5px"
          }}>
                          CURRENT QUEST
                        </div>
                        <div style={{
            fontSize: `${9 * fontScale}px`,
            color: T.textDim,
            lineHeight: 1.7
          }}>
                          Placeholder text on what this character is working toward right now — the next milestone, skill, or goal in progress.
                        </div>
                      </PixelFrame>
                    </div>;
    })()}
              </div>;
}
export default PortfolioSection103;
