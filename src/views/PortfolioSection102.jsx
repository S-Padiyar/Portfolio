function PortfolioSection102({
  PixelFrame,
  PixelIcon,
  SKILL_NODES,
  T,
  beep,
  fontScale,
  isMobile,
  isTablet,
  pixelFont,
  setSelectedSkillId
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
                    SKILL TREE
                  </div>
                  <div style={{
        fontSize: `${9 * fontScale}px`,
        color: T.textDim,
        lineHeight: 1.6
      }}>
                    {isMobile ? "Tap a node to see where each skill was earned." : "Click a node to see where each skill was earned."}
                  </div>
                </div>

                {(() => {
      const containerH = isMobile ? 320 : isTablet ? 400 : 470;
      const branchLabels = {
        code: "CODE",
        design: "DESIGN",
        robotics: "ROBOTICS",
        experience: "EXPERIENCE"
      };
      const edges = SKILL_NODES.filter(n => n.requires.length).map(n => ({
        from: SKILL_NODES.find(p => p.id === n.requires[0]),
        to: n
      }));
      const nodeW = isMobile ? 52 : 66;
      return <div style={{
        position: "relative",
        width: "100%",
        height: containerH
      }}>
                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none"
        }}>
                        {edges.map((e, i) => <line key={i} x1={e.from.x} y1={e.from.y} x2={e.to.x} y2={e.to.y} stroke={T.border} strokeWidth={2} vectorEffect="non-scaling-stroke" />)}
                      </svg>

                      <div style={{
          position: "absolute",
          left: "1%",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: pixelFont,
          fontSize: `${7 * fontScale}px`,
          color: T.textFaint,
          letterSpacing: "1px"
        }}>
                        {branchLabels.code}
                      </div>
                      <div style={{
          position: "absolute",
          right: "1%",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: pixelFont,
          fontSize: `${7 * fontScale}px`,
          color: T.textFaint,
          letterSpacing: "1px"
        }}>
                        {branchLabels.robotics}
                      </div>
                      <div style={{
          position: "absolute",
          top: "0%",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: pixelFont,
          fontSize: `${7 * fontScale}px`,
          color: T.textFaint,
          letterSpacing: "1px"
        }}>
                        {branchLabels.design}
                      </div>
                      <div style={{
          position: "absolute",
          bottom: "0%",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: pixelFont,
          fontSize: `${7 * fontScale}px`,
          color: T.textFaint,
          letterSpacing: "1px"
        }}>
                        {branchLabels.experience}
                      </div>

                      {SKILL_NODES.map(node => {
          const isCore = node.branch === "core";
          return <PixelFrame key={node.id} theme={T} onClick={() => {
            setSelectedSkillId(node.id);
            beep(isCore ? 360 : 340, 0.04);
          }} style={{
            position: "absolute",
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            padding: isCore ? "10px 10px" : "7px 6px",
            background: isCore ? T.accent : T.panel,
            width: isCore ? nodeW + 18 : nodeW,
            zIndex: isCore ? 2 : 1
          }}>
                            <PixelIcon name={node.icon} size={isCore ? 18 : 13} color={isCore ? T.bg : T.accent} />
                            <span style={{
              fontSize: `${(isMobile ? 6 : 7) * fontScale}px`,
              color: isCore ? T.bg : T.text,
              whiteSpace: "pre-line",
              lineHeight: 1.25,
              textAlign: "center"
            }}>
                              {node.label}
                            </span>
                          </PixelFrame>;
        })}
                    </div>;
    })()}

                <div style={{
      display: "flex",
      gap: 14,
      flexWrap: "wrap",
      fontSize: `${8 * fontScale}px`,
      color: T.textDim,
      marginTop: 18
    }}>
                  <div style={{
        display: "flex",
        alignItems: "center",
        gap: 6
      }}>
                    <div style={{
          width: 8,
          height: 8,
          background: T.accent
        }} />
                    CORE (ROOT)
                  </div>
                  <div style={{
        display: "flex",
        alignItems: "center",
        gap: 6
      }}>
                    <div style={{
          width: 8,
          height: 8,
          background: T.panel,
          border: `1px solid ${T.border}`
        }} />
                    BRANCHES RADIATE OUTWARD BY DISCIPLINE
                  </div>
                </div>
              </div>;
}
export default PortfolioSection102;
