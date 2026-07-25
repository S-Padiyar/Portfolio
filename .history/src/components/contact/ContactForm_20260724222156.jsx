import PixelFrame from "@/components/ui/PixelFrame";
import PixelIcon from "@/components/ui/PixelIcon";

function ContactForm({
  theme,
  bodyFont,
  composeEmail,
  composeMsg,
  composeName,
  fontScale,
  isMobile,
  mailSent,
  pixelFont,
  sendMail,
  setComposeEmail,
  setComposeMsg,
  setComposeName
}) {
  return <div style={{
    // The scroll should use the full Mailbox panel instead of leaving an
    // arbitrary empty column on larger screens.
    width: "100%"
  }}>
                    <div style={{
      fontSize: `${10 * fontScale}px`,
      color: theme.textDim,
      marginBottom: 16,
      lineHeight: 1.7
    }}>
                      Got a quest for me: an internship, a sponsorship, a coffee chat? Fire off a scroll below and it'll land straight in my inbox.
                    </div>
                    <form onSubmit={event => {
      event.preventDefault();
      sendMail();
    }} style={{
      display: "flex",
      flexDirection: "column",
      gap: 12
    }}>
                      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 12
      }}>
                        <div style={{
          flex: 1
        }}>
                          <label htmlFor="contact-name" style={{
            display: "block",
            fontFamily: pixelFont,
            fontSize: `${10 * fontScale}px`,
            color: theme.textDim,
            marginBottom: 4
          }}>
                            PLAYER NAME
                          </label>
                          <input id="contact-name" name="name" autoComplete="name" value={composeName} onChange={e => setComposeName(e.target.value)} placeholder="Jane Doe" style={{
            width: "100%",
            background: theme.panel,
            border: `2px solid ${theme.border}`,
            color: theme.text,
            padding: "8px 10px",
            fontSize: `${10 * fontScale}px`,
            fontFamily: bodyFont,
            outline: "none",
            boxSizing: "border-box"
          }} />
                        </div>
                        <div style={{
          flex: 1
        }}>
                          <label htmlFor="contact-email" style={{
            display: "block",
            fontFamily: pixelFont,
            fontSize: `${10 * fontScale}px`,
            color: theme.textDim,
            marginBottom: 4
          }}>
                            RESPAWN ADDRESS (EMAIL)
                          </label>
                          <input id="contact-email" name="email" autoComplete="email" required value={composeEmail} onChange={e => setComposeEmail(e.target.value)} placeholder="jane@example.com" type="email" style={{
            width: "100%",
            background: theme.panel,
            border: `2px solid ${theme.border}`,
            color: theme.text,
            padding: "8px 10px",
            fontSize: `${10 * fontScale}px`,
            fontFamily: bodyFont,
            outline: "none",
            boxSizing: "border-box"
          }} />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="contact-message" style={{
          display: "block",
          fontFamily: pixelFont,
          fontSize: `${10 * fontScale}px`,
          color: theme.textDim,
          marginBottom: 4
        }}>
                          MESSAGE
                        </label>
                        <textarea id="contact-message" name="message" required value={composeMsg} onChange={e => setComposeMsg(e.target.value)} placeholder="Say something..." rows={isMobile ? 8 : 12} style={{
          width: "100%",
          background: theme.panel,
          border: `2px solid ${theme.border}`,
          color: theme.text,
          padding: "8px 10px",
          fontSize: `${10 * fontScale}px`,
          fontFamily: bodyFont,
          outline: "none",
          resize: "vertical",
          minHeight: isMobile ? 180 : 260,
          boxSizing: "border-box"
        }} />
                      </div>
                      <PixelFrame as="button" type="submit" disabled={mailSent === "sending"} theme={theme} title="Send this message securely" style={{
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        fontFamily: pixelFont,
        fontSize: `${10 * fontScale}px`,
        alignSelf: "flex-start",
        marginTop: 4
      }}>
                        <PixelIcon name="mail" size={12} color={theme.text} />
                        {mailSent === "sending" ? "Sending..." : "Send Scroll"}
                      </PixelFrame>
                      {mailSent && <div role="status" aria-live="polite" style={{
        fontFamily: "var(--copy-font)",
        fontSize: `${12 * fontScale}px`,
        color: mailSent === "error" || mailSent === "invalid" ? theme.text : theme.accent,
        lineHeight: 1.5
      }}>
                          {mailSent === "sending" && "Sending your message..."}
                          {mailSent === "sent" && "Message sent successfully."}
                          {mailSent === "invalid" && "Enter a valid email address and a message."}
                          {mailSent === "error" && "The message could not be sent. Please try again shortly."}
                        </div>}
                    </form>
                  </div>;
}
export default ContactForm;
