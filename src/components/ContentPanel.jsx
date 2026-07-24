import SkillTree from "./SkillTree";
import ExperienceList from "./ExperienceList";
import CharacterSheet from "./CharacterSheet";
import PortfolioProjects from "./PortfolioProjects";
import MailboxPanel from "./MailboxPanel";
import { BrickBackground, ScanlineOverlay } from "./DecorativeUI";

function ContentPanel({
  theme,
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
  level,
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
  return <div style={{
    flex: 1,
    background: theme.panelAlt,
    border: `3px solid ${theme.border}`,
    position: "relative",
    padding: isMobile ? 16 : 24,
    overflow: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none"
  }}>
            <BrickBackground theme={theme} />
            <ScanlineOverlay />

            <div style={{ position: "relative", zIndex: 1 }}>
            {active === "projects" ? <PortfolioProjects theme={theme} beep={beep} companion={companion} fontScale={fontScale} isMobile={isMobile} isTablet={isTablet} pixelFont={pixelFont} setSelectedProjectId={setSelectedProjectId} /> : active === "skills" ? <SkillTree theme={theme} beep={beep} fontScale={fontScale} isMobile={isMobile} isTablet={isTablet} pixelFont={pixelFont} setSelectedSkillId={setSelectedSkillId} /> : active === "experience" ? <ExperienceList theme={theme} beep={beep} claimQuestXp={claimQuestXp} fontScale={fontScale} isMobile={isMobile} isTablet={isTablet} pixelFont={pixelFont} setSelectedQuestId={setSelectedQuestId} /> : active === "contact" ? <MailboxPanel theme={theme} beep={beep} bodyFont={bodyFont} composeEmail={composeEmail} composeMsg={composeMsg} composeName={composeName} fontScale={fontScale} isMobile={isMobile} mailSent={mailSent} mailTab={mailTab} openLetter={openLetter} pixelFont={pixelFont} readLetters={readLetters} sendMail={sendMail} setComposeEmail={setComposeEmail} setComposeMsg={setComposeMsg} setComposeName={setComposeName} setMailTab={setMailTab} unreadCount={unreadCount} /> : active === "about" ? <CharacterSheet theme={theme} fontScale={fontScale} isMobile={isMobile} level={level} pixelFont={pixelFont} /> : <div style={{
      position: "relative",
      color: theme.textDim,
      fontSize: `${11 * fontScale}px`,
      textAlign: "center",
      paddingTop: 60
    }}>
                This section is still being prepared.
              </div>}
            </div>
          </div>;
}
export default ContentPanel;
