import MediaGallery from "./MediaGallery";
import PixelFrame from "./PixelFrame";
import ModalShell from "./ui/ModalShell";
import AccentList from "./ui/AccentList";

/** Displays experience evidence while sharing the same modal and gallery behavior as projects. */
function ExperienceModal({ theme, beep, fontScale, experience, pixelFont, setSelectedQuestId }) {
  const closeModal = () => {
    beep(220);
    setSelectedQuestId(null);
  };

  return <ModalShell ariaLabel={`${experience.title} experience details`} closeLabel="Close experience details" onClose={closeModal} panelStyle={{ maxWidth: 780 }} theme={theme}>
    <div className="modal-heading">
      {experience.logo ? <a href={experience.logo.href} target="_blank" rel="noopener noreferrer" title={experience.logo.href} style={{
        width: 46, height: 46, flexShrink: 0, display: "grid", placeItems: "center", background: experience.logo.background || theme.panelAlt,
        border: `1px solid ${theme.border}`, overflow: "hidden", padding: 0
      }}>
        <img src={experience.logo.src} alt={experience.logo.alt} style={{ width: "100%", height: "100%", objectFit: experience.logo.objectFit || "contain", objectPosition: experience.logo.objectPosition || "center", display: "block" }} />
      </a> : <PixelFrame theme={theme} style={{ width: 32, height: 32, display: "grid", placeItems: "center", background: theme.accent }}>
        <span style={{ fontFamily: pixelFont, fontSize: `${12 * fontScale}px`, color: theme.bg }}>{experience.rank}</span>
      </PixelFrame>}
      <div>
        <div style={{ fontFamily: pixelFont, fontSize: `${11 * fontScale}px`, lineHeight: 1.6, color: theme.text }}>{experience.title}</div>
        <div style={{ fontSize: `${10 * fontScale}px`, color: theme.accent }}>{experience.org} - {experience.duration}</div>
      </div>
    </div>

    <MediaGallery items={experience.media} label="Experience images" beep={beep} theme={theme} fontScale={fontScale} pixelFont={pixelFont} />
    <p className="modal-description" style={{ color: theme.text, fontSize: `${13 * fontScale}px` }}>{experience.summary}</p>
    <div className="modal-section-label" style={{ color: theme.textDim, fontFamily: pixelFont, fontSize: `${10 * fontScale}px` }}>Quest log</div>
    <AccentList items={experience.bullets || []} theme={theme} fontScale={fontScale} />
    <div className="modal-meta" style={{ color: theme.textFaint, fontSize: `${10 * fontScale}px` }}>{experience.tags}</div>
  </ModalShell>;
}

export default ExperienceModal;
