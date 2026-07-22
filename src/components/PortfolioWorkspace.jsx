import SettingsPanel from "./SettingsPanel";
import Sidebar from "./Sidebar";
import ContentPanel from "./ContentPanel";
import PixelSprite from "./PixelSprite";
import PixelFrame from "./PixelFrame";
import PixelIcon from "./PixelIcon";
import { NAV_ITEMS } from "../data/nav";

const ASSISTANT_DESTINATIONS = {
  character: { id: "about", label: "Character" },
  "trophy case": { id: "projects", label: "Trophy Case" },
  "guild hall": { id: "experience", label: "Guild Hall" },
  "skill tree": { id: "skills", label: "Skill Tree" },
  mailbox: { id: "contact", label: "Mailbox" },
  "quest mail": { id: "contact", label: "Quest Mail" }
};

// Convert only known page names and explicit HTTPS URLs into interactive text.
// The model never supplies raw HTML, so assistant output remains safe to render.
function renderAssistantText(text, handleNavClick, beep, T) {
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
          color: T.accent,
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
          color: T.accent,
          cursor: "pointer",
          font: "inherit",
          fontWeight: 700,
          margin: 0,
          padding: 0,
          textDecoration: "underline",
          textUnderlineOffset: 2
        }}
      >{token}</button> : <strong key={`page-${match.index}`} style={{ fontWeight: 700 }}>{token}</strong>);
    }
    cursor = match.index + token.length;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

