import ModalShell from "./ui/ModalShell";

/** Enlarged, on-demand image viewer with its contextual description. */
export default function MediaInfoModal({ fontScale, media, onClose, pixelFont, theme }) {
  return <ModalShell ariaLabel="Image information" closeLabel="Close image information"
    onClose={onClose} panelStyle={{ maxWidth: 900 }} theme={theme} zIndex={1100}>
    <div style={{ paddingRight: 38, marginBottom: 12, fontFamily: pixelFont, color: theme.accent, fontSize: `${10 * fontScale}px`, lineHeight: 1.5 }}>
      Image information
    </div>
    <div className="media-viewer" style={{ background: theme.panelAlt, borderColor: theme.border }}>
      <img src={media.src} alt={media.alt} style={{ objectFit: media.objectFit || "contain", objectPosition: media.objectPosition || "center" }} />
    </div>
    <div className="media-caption" style={{ background: theme.panelAlt, borderColor: theme.accent, color: theme.text, fontSize: `${13 * fontScale}px` }}>
      {media.caption}
    </div>
  </ModalShell>;
}
