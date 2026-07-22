import PixelFrame from "./PixelFrame";
import PixelIcon from "./PixelIcon";

function ExperienceModal({
  T,
  beep,
  fontScale,
  pixelFont,
  q,
  setSelectedQuestId
}) {
  return <div role="presentation" onClick={() => { beep(220); setSelectedQuestId(null); }} style={{
    position: "fixed",
    inset: 0,
    background: `${T.bg}cc`,
    zIndex: 998,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  }}>
            <div role="dialog" aria-modal="true" aria-label={`${q.title} experience details`} onClick={e => e.stopPropagation()} style={{
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
              <button type="button" onClick={() => { beep(220); setSelectedQuestId(null); }} title="Close" aria-label="Close experience details" style={{
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
                  <span style={{
            fontFamily: pixelFont,
            fontSize: `${12 * fontScale}px`,
            color: T.bg
          }}>{q.rank}</span>
                </PixelFrame>
                <div>
                  <div style={{
            fontFamily: pixelFont,
            fontSize: `${11 * fontScale}px`,
            lineHeight: 1.6,
            color: T.text
          }}>
                    {q.title}
                  </div>
                  <div style={{
            fontSize: `${10 * fontScale}px`,
            color: T.accent
          }}>{q.org} &middot; {q.duration}</div>
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
        }}>Experience image {number}</div>)}
              </div>
              <div style={{
        fontFamily: "var(--copy-font)",
        fontSize: `${13 * fontScale}px`,
        color: T.text,
        lineHeight: 1.8,
        marginBottom: 16
      }}>
                {q.summary}
              </div>
              <div style={{
        fontFamily: pixelFont,
        fontSize: `${10 * fontScale}px`,
        color: T.textDim,
        marginBottom: 10
      }}>
                QUEST LOG
              </div>
              <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginBottom: 16
      }}>
                {q.bullets.map((b, i) => <div key={i} style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 8
        }}>
                    <PixelIcon name="briefcase" size={11} color={T.accent} />
                    <div style={{
            fontFamily: "var(--copy-font)",
            fontSize: `${12 * fontScale}px`,
            color: T.textDim,
            lineHeight: 1.6
          }}>{b}</div>
                  </div>)}
              </div>
              <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
                <div style={{
          fontSize: `${10 * fontScale}px`,
          color: T.textFaint
        }}>{q.tags}</div>
                <div style={{
          fontSize: `${10 * fontScale}px`,
          color: T.accent
        }}>+{q.reward} XP</div>
              </div>
            </div>
          </div>;
}
export default ExperienceModal;
