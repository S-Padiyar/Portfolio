import SettingsPanel from "@/components/settings/SettingsPanel";
import Sidebar from "@/components/layout/Sidebar";
import ContentPanel from "@/components/layout/ContentPanel";
import CompanionPanel from "@/components/assistant/CompanionPanel";
import { NAV_ITEMS } from "@/data/nav";
import { spacing } from "@/constants/layout";

function PortfolioWorkspace({ appearance, state, actions }) {
  const {
    theme, bodyFont, fontScale, isMobile, isTablet, pixelFont, readableFont,
    themeKey
  } = appearance;
  const {
    active, aiInput, aiMessages, aiOpen, avatarRef, commits, commitsError,
    companion, composeEmail, composeMsg, composeName, hiddenRoomUnlocked,
    level, mailSent, mailTab, readLetters, settingsOpen, soundOn,
    unlockedAchievements, unreadCount, xp, xpGain
  } = state;
  const {
    beep, handleAvatarClick, handleNavClick, openLetter,
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
        {settingsOpen && <SettingsPanel theme={theme} beep={beep} fontScale={fontScale} isMobile={isMobile} pixelFont={pixelFont} readableFont={readableFont} setFontScale={setFontScale} setReadableFont={setReadableFont} setSettingsOpen={setSettingsOpen} setSoundOn={setSoundOn} setThemeKey={setThemeKey} settingsView={settingsOpen} soundOn={soundOn} themeKey={themeKey} unlockAchievement={unlockAchievement} unlockedAchievements={unlockedAchievements} />}

        {/* Left sidebar */}
        <Sidebar theme={theme} active={active} avatarRef={avatarRef} beep={beep} commits={commits} commitsError={commitsError} companion={companion} fontScale={fontScale} handleAvatarClick={handleAvatarClick} handleNavClick={handleNavClick} hiddenRoomUnlocked={hiddenRoomUnlocked} isMobile={isMobile} isTablet={isTablet} level={level} pixelFont={pixelFont} setHiddenRoomOpen={setHiddenRoomOpen} themeKey={themeKey} xp={xp} xpGain={xpGain} />

        {/* Main content */}
        <div style={{
      flex: 1,
      padding: isMobile ? 14 : spacing.xl,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      minWidth: 0
    }}>
          <h1 style={{
        fontFamily: pixelFont,
        fontSize: `${16 * fontScale}px`,
        color: theme.accent,
        marginBottom: 10,
        letterSpacing: "1px",
        lineHeight: 1.6
      }}>
            {NAV_ITEMS.find(n => n.id === active)?.label || "Projects"}
          </h1>

          <ContentPanel theme={theme} active={active} beep={beep} bodyFont={bodyFont} companion={companion} composeEmail={composeEmail} composeMsg={composeMsg} composeName={composeName} fontScale={fontScale} isMobile={isMobile} isTablet={isTablet} level={level} mailSent={mailSent} mailTab={mailTab} openLetter={openLetter} pixelFont={pixelFont} readLetters={readLetters} sendMail={sendMail} setComposeEmail={setComposeEmail} setComposeMsg={setComposeMsg} setComposeName={setComposeName} setMailTab={setMailTab} setSelectedProjectId={setSelectedProjectId} setSelectedQuestId={setSelectedQuestId} setSelectedSkillId={setSelectedSkillId} themeKey={themeKey} unlockedAchievements={unlockedAchievements} unreadCount={unreadCount} />
        </div>
        {aiOpen && <CompanionPanel
          theme={theme}
          aiInput={aiInput}
          aiMessages={aiMessages}
          beep={beep}
          fontScale={fontScale}
          handleNavClick={handleNavClick}
          isMobile={isMobile}
          pixelFont={pixelFont}
          sendAiMessage={sendAiMessage}
          setAiInput={setAiInput}
          setAiOpen={setAiOpen}
        />}
      </div>;
}
export default PortfolioWorkspace;
