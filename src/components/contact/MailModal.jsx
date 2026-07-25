import PixelIcon from "@/components/ui/PixelIcon";

/** Theme-colored acceptance letter that uses the older scroll-style mailbox implementation. */
function MailModal({ theme, beep, fontScale, letter, pixelFont, setOpenLetterId }) {
  const closeModal = () => {
    beep(220);
    setOpenLetterId(null);
  };

  return <div role="presentation" onClick={closeModal} style={{
    position: "fixed",
    inset: 0,
    background: `${theme.bg}cc`,
    zIndex: 998,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(12px, 3vw, 20px)"
  }}>
    <div role="dialog" aria-modal="true" aria-label={`${letter.subject} message`} onClick={event => event.stopPropagation()} style={{
      background: theme.panel,
      border: `2px solid ${theme.border}`,
      boxShadow: `4px 4px 0 ${theme.bg}`,
      padding: "clamp(24px, 4vw, 30px) clamp(20px, 4vw, 26px)",
      maxWidth: 440,
      width: "100%",
      position: "relative",
      margin: "10px"
    }}>
      <div aria-hidden="true" style={{
        position: "absolute",
        left: -10,
        right: -10,
        top: -8,
        height: 12,
        background: theme.panelAlt,
        border: `2px solid ${theme.border}`,
        boxShadow: `2px 2px 0 ${theme.bg}`
      }} />
      <div aria-hidden="true" style={{
        position: "absolute",
        left: -10,
        right: -10,
        bottom: -8,
        height: 12,
        background: theme.panelAlt,
        border: `2px solid ${theme.border}`,
        boxShadow: `2px 2px 0 ${theme.bg}`
      }} />
      <button type="button" onClick={closeModal} title="Close" aria-label="Close message" style={{
        appearance: "none",
        background: "none",
        border: 0,
        padding: 0,
        position: "absolute",
        top: 16,
        right: 14,
        cursor: "pointer"
      }}>
        <PixelIcon name="close" size={12} color={theme.textDim} />
      </button>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <div style={{
          fontFamily: pixelFont,
          fontSize: `${9 * fontScale}px`,
          color: theme.textFaint,
          letterSpacing: "1px"
        }}>
          Message
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <div style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: theme.accent,
          border: `2px solid ${theme.accentDark}`,
          boxShadow: `2px 2px 0 ${theme.bg}`
        }} />
      </div>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <div style={{
          fontFamily: pixelFont,
          fontSize: `${12 * fontScale}px`,
          lineHeight: 1.7,
          color: theme.text
        }}>
          {letter.subject}
        </div>
        <div style={{ fontSize: `${10 * fontScale}px`, color: theme.textDim, marginTop: 6 }}>
          {letter.from} &middot; {letter.date}
        </div>
      </div>
      <div style={{ height: 2, background: theme.border, marginBottom: 18 }} />
      <div style={{
        fontSize: `${13 * fontScale}px`,
        color: theme.text,
        lineHeight: 1.9,
        fontFamily: "var(--copy-font)",
        textAlign: "center"
      }}>
        {letter.body}
      </div>
    </div>
  </div>;
}

export default MailModal;
