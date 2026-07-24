import ContactForm from "./ContactForm";
import PixelFrame from "./PixelFrame";
import PixelIcon from "./PixelIcon";
import { MAIL_ITEMS } from "../data/mail";

/** Mailbox tabs, inbox entries, and the Send Scroll contact form. */
export default function MailboxPanel({
  theme,
  beep,
  bodyFont,
  composeEmail,
  composeMsg,
  composeName,
  fontScale,
  isMobile,
  mailSent,
  mailTab,
  openLetter,
  pixelFont,
  readLetters,
  sendMail,
  setComposeEmail,
  setComposeMsg,
  setComposeName,
  setMailTab,
  unreadCount
}) {
  return <div style={{ position: "relative" }}>
    <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
      <PixelFrame theme={theme} active={mailTab === "inbox"} onClick={() => {
        setMailTab("inbox");
        beep(320, 0.03);
      }} title="Inbox" style={{
        padding: "8px 14px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontFamily: pixelFont,
        fontSize: `${10 * fontScale}px`
      }}>
        <PixelIcon name="mail" size={12} color={mailTab === "inbox" ? theme.bg : theme.accent} />
        <span style={{ color: mailTab === "inbox" ? theme.bg : theme.text }}>Quest Mail</span>
        {unreadCount > 0 && <span style={{
          background: mailTab === "inbox" ? theme.bg : theme.accent,
          color: mailTab === "inbox" ? theme.accent : theme.bg,
          fontSize: `${9 * fontScale}px`,
          padding: "2px 5px",
          lineHeight: 1
        }}>
          {unreadCount}
        </span>}
      </PixelFrame>

      <PixelFrame theme={theme} active={mailTab === "compose"} onClick={() => {
        setMailTab("compose");
        beep(320, 0.03);
      }} title="Compose" style={{
        padding: "8px 14px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontFamily: pixelFont,
        fontSize: `${10 * fontScale}px`
      }}>
        <PixelIcon name="arrow" size={12} color={mailTab === "compose" ? theme.bg : theme.accent} />
        <span style={{ color: mailTab === "compose" ? theme.bg : theme.text }}>Send Scroll</span>
      </PixelFrame>
    </div>

    {mailTab === "inbox" ? <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {unreadCount > 0 && <div style={{
        fontFamily: "var(--copy-font)",
        fontSize: `${11 * fontScale}px`,
        color: theme.accent,
        marginBottom: 2
      }}>
        {unreadCount} unclaimed drop{unreadCount > 1 ? "s" : ""} waiting — click to claim
      </div>}

      {MAIL_ITEMS.map(mailItem => {
        const unread = !readLetters[mailItem.id];
        return <PixelFrame
          key={mailItem.id}
          theme={theme}
          onClick={() => openLetter(mailItem.id)}
          title={`Open ${mailItem.subject}`}
          style={{
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            gap: 14
          }}
        >
          <PixelFrame theme={theme} style={{
            width: 36,
            height: 36,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: theme.panelAlt,
            border: `2px solid ${unread ? theme.accent : theme.border}`
          }}>
            <PixelIcon name="mail" size={16} color={unread ? theme.accent : theme.textDim} />
          </PixelFrame>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: pixelFont,
              fontSize: `${11 * fontScale}px`,
              color: unread ? theme.text : theme.textDim,
              marginBottom: 6,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}>
              {mailItem.subject}
            </div>
            <div style={{ fontSize: `${11 * fontScale}px`, color: theme.textDim }}>
              {mailItem.from}
            </div>
          </div>
          {unread && <div style={{
            fontFamily: pixelFont,
            fontSize: `${9 * fontScale}px`,
            color: theme.accent,
            background: theme.panelAlt,
            border: `1px solid ${theme.border}`,
            padding: "3px 6px",
            flexShrink: 0
          }}>
            Unread
          </div>}
          <div style={{ fontSize: `${10 * fontScale}px`, color: theme.textFaint, flexShrink: 0 }}>
            {mailItem.date}
          </div>
        </PixelFrame>;
      })}
    </div> : <ContactForm
      theme={theme}
      bodyFont={bodyFont}
      composeEmail={composeEmail}
      composeMsg={composeMsg}
      composeName={composeName}
      fontScale={fontScale}
      isMobile={isMobile}
      mailSent={mailSent}
      pixelFont={pixelFont}
      sendMail={sendMail}
      setComposeEmail={setComposeEmail}
      setComposeMsg={setComposeMsg}
      setComposeName={setComposeName}
    />}
  </div>;
}
