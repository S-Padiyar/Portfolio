import PixelIcon from "./PixelIcon";
import ModalShell from "./ui/ModalShell";

/** Renders a message as a theme-aware scroll while sharing modal behavior. */
function MailModal({ theme, beep, fontScale, letter, pixelFont, setOpenLetterId }) {
  const closeModal = () => {
    beep(220);
    setOpenLetterId(null);
  };

  return <ModalShell ariaLabel={`${letter.subject} message`} closeLabel="Close message" onClose={closeModal} panelStyle={{ maxWidth: 440, padding: "30px 26px" }} theme={theme}>
    <div className="scroll-rail" aria-hidden="true" style={{ background: theme.panelAlt, borderColor: theme.border, boxShadow: `2px 2px 0 ${theme.bg}` }} />
    <div className="scroll-rail scroll-rail--bottom" aria-hidden="true" style={{ background: theme.panelAlt, borderColor: theme.border, boxShadow: `2px 2px 0 ${theme.bg}` }} />
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
      <div style={{ fontFamily: pixelFont, fontSize: `${9 * fontScale}px`, color: theme.textFaint, letterSpacing: "1px" }}>Message</div>
    </div>
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
      <div style={{ width: 34, height: 34, borderRadius: "50%", display: "grid", placeItems: "center", background: theme.accent, border: `2px solid ${theme.accentDark}` }}>
        <PixelIcon name="mail" size={16} color={theme.bg} />
      </div>
    </div>
    <div style={{ textAlign: "center", marginBottom: 18 }}>
      <div style={{ fontFamily: pixelFont, fontSize: `${12 * fontScale}px`, lineHeight: 1.7, color: theme.text }}>{letter.subject}</div>
      <div style={{ fontSize: `${10 * fontScale}px`, color: theme.textDim, marginTop: 6 }}>{letter.from} &middot; {letter.date}</div>
    </div>
    <div className="modal-divider" style={{ background: theme.accent }} />
    <div style={{ fontSize: `${13 * fontScale}px`, color: theme.text, lineHeight: 1.9, fontFamily: "var(--copy-font)" }}>{letter.body}</div>
  </ModalShell>;
}

export default MailModal;
