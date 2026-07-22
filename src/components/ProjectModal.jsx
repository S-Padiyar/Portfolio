import PixelFrame from "./PixelFrame";
import PixelIcon from "./PixelIcon";

function ProjectModal({
  T,
  beep,
  fontScale,
  p,
  pixelFont,
  setSelectedProjectId
}) {
  return <div role="presentation" onClick={() => { beep(220); setSelectedProjectId(null); }} style={{
    position: "fixed",
    inset: 0,
    background: `${T.bg}cc`,
    zIndex: 998,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  }}>
            <div role="dialog" aria-modal="true" aria-label={`${p.title} project details`} onClick={e => e.stopPropagation()} style={{
      background: T.panel,
      border: `2px solid ${T.border}`,
      boxShadow: `4px 4px 0 ${T.bg}`,
      padding: 24,
      maxWidth: 720,
      maxHeight: "90vh",
      overflowY: "auto",
      width: "100%",
      position: "relative"
    }}>
              <button type="button" onClick={() => { beep(220); setSelectedProjectId(null); }} title="Close" aria-label="Close project details" style={{
        appearance: "none",
        background: "none",
        border: 0,
        padding: 0,
        position: "absolute",
        top: 12,
        right: 12,
        cursor: "pointer"
      }}>
                <PixelIcon name="close" size={12} color={T.textDim} />
              </button>
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
                  <PixelIcon name={p.icon || "monitor"} size={16} color={T.bg} />
                </PixelFrame>
                <div>
                  <div style={{
            fontFamily: pixelFont,
            fontSize: `${12 * fontScale}px`,
            lineHeight: 1.6,
            color: T.text
          }}>
                    {p.title}
                  </div>
                  <div style={{
            fontSize: `${10 * fontScale}px`,
            color: T.accent
          }}>{p.role} &middot; {p.year}</div>
                </div>
              </div>
              <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        gap: 8,
        marginBottom: 16
      }}>
                {[1, 2, 3].map(number => <div key={number} style={{
          minHeight: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: T.textFaint,
          background: T.panelAlt,
          border: `1px solid ${T.border}`,
          fontFamily: "var(--copy-font)",
          fontSize: `${10 * fontScale}px`,
          textAlign: "center"
        }}>Project image {number}</div>)}
              </div>
              <div style={{
        fontFamily: "var(--copy-font)",
        fontSize: `${13 * fontScale}px`,
        color: T.text,
        lineHeight: 1.8,
        marginBottom: 16
      }}>
                {p.desc}
              </div>
              <div style={{
        fontFamily: pixelFont,
        fontSize: `${10 * fontScale}px`,
        color: T.textDim,
        marginBottom: 10
      }}>
                HIGHLIGHTS
              </div>
              <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginBottom: 16
      }}>
                {(p.highlights || []).map((h, i) => <div key={i} style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 8
        }}>
                    <PixelIcon name="star" size={11} color={T.accent} />
                    <div style={{
            fontFamily: "var(--copy-font)",
            fontSize: `${12 * fontScale}px`,
            color: T.textDim,
            lineHeight: 1.6
          }}>{h}</div>
                  </div>)}
              </div>
              <div style={{
        fontSize: `${10 * fontScale}px`,
        color: T.textFaint
      }}>{p.tags}</div>
            </div>
          </div>;
}
export default ProjectModal;
