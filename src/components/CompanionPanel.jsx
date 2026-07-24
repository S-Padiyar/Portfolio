import PixelFrame from "./PixelFrame";
import PixelIcon from "./PixelIcon";
import PixelSprite from "./PixelSprite";
import { panelSizes, spacing } from "../constants/layout";

const ASSISTANT_DESTINATIONS = {
  character: { id: "about", label: "Character" },
  "trophy case": { id: "projects", label: "Trophy Case" },
  "guild hall": { id: "experience", label: "Guild Hall" },
  "skill tree": { id: "skills", label: "Skill Tree" },
  mailbox: { id: "contact", label: "Mailbox" },
  "quest mail": { id: "contact", label: "Quest Mail" }
};

// Convert only known page names and explicit HTTPS URLs into interactive text.
// Model output remains plain text and is never injected as HTML.
export function renderAssistantText(text, handleNavClick, beep, theme) {
  const pattern = /https?:\/\/[^\s<>()]+|Trophy Case|Guild Hall|Skill Tree|Quest Mail|Quest Log|Character|Mailbox/gi;
  const parts = [];
  let cursor = 0;

  for (const match of text.matchAll(pattern)) {
    if (match.index > cursor) parts.push(text.slice(cursor, match.index));
    const token = match[0];
    if (/^https?:\/\//i.test(token)) {
      const trailing = token.match(/[.,!?;:]+$/)?.[0] || "";
      const url = trailing ? token.slice(0, -trailing.length) : token;
      parts.push(<a
        key={`link-${match.index}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        title={url}
        onClick={() => beep(360, 0.04)}
        style={{
          color: theme.accent,
          fontFamily: "inherit",
          fontWeight: 700,
          textDecoration: "underline",
          textUnderlineOffset: 2,
          overflowWrap: "anywhere"
        }}
      >{url}</a>);
      if (trailing) parts.push(trailing);
    } else {
      const destination = ASSISTANT_DESTINATIONS[token.toLowerCase()];
      parts.push(destination ? <button
        key={`page-${match.index}`}
        type="button"
        title={`Open ${destination.label}`}
        onClick={() => handleNavClick(destination.id)}
        style={{
          appearance: "none",
          background: "none",
          border: 0,
          color: theme.accent,
          cursor: "pointer",
          font: "inherit",
          fontWeight: 700,
          margin: 0,
          padding: 0,
          textDecoration: "underline",
          textUnderlineOffset: 2
        }}
      >{token}</button> : <strong key={`page-${match.index}`}>{token}</strong>);
    }
    cursor = match.index + token.length;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

/** Slide-out Companion conversation UI. */
export default function CompanionPanel({
  theme,
  aiInput,
  aiMessages,
  beep,
  fontScale,
  handleNavClick,
  isMobile,
  pixelFont,
  sendAiMessage,
  setAiInput,
  setAiOpen
}) {
  return <aside aria-label="Botmay" style={{
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    width: isMobile ? "100%" : panelSizes.companionWidth,
    borderLeft: `2px solid ${theme.border}`,
    background: theme.panel,
    display: "flex",
    flexDirection: "column",
    padding: `${spacing.lg}px ${spacing.lg}px ${spacing.lg}px ${spacing.md}px`,
    zIndex: 18,
    boxShadow: `-4px 0 0 ${theme.bg}`
  }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <PixelFrame theme={theme} style={{
          width: 30,
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: theme.accent
        }}>
          <PixelSprite frame="idle" size={18} color={theme.bg} />
        </PixelFrame>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: 34, gap: 2 }}>
          <div style={{ fontFamily: pixelFont, fontSize: `${9 * fontScale}px`, lineHeight: 1 }}>Botmay</div>
          <div style={{ fontSize: `${9 * fontScale}px`, color: theme.textDim, lineHeight: 1 }}>Gemini</div>
        </div>
      </div>
      <button type="button" onClick={() => { beep(220); setAiOpen(false); }} title="Close" aria-label="Close Botmay" style={{
        appearance: "none",
        background: "none",
        border: 0,
        padding: 0,
        cursor: "pointer"
      }}>
        <PixelIcon name="close" size={12} color={theme.textDim} />
      </button>
    </div>

    <div aria-live="polite" style={{
      flex: 1,
      background: theme.panelAlt,
      border: `2px solid ${theme.border}`,
      padding: 10,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginBottom: 12,
      minHeight: 220
    }}>
      {aiMessages.map((message, index) => <div key={index} style={{
        fontFamily: "var(--copy-font)",
        alignSelf: message.from === "user" ? "flex-end" : "flex-start",
        background: message.from === "user" ? theme.accent : theme.panel,
        color: message.from === "user" ? theme.bg : theme.text,
        border: `2px solid ${message.from === "user" ? theme.accentDark : theme.border}`,
        padding: "6px 8px",
        fontSize: `${12 * fontScale}px`,
        fontWeight: 400,
        lineHeight: 1.55,
        whiteSpace: "pre-wrap",
        overflowWrap: "anywhere",
        maxWidth: "88%"
      }}>
        {message.from === "ai"
          ? renderAssistantText(message.text, handleNavClick, beep, theme)
          : message.text}
      </div>)}
    </div>

    <form onSubmit={event => { event.preventDefault(); sendAiMessage(); }} style={{ display: "flex", gap: 6 }}>
      <input
        aria-label="Ask Botmay a question"
        value={aiInput}
        onChange={event => setAiInput(event.target.value)}
        placeholder="Ask about my work..."
        style={{
          flex: 1,
          background: theme.panelAlt,
          border: `2px solid ${theme.border}`,
          color: theme.text,
          padding: "8px 10px",
          fontSize: `${12 * fontScale}px`,
          lineHeight: 1.45,
          fontWeight: 400,
          fontFamily: "var(--copy-font)",
          outline: "none"
        }}
      />
      <PixelFrame as="button" type="submit" theme={theme} title="Send question" style={{
        padding: "8px 12px",
        display: "flex",
        alignItems: "center",
        fontSize: `${10 * fontScale}px`
      }}>
        Enter
      </PixelFrame>
    </form>
  </aside>;
}