function PortfolioWorkspace({ appearance, state, actions }) {
  const {
    T, bodyFont, fontScale, isMobile, isTablet, pixelFont, readableFont,
    themeKey
  } = appearance;
  const {
    active, aiInput, aiMessages, aiOpen, avatarRef, commits, commitsError,
    companion, composeEmail, composeMsg, composeName, hiddenRoomUnlocked,
    level, mailSent, mailTab, readLetters, settingsOpen, soundOn,
    unlockedAchievements, unreadCount, xp, xpGain
  } = state;
  const {
    beep, claimQuestXp, handleAvatarClick, handleNavClick, openLetter,
    sendAiMessage, sendMail, setAiInput, setAiOpen, setComposeEmail,
    setComposeMsg, setComposeName, setFontScale, setHiddenRoomOpen, setMailTab,
    setReadableFont, setSelectedProjectId, setSelectedQuestId,
    setSelectedSkillId, setSettingsOpen, setSoundOn, setThemeKey,
    unlockAchievement
  } = actions;
  return <div style={{
    display: "flex",
    flex: 1,
    position: "relative",
    minHeight: 0,
    flexDirection: isMobile ? "column" : "row",
    overflow: isMobile ? "auto" : "hidden"
  }}>
        {/* Settings drawer */}
        {settingsOpen && <SettingsPanel T={T} beep={beep} fontScale={fontScale} isMobile={isMobile} pixelFont={pixelFont} readableFont={readableFont} setFontScale={setFontScale} setReadableFont={setReadableFont} setSettingsOpen={setSettingsOpen} setSoundOn={setSoundOn} setThemeKey={setThemeKey} settingsView={settingsOpen} soundOn={soundOn} themeKey={themeKey} unlockAchievement={unlockAchievement} unlockedAchievements={unlockedAchievements} />}

        {/* Left sidebar */}
        <Sidebar T={T} active={active} avatarRef={avatarRef} beep={beep} commits={commits} commitsError={commitsError} companion={companion} fontScale={fontScale} handleAvatarClick={handleAvatarClick} handleNavClick={handleNavClick} hiddenRoomUnlocked={hiddenRoomUnlocked} isMobile={isMobile} isTablet={isTablet} level={level} pixelFont={pixelFont} setHiddenRoomOpen={setHiddenRoomOpen} themeKey={themeKey} xp={xp} xpGain={xpGain} />

        {/* Main content */}
        <div style={{
      flex: 1,
      padding: isMobile ? 14 : 24,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      minWidth: 0
    }}>
          <h1 style={{
        fontFamily: pixelFont,
        fontSize: `${16 * fontScale}px`,
        color: T.accent,
        marginBottom: 10,
        letterSpacing: "1px",
        lineHeight: 1.6
      }}>
            {NAV_ITEMS.find(n => n.id === active)?.label || "Projects"}
          </h1>

          <ContentPanel T={T} active={active} beep={beep} bodyFont={bodyFont} claimQuestXp={claimQuestXp} companion={companion} composeEmail={composeEmail} composeMsg={composeMsg} composeName={composeName} fontScale={fontScale} isMobile={isMobile} isTablet={isTablet} mailSent={mailSent} mailTab={mailTab} openLetter={openLetter} pixelFont={pixelFont} readLetters={readLetters} sendMail={sendMail} setComposeEmail={setComposeEmail} setComposeMsg={setComposeMsg} setComposeName={setComposeName} setMailTab={setMailTab} setSelectedProjectId={setSelectedProjectId} setSelectedQuestId={setSelectedQuestId} setSelectedSkillId={setSelectedSkillId} unreadCount={unreadCount} />
        </div>
        {aiOpen && <div style={{
      position: "absolute",
      top: 0,
      right: 0,
      height: "100%",
      width: isMobile ? "100%" : 320,
      borderLeft: `3px solid ${T.border}`,
      background: T.panel,
      display: "flex",
      flexDirection: "column",
      padding: 16,
      zIndex: 18,
      boxShadow: `-4px 0 0 ${T.bg}`
    }}>
            <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14
      }}>
              <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8
        }}>
                <PixelFrame theme={T} style={{
            width: 30,
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: T.accent
          }}>
                  <PixelSprite frame="idle" size={18} color={T.bg} />
                </PixelFrame>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: 34,
                  gap: 2
                }}>
                  <div style={{
              fontFamily: pixelFont,
              fontSize: `${9 * fontScale}px`,
              lineHeight: 1,
              margin: 0
            }}>Companion</div>
                  <div style={{
              fontSize: `${9 * fontScale}px`,
              color: T.textDim,
              lineHeight: 1,
              margin: 0
            }}>Gemini</div>
                </div>
              </div>
              <button type="button" onClick={() => { beep(220); setAiOpen(false); }} title="Close" aria-label="Close Companion" style={{
          appearance: "none",
          background: "none",
          border: 0,
          padding: 0,
          cursor: "pointer"
        }}>
                <PixelIcon name="close" size={12} color={T.textDim} />
              </button>
            </div>

            <div style={{
        flex: 1,
        background: T.panelAlt,
        border: `2px solid ${T.border}`,
        padding: 10,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginBottom: 12,
        minHeight: 220
      }}>
              {aiMessages.map((m, i) => <div key={i} style={{
          fontFamily: "var(--copy-font)",
          alignSelf: m.from === "user" ? "flex-end" : "flex-start",
          background: m.from === "user" ? T.accent : T.panel,
          color: m.from === "user" ? T.bg : T.text,
          border: `2px solid ${m.from === "user" ? T.accentDark : T.border}`,
          padding: "6px 8px",
          fontSize: `${12 * fontScale}px`,
          fontWeight: 400,
          lineHeight: 1.55,
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
          maxWidth: "88%"
        }}>
                  {m.from === "ai" ? renderAssistantText(m.text, handleNavClick, beep, T) : m.text}
                </div>)}
            </div>

            <form onSubmit={event => {
        event.preventDefault();
        sendAiMessage();
      }} style={{
        display: "flex",
        gap: 6
      }}>
              <input aria-label="Ask the Companion a question" value={aiInput} onChange={e => setAiInput(e.target.value)} placeholder="Ask about my work..." style={{
          flex: 1,
          background: T.panelAlt,
          border: `2px solid ${T.border}`,
          color: T.text,
          padding: "8px 10px",
          fontSize: `${12 * fontScale}px`,
          lineHeight: 1.45,
          fontWeight: 400,
          fontFamily: "var(--copy-font)",
          outline: "none"
        }} />
              <PixelFrame as="button" type="submit" theme={T} title="Send question" style={{
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          fontSize: `${10 * fontScale}px`
        }}>
                Enter
              </PixelFrame>
            </form>
          </div>}
      </div>;
}
export default PortfolioWorkspace;
