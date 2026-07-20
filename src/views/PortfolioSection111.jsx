function PortfolioSection111({
  PixelFrame,
  PixelIcon,
  SKILL_NODES,
  T,
  beep,
  fontScale,
  node,
  pixelFont,
  setSelectedSkillId
}) {
  return <div onClick={() => { beep(220); setSelectedSkillId(null); }} title="Close" style={{
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
      padding: 24,
      maxWidth: 440,
      width: "100%",
      position: "relative"
    }}>
              <div onClick={() => { beep(220); setSelectedSkillId(null); }} title="Close" style={{
        position: "absolute",
        top: 12,
        right: 12,
        cursor: "pointer"
      }}>
                <PixelIcon name="close" size={12} color={T.textDim} />
              </div>
              <div style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 14
      }}>
                <PixelFrame theme={T} style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: T.accent
        }}>
                  <PixelIcon name={node.icon} size={16} color={T.bg} />
                </PixelFrame>
                <div>
                  <div style={{
            fontFamily: pixelFont,
            fontSize: `${12 * fontScale}px`,
            lineHeight: 1.6,
            color: T.text,
            whiteSpace: "pre-line"
          }}>
                    {node.label.replace("\n", " ")}
                  </div>
                  <div style={{
            fontSize: `${10 * fontScale}px`,
            color: T.accent
          }}>+{node.xp} XP SKILL</div>
                </div>
              </div>
      <div style={{
        fontFamily: "var(--copy-font)",
        fontSize: `${13 * fontScale}px`,
        color: T.text,
        lineHeight: 1.8,
        marginBottom: 16
      }}>
                {node.desc}
              </div>
              <div style={{
        fontFamily: pixelFont,
        fontSize: `${10 * fontScale}px`,
        color: T.textDim,
        marginBottom: 10
      }}>
                WHERE THIS WAS EARNED
              </div>
              <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 8
      }}>
                {node.experiences.map((exp, i) => <div key={i} style={{
          display: "grid",
          gridTemplateColumns: "16px minmax(0, 1fr)",
          alignItems: "start",
          gap: 8
        }}>
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", height: `${19.2 * fontScale}px` }}>
                      <PixelIcon name="briefcase" size={11} color={T.accent} />
                    </span>
                    <div style={{
            fontFamily: "var(--copy-font)",
            fontSize: `${12 * fontScale}px`,
            color: T.textDim,
            lineHeight: 1.6
          }}>{exp}</div>
                  </div>)}
              </div>
              {node.requires.length > 0 && <div style={{
        fontSize: `${10 * fontScale}px`,
        color: T.textFaint,
        marginTop: 16
      }}>
                  Requires: {node.requires.map(id => SKILL_NODES.find(n => n.id === id)?.label.replace("\n", " ")).join(", ")}
                </div>}
            </div>
          </div>;
}
export default PortfolioSection111;
