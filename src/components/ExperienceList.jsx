import PixelFrame from "./PixelFrame";
import { GUILD_QUESTS } from "../data/quests";

function ExperienceList({
  T,
  beep,
  claimQuestXp,
  fontScale,
  isMobile,
  isTablet,
  pixelFont,
  setSelectedQuestId
}) {
  const copyFont = "var(--copy-font)";
  const uiFont = "var(--ui-font)";

  return <div style={{ position: "relative" }}>
    <div style={{
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))",
      gap: 16
    }}>
      {GUILD_QUESTS.map(quest => <PixelFrame
        key={quest.id}
        theme={T}
        onClick={() => {
          setSelectedQuestId(quest.id);
          claimQuestXp(quest);
          beep(340);
        }}
        title="Experience"
        style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10, height: "100%" }}
      >
        <div style={{
          height: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: T.textFaint,
          background: T.panelAlt,
          border: `1px solid ${T.border}`,
          fontFamily: uiFont,
          fontSize: `${10 * fontScale}px`
        }}>Add experience image</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            width: 26,
            height: 26,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: T.accent,
            border: `1px solid ${T.border}`,
            fontFamily: pixelFont,
            fontSize: `${10 * fontScale}px`
          }}>{quest.rank}</span>
          <div style={{ fontFamily: pixelFont, color: T.text, fontSize: `${11 * fontScale}px`, lineHeight: 1.45 }}>{quest.title}</div>
        </div>
        <div style={{ fontFamily: uiFont, color: T.textFaint, fontSize: `${10 * fontScale}px` }}>{quest.org} · {quest.duration}</div>
        <div style={{ fontFamily: copyFont, color: T.textDim, fontSize: `${13 * fontScale}px`, lineHeight: 1.55 }}>{quest.summary}</div>
        <div style={{ fontFamily: uiFont, color: T.accent, fontSize: `${10 * fontScale}px`, marginTop: "auto" }}>View experience →</div>
      </PixelFrame>)}
    </div>
  </div>;
}

export default ExperienceList;
