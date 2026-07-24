import PortfolioSection100 from "./PortfolioSection100";
import PortfolioSection109 from "./PortfolioSection109";
import PortfolioSection107 from "./PortfolioSection107";
function PortfolioSection110({
  ACHIEVEMENTS,
  AVATAR_IMAGES,
  BrickBackground,
  GUILD_QUESTS,
  MAIL_ITEMS,
  NAV_ITEMS,
  PROJECTS,
  PixelFrame,
  PixelHeart,
  PixelIcon,
  SKILL_NODES,
  ScanlineOverlay,
  T,
  THEMES,
  active,
  aiInput,
  aiMessages,
  aiOpen,
  avatarRef,
  beep,
  bodyFont,
  claimQuestXp,
  commits,
  commitsError,
  companion,
  composeEmail,
  composeMsg,
  composeName,
  fontScale,
  handleAvatarClick,
  handleNavClick,
  hiddenRoomUnlocked,
  isMobile,
  isTablet,
  level,
  mailSent,
  mailTab,
  openLetter,
  pixelFont,
  readLetters,
  sendAiMessage,
  sendMail,
  setAiInput,
  setAiOpen,
  setComposeEmail,
  setComposeMsg,
  setComposeName,
  setFontScale,
  setHiddenRoomOpen,
  setMailTab,
  setSelectedProjectId,
  setSelectedQuestId,
  setSelectedSkillId,
  setSettingsOpen,
  setSoundOn,
  setThemeKey,
  settingsOpen,
  soundOn,
  themeKey,
  unlockAchievement,
  unlockedAchievements,
  unreadCount,
  xp,
  xpGain
}) {
  return <div style={{
    display: "flex",
    flex: 1,
    position: "relative",
    minHeight: 0,
    flexDirection: isMobile ? "column" : "row",
    overflow: isMobile ? "auto" : "hidden"
  }}>
        {/* Settings drawer */}
        {settingsOpen && <PortfolioSection100 ACHIEVEMENTS={ACHIEVEMENTS} PixelFrame={PixelFrame} PixelIcon={PixelIcon} T={T} THEMES={THEMES} beep={beep} fontScale={fontScale} isMobile={isMobile} pixelFont={pixelFont} setFontScale={setFontScale} setSettingsOpen={setSettingsOpen} setSoundOn={setSoundOn} setThemeKey={setThemeKey} soundOn={soundOn} themeKey={themeKey} unlockAchievement={unlockAchievement} unlockedAchievements={unlockedAchievements} />}

        {/* Left sidebar */}
        <PortfolioSection109 AVATAR_IMAGES={AVATAR_IMAGES} NAV_ITEMS={NAV_ITEMS} PixelFrame={PixelFrame} PixelHeart={PixelHeart} PixelIcon={PixelIcon} T={T} active={active} avatarRef={avatarRef} beep={beep} commits={commits} commitsError={commitsError} companion={companion} fontScale={fontScale} handleAvatarClick={handleAvatarClick} handleNavClick={handleNavClick} hiddenRoomUnlocked={hiddenRoomUnlocked} isMobile={isMobile} isTablet={isTablet} level={level} pixelFont={pixelFont} setHiddenRoomOpen={setHiddenRoomOpen} themeKey={themeKey} xp={xp} xpGain={xpGain} />

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

          <PortfolioSection107 BrickBackground={BrickBackground} GUILD_QUESTS={GUILD_QUESTS} MAIL_ITEMS={MAIL_ITEMS} NAV_ITEMS={NAV_ITEMS} PROJECTS={PROJECTS} PixelFrame={PixelFrame} PixelIcon={PixelIcon} SKILL_NODES={SKILL_NODES} ScanlineOverlay={ScanlineOverlay} T={T} active={active} beep={beep} bodyFont={bodyFont} claimQuestXp={claimQuestXp} companion={companion} composeEmail={composeEmail} composeMsg={composeMsg} composeName={composeName} fontScale={fontScale} isMobile={isMobile} isTablet={isTablet} mailSent={mailSent} mailTab={mailTab} openLetter={openLetter} pixelFont={pixelFont} readLetters={readLetters} sendMail={sendMail} setComposeEmail={setComposeEmail} setComposeMsg={setComposeMsg} setComposeName={setComposeName} setMailTab={setMailTab} setSelectedProjectId={setSelectedProjectId} setSelectedQuestId={setSelectedQuestId} setSelectedSkillId={setSelectedSkillId} unreadCount={unreadCount} />
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
                  <PixelIcon name="robot" size={16} color={T.bg} />
                </PixelFrame>
                <div>
                  <div style={{
              fontFamily: pixelFont,
              fontSize: `${9 * fontScale}px`,
              lineHeight: 1.6
            }}>AI ASSISTANT</div>
                  <div style={{
              fontSize: `${9 * fontScale}px`,
              color: T.textDim
            }}>PLACEHOLDER</div>
                </div>
              </div>
              <div onClick={() => setAiOpen(false)} style={{
          cursor: "pointer"
        }}>
                <PixelIcon name="close" size={12} color={T.textDim} />
              </div>
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
          alignSelf: m.from === "user" ? "flex-end" : "flex-start",
          background: m.from === "user" ? T.accent : T.panel,
          color: m.from === "user" ? T.bg : T.text,
          border: `2px solid ${m.from === "user" ? T.accentDark : T.border}`,
          padding: "6px 8px",
          fontSize: `${10 * fontScale}px`,
          maxWidth: "85%"
        }}>
                  {m.text}
                </div>)}
            </div>

            <div style={{
        display: "flex",
        gap: 6
      }}>
              <input value={aiInput} onChange={e => setAiInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendAiMessage()} placeholder="Ask about my work..." style={{
          flex: 1,
          background: T.panelAlt,
          border: `2px solid ${T.border}`,
          color: T.text,
          padding: "8px 10px",
          fontSize: `${10 * fontScale}px`,
          fontFamily: pixelFont,
          outline: "none"
        }} />
              <PixelFrame theme={T} onClick={sendAiMessage} style={{
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          fontSize: `${10 * fontScale}px`
        }}>
                ENTER
              </PixelFrame>
            </div>
          </div>}
      </div>;
}
export default PortfolioSection110;
