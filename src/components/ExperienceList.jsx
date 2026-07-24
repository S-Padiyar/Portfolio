import PixelFrame from "./PixelFrame";
import GalleryImage from "./GalleryImage";
import { GUILD_QUESTS } from "../data/quests";

function GuildLogo({ logo, theme }) {
  if (!logo) return null;

  return <a href={logo.href} target="_blank" rel="noopener noreferrer" title={logo.href} onClick={event => event.stopPropagation()} style={{
    width: 32,
    height: 32,
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    background: logo.background || theme.panelAlt,
    border: `1px solid ${theme.border}`,
    overflow: "hidden",
    padding: 0
  }}>
    <img src={logo.src} alt={logo.alt} style={{ width: "100%", height: "100%", objectFit: logo.objectFit || "contain", objectPosition: logo.objectPosition || "center", display: "block" }} />
  </a>;
}

function ExperienceList({
  theme,
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
  const renderImage = quest => {
    const image = quest.media?.find(item => item.type !== "video");
    if (image) return <GalleryImage image={image} theme={theme} />;

    return <div style={{
      height: 140,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.textFaint,
      background: theme.panelAlt,
      border: `1px solid ${theme.border}`,
      fontFamily: uiFont,
      fontSize: `${10 * fontScale}px`
    }}>Experience image</div>;
  };

  return <div style={{ position: "relative" }}>
    <div style={{
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))",
      gap: 16
    }}>
      {GUILD_QUESTS.map(quest => <PixelFrame
        key={quest.id}
        theme={theme}
        onClick={() => {
          setSelectedQuestId(quest.id);
          claimQuestXp(quest);
          beep(340);
        }}
        title="Experience"
        style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10, height: "100%" }}
      >
        {renderImage(quest)}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <GuildLogo logo={quest.logo} theme={theme} />
          <div style={{ fontFamily: pixelFont, color: theme.text, fontSize: `${11 * fontScale}px`, lineHeight: 1.45 }}>{quest.title}</div>
        </div>
        <div style={{ fontFamily: uiFont, color: theme.textFaint, fontSize: `${10 * fontScale}px` }}>{quest.org} - {quest.duration}</div>
        <div style={{ fontFamily: copyFont, color: theme.textDim, fontSize: `${13 * fontScale}px`, lineHeight: 1.55 }}>{quest.summary}</div>
        <div style={{ fontFamily: uiFont, color: theme.accent, fontSize: `${10 * fontScale}px`, marginTop: "auto" }}>View experience</div>
      </PixelFrame>)}
    </div>
  </div>;
}

export default ExperienceList;
