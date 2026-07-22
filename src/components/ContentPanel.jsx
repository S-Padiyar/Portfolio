import SkillTree from "./SkillTree";
import ExperienceList from "./ExperienceList";
import ContactForm from "./ContactForm";
import CharacterSheet from "./CharacterSheet";
import PortfolioProjects from "./PortfolioProjects";
import PixelFrame from "./PixelFrame";
import PixelIcon from "./PixelIcon";
import { BrickBackground, ScanlineOverlay } from "./DecorativeUI";
import { MAIL_ITEMS } from "../data/mail";
import { NAV_ITEMS } from "../data/nav";

function ContentPanel({
  T,
  active,
  beep,
  bodyFont,
  claimQuestXp,
  companion,
  composeEmail,
  composeMsg,
  composeName,
  fontScale,
  isMobile,
  isTablet,
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
  setSelectedProjectId,
  setSelectedQuestId,
  setSelectedSkillId,
  unreadCount
}) {
  // Unread mail follows the active theme while leaving the message card standardized.
  return <div style={{
    flex: 1,
    background: T.panelAlt,
    border: `3px solid ${T.border}`,
    position: "relative",
    padding: isMobile ? 16 : 24,
    overflow: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none"
  }}>
            <BrickBackground theme={T} />
            <ScanlineOverlay />

            {active === "projects" ? <PortfolioProjects T={T} beep={beep} companion={companion} fontScale={fontScale} isMobile={isMobile} isTablet={isTablet} pixelFont={pixelFont} setSelectedProjectId={setSelectedProjectId} /> : active === "skills" ? <SkillTree T={T} beep={beep} fontScale={fontScale} isMobile={isMobile} isTablet={isTablet} pixelFont={pixelFont} setSelectedSkillId={setSelectedSkillId} /> : active === "experience" ? <ExperienceList T={T} beep={beep} claimQuestXp={claimQuestXp} fontScale={fontScale} isMobile={isMobile} isTablet={isTablet} pixelFont={pixelFont} setSelectedQuestId={setSelectedQuestId} /> : active === "contact" ? <div style={{
      position: "relative"
    }}>
                {/* Tabs */}
                <div style={{
        display: "flex",
        gap: 10,
        marginBottom: 18
      }}>
                  <PixelFrame theme={T} active={mailTab === "inbox"} onClick={() => {
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
                    <PixelIcon name="mail" size={12} color={mailTab === "inbox" ? T.bg : T.accent} />
                    <span style={{
            color: mailTab === "inbox" ? T.bg : T.text
          }}>Quest Mail</span>
                    {unreadCount > 0 && <span style={{
            background: mailTab === "inbox" ? T.bg : T.accent,
            color: mailTab === "inbox" ? T.accent : T.bg,
            fontSize: `${9 * fontScale}px`,
            padding: "2px 5px",
            lineHeight: 1
          }}>
                        {unreadCount}
                      </span>}
                  </PixelFrame>
                  <PixelFrame theme={T} active={mailTab === "compose"} onClick={() => {
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
                    <PixelIcon name="arrow" size={12} color={mailTab === "compose" ? T.bg : T.accent} />
                    <span style={{
            color: mailTab === "compose" ? T.bg : T.text
          }}>Send Scroll</span>
                  </PixelFrame>
                </div>

                {mailTab === "inbox" ? <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 10
      }}>
                    {unreadCount > 0 && <div style={{
          fontFamily: "var(--copy-font)",
          fontSize: `${11 * fontScale}px`,
          color: T.accent,
          marginBottom: 2
        }}>
                        {unreadCount} unclaimed drop{unreadCount > 1 ? "s" : ""} waiting — click to claim
                      </div>}
                    {MAIL_ITEMS.map(m => {
          const unread = !readLetters[m.id];
          return <PixelFrame key={m.id} theme={T} onClick={() => openLetter(m.id)} title="Message" style={{
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            gap: 14
          }}>
                          <PixelFrame theme={T} style={{
              width: 36,
              height: 36,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: T.panelAlt,
              border: `2px solid ${unread ? T.accent : T.border}`
            }}>
                            <PixelIcon name="mail" size={16} color={unread ? T.accent : T.textDim} />
                          </PixelFrame>
                          <div style={{
              flex: 1,
              minWidth: 0
            }}>
                            <div style={{
                fontFamily: pixelFont,
                fontSize: `${11 * fontScale}px`,
                color: unread ? T.text : T.textDim,
                marginBottom: 6,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}>
                              {m.subject}
                            </div>
                            <div style={{
                fontSize: `${11 * fontScale}px`,
                color: T.textDim
              }}>
                              {m.from}
                            </div>
                          </div>
                          {unread && <div style={{
              fontFamily: pixelFont,
              fontSize: `${9 * fontScale}px`,
              color: T.accent,
              background: T.panelAlt,
              border: `1px solid ${T.border}`,
              padding: "3px 6px",
              flexShrink: 0
            }}>
                              Unread
                            </div>}
                          <div style={{
              fontSize: `${10 * fontScale}px`,
              color: T.textFaint,
              flexShrink: 0
            }}>{m.date}</div>
                        </PixelFrame>;
        })}
                  </div> : <ContactForm T={T} bodyFont={bodyFont} composeEmail={composeEmail} composeMsg={composeMsg} composeName={composeName} fontScale={fontScale} isMobile={isMobile} mailSent={mailSent} pixelFont={pixelFont} sendMail={sendMail} setComposeEmail={setComposeEmail} setComposeMsg={setComposeMsg} setComposeName={setComposeName} />}
              </div> : active === "about" ? <CharacterSheet T={T} fontScale={fontScale} isMobile={isMobile} pixelFont={pixelFont} /> : <div style={{
      position: "relative",
      color: T.textDim,
      fontSize: `${11 * fontScale}px`,
      textAlign: "center",
      paddingTop: 60
    }}>
                Placeholder content for {NAV_ITEMS.find(n => n.id === active)?.label || active}.
              </div>}
          </div>;
}
export default ContentPanel;
