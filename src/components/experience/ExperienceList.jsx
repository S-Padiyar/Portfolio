import PixelFrame from "@/components/ui/PixelFrame";
import GalleryImage from "@/components/ui/media/GalleryImage";
import { GUILD_QUESTS } from "@/data/quests";

function GuildLogo({ logo, theme }) {
  if (!logo) return null;

  return <a href={logo.href} target="_blank" rel="noopener noreferrer" title={logo.href} onClick={event => event.stopPropagation()} style={{
    width: 42,
    height: 42,
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    background: theme.panelAlt,
    border: `1px solid ${theme.border}`,
    overflow: "hidden",
    padding: 0
  }}>
    <img src={logo.src} alt={logo.alt} style={{ width: "100%", height: "100%", objectFit: logo.objectFit || "contain", objectPosition: logo.objectPosition || "center", display: "block", background: logo.background || "transparent" }} />
  </a>;
}

function ExperienceList({
  theme,
  beep,
  claimQuestXp,
  fontScale,
  isMobile,
  pixelFont,
  setSelectedQuestId
}) {
  const copyFont = "var(--copy-font)";
  const uiFont = "var(--ui-font)";

  const renderImage = (quest, aspectRatio) => {
    const image = quest.media?.find(item => item.type !== "video");
    if (!image) return <div style={{
      height: 150,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.textFaint,
      background: theme.panelAlt,
      border: `1px solid ${theme.border}`,
      fontFamily: uiFont,
      fontSize: `${10 * fontScale}px`
    }}>Experience image</div>;

    return <GalleryImage image={{ ...image, aspectRatio }} theme={theme} />;
  };
  return <div style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>
    <div style={{ display: "grid", gap: 16 }}>
      {GUILD_QUESTS.map(quest => <PixelFrame
        key={quest.id}
        theme={theme}
        onClick={() => {
          setSelectedQuestId(quest.id);
          claimQuestXp(quest);
          beep(340);
        }}
        title="Experience"
        style={{
          padding: 12,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "190px minmax(0, 1fr)",
          gap: 12,
          alignItems: "center",
          minHeight: isMobile ? undefined : 150,
          position: "relative",
          background: theme.panel
        }}
      >
        <div style={{
          padding: 5,
          background: theme.panelAlt,
          border: `1px solid ${theme.border}`
        }}>
          {renderImage(quest, "16 / 9")}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) 50px",
          gap: 10,
          alignItems: "center",
          minWidth: 0
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 9, minWidth: 0 }}>
          <div style={{
            display: "grid",
            gap: 4
          }}>
            <div style={{ fontFamily: pixelFont, color: theme.text, fontSize: `${12 * fontScale}px`, lineHeight: 1.35 }}>{quest.title}</div>
            <div style={{ fontFamily: uiFont, color: theme.textFaint, fontSize: `${10 * fontScale}px`, lineHeight: 1.3 }}>{quest.org} &middot; {quest.duration}</div>
          </div>
          <div style={{ fontFamily: copyFont, color: theme.textDim, fontSize: `${13 * fontScale}px`, lineHeight: 1.55 }}>{quest.summary}</div>
          <div style={{
            marginTop: "auto",
            alignSelf: "center",
            color: theme.accent,
            fontFamily: uiFont,
            fontSize: `${10 * fontScale}px`,
            textAlign: "center"
          }}>View experience</div>
          </div>
          <div style={{
            justifySelf: isMobile ? "start" : "end",
            alignSelf: isMobile ? "start" : "center"
          }}>
            <GuildLogo logo={quest.logo} theme={theme} />
          </div>
        </div>
      </PixelFrame>)}
    </div>
  </div>;
}

export default ExperienceList;
