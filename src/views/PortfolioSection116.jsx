import PortfolioSection101 from "./PortfolioSection101";
import PortfolioSection110 from "./PortfolioSection110";
import PortfolioSection115 from "./PortfolioSection115";
import PortfolioSection111 from "./PortfolioSection111";
import PortfolioSection112 from "./PortfolioSection112";
import PortfolioSection108 from "./PortfolioSection108";
import PortfolioSection113 from "./PortfolioSection113";
import PortfolioSection114 from "./PortfolioSection114";
function PortfolioSection116({
  ACHIEVEMENTS,
  AVATAR_IMAGES,
  BrickBackground,
  GUILD_QUESTS,
  GithubLogo,
  LOGO_IMAGES,
  LinkedInLogo,
  MAIL_ITEMS,
  NAV_ITEMS,
  PROJECTS,
  PixelFrame,
  PixelHeart,
  PixelIcon,
  PixelSprite,
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
  companionFacing,
  companionFrame,
  composeEmail,
  composeMsg,
  composeName,
  encounterMsg,
  fontScale,
  handleAvatarClick,
  handleLogoDoubleClick,
  handleNavClick,
  hiddenRoomOpen,
  hiddenRoomUnlocked,
  isMobile,
  isTablet,
  konamiActive,
  landingBursts,
  level,
  localTime,
  logoSparkle,
  logoSpin,
  mailSent,
  mailTab,
  nameEggShown,
  openLetter,
  openLetterId,
  pixelFont,
  readLetters,
  revealed,
  selectedProjectId,
  selectedQuestId,
  selectedSkillId,
  sendAiMessage,
  sendMail,
  setAiInput,
  setAiOpen,
  setCompanion,
  setComposeEmail,
  setComposeMsg,
  setComposeName,
  setFontScale,
  setHiddenRoomOpen,
  setMailTab,
  setOpenLetterId,
  setSelectedProjectId,
  setSelectedQuestId,
  setSelectedSkillId,
  setSettingsOpen,
  setSoundOn,
  setThemeKey,
  settingsOpen,
  showClickEgg,
  showLevelUp,
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
    flexDirection: "column",
    flex: 1,
    minHeight: 0,
    clipPath: revealed ? "inset(0 0 0 0)" : "inset(50% 0 50% 0)",
    WebkitClipPath: revealed ? "inset(0 0 0 0)" : "inset(50% 0 50% 0)",
    transition: "clip-path 850ms cubic-bezier(0.65, 0, 0.35, 1)"
  }}>

      {/* Top bar */}
      <PortfolioSection101 GithubLogo={GithubLogo} LOGO_IMAGES={LOGO_IMAGES} LinkedInLogo={LinkedInLogo} PixelFrame={PixelFrame} PixelIcon={PixelIcon} T={T} aiOpen={aiOpen} beep={beep} fontScale={fontScale} handleLogoDoubleClick={handleLogoDoubleClick} isTablet={isTablet} localTime={localTime} logoSparkle={logoSparkle} logoSpin={logoSpin} pixelFont={pixelFont} setAiOpen={setAiOpen} setSettingsOpen={setSettingsOpen} settingsOpen={settingsOpen} themeKey={themeKey} />


      <PortfolioSection110 ACHIEVEMENTS={ACHIEVEMENTS} AVATAR_IMAGES={AVATAR_IMAGES} BrickBackground={BrickBackground} GUILD_QUESTS={GUILD_QUESTS} MAIL_ITEMS={MAIL_ITEMS} NAV_ITEMS={NAV_ITEMS} PROJECTS={PROJECTS} PixelFrame={PixelFrame} PixelHeart={PixelHeart} PixelIcon={PixelIcon} SKILL_NODES={SKILL_NODES} ScanlineOverlay={ScanlineOverlay} T={T} THEMES={THEMES} active={active} aiInput={aiInput} aiMessages={aiMessages} aiOpen={aiOpen} avatarRef={avatarRef} beep={beep} bodyFont={bodyFont} claimQuestXp={claimQuestXp} commits={commits} commitsError={commitsError} companion={companion} composeEmail={composeEmail} composeMsg={composeMsg} composeName={composeName} fontScale={fontScale} handleAvatarClick={handleAvatarClick} handleNavClick={handleNavClick} hiddenRoomUnlocked={hiddenRoomUnlocked} isMobile={isMobile} isTablet={isTablet} level={level} mailSent={mailSent} mailTab={mailTab} openLetter={openLetter} pixelFont={pixelFont} readLetters={readLetters} sendAiMessage={sendAiMessage} sendMail={sendMail} setAiInput={setAiInput} setAiOpen={setAiOpen} setComposeEmail={setComposeEmail} setComposeMsg={setComposeMsg} setComposeName={setComposeName} setFontScale={setFontScale} setHiddenRoomOpen={setHiddenRoomOpen} setMailTab={setMailTab} setSelectedProjectId={setSelectedProjectId} setSelectedQuestId={setSelectedQuestId} setSelectedSkillId={setSelectedSkillId} setSettingsOpen={setSettingsOpen} setSoundOn={setSoundOn} setThemeKey={setThemeKey} settingsOpen={settingsOpen} soundOn={soundOn} themeKey={themeKey} unlockAchievement={unlockAchievement} unlockedAchievements={unlockedAchievements} unreadCount={unreadCount} xp={xp} xpGain={xpGain} />

      {/* Konami code overlay */}
      {konamiActive && <PortfolioSection115 PixelHeart={PixelHeart} T={T} fontScale={fontScale} pixelFont={pixelFont} />}

      {/* Avatar click-counter easter egg */}
      {showClickEgg && <div style={{
      position: "fixed",
      bottom: 24,
      left: "50%",
      transform: "translateX(-50%)",
      background: T.panel,
      border: `2px solid ${T.accent}`,
      boxShadow: `2px 2px 0 ${T.bg}`,
      padding: "10px 16px",
      fontSize: `${10 * fontScale}px`,
      color: T.text,
      zIndex: 999
    }}>
          You clicked me 7 times. Persistent. HIDDEN DUNGEON unlocked.
        </div>}

      {/* Level-up easter egg */}
      {showLevelUp && <div style={{
      position: "fixed",
      bottom: 24,
      left: "50%",
      transform: "translateX(-50%)",
      background: T.accent,
      color: T.bg,
      border: `2px solid ${T.accentDark}`,
      boxShadow: `2px 2px 0 ${T.bg}`,
      padding: "10px 16px",
      fontFamily: pixelFont,
      fontSize: `${9 * fontScale}px`,
      zIndex: 999
    }}>
          LEVEL UP!
        </div>}


      {/* Typed-name easter egg */}
      {nameEggShown && <div style={{
      position: "fixed",
      top: 70,
      left: "50%",
      transform: "translateX(-50%)",
      background: T.panel,
      border: `2px solid ${T.accent}`,
      boxShadow: `2px 2px 0 ${T.bg}`,
      padding: "10px 16px",
      fontSize: `${10 * fontScale}px`,
      color: T.text,
      zIndex: 999
    }}>
          Wait, that's my name! Hi there 👋
        </div>}

      {/* Skill node detail modal */}
      {selectedSkillId && (() => {
      const node = SKILL_NODES.find(n => n.id === selectedSkillId);
      if (!node) return null;
      return <PortfolioSection111 PixelFrame={PixelFrame} PixelIcon={PixelIcon} SKILL_NODES={SKILL_NODES} T={T} fontScale={fontScale} node={node} pixelFont={pixelFont} setSelectedSkillId={setSelectedSkillId} />;
    })()}

      {/* Trophy Case project detail modal */}
      {selectedProjectId !== null && (() => {
      const p = PROJECTS[selectedProjectId];
      if (!p) return null;
      return <PortfolioSection112 PixelFrame={PixelFrame} PixelIcon={PixelIcon} T={T} fontScale={fontScale} p={p} pixelFont={pixelFont} setSelectedProjectId={setSelectedProjectId} />;
    })()}

      {/* Guild Hall quest detail modal */}
      {selectedQuestId && (() => {
      const q = GUILD_QUESTS.find(x => x.id === selectedQuestId);
      if (!q) return null;
      return <PortfolioSection108 PixelFrame={PixelFrame} PixelIcon={PixelIcon} T={T} fontScale={fontScale} pixelFont={pixelFont} q={q} setSelectedQuestId={setSelectedQuestId} />;
    })()}

      {/* Opened letter modal */}
      {openLetterId && (() => {
      const letter = MAIL_ITEMS.find(m => m.id === openLetterId);
      if (!letter) return null;
      return <PortfolioSection113 PixelIcon={PixelIcon} T={T} bodyFont={bodyFont} fontScale={fontScale} letter={letter} pixelFont={pixelFont} setOpenLetterId={setOpenLetterId} />;
    })()}

      {/* Hidden room modal */}
      {hiddenRoomOpen && <PortfolioSection114 PixelIcon={PixelIcon} T={T} fontScale={fontScale} pixelFont={pixelFont} setHiddenRoomOpen={setHiddenRoomOpen} />}

      {/* Companion sprite, summoned by Konami code — move with arrow keys, jump with up/space (double jump!) */}
      {companion && <div style={{
      position: "fixed",
      left: companion.x,
      top: companion.y,
      zIndex: 997,
      userSelect: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      pointerEvents: "none",
      transform: !companion.onGround ? "scale(0.9, 1.12)" : companionFrame === "walk1" || companionFrame === "walk2" ? "translateY(-1px)" : "translateY(0)",
      transformOrigin: "bottom center",
      transition: "transform 100ms ease"
    }}>
          <PixelSprite frame={companionFrame} size={40} color={T.accent} facing={companionFacing} />
          <div onClick={() => setCompanion(null)} style={{
        fontSize: `${7 * fontScale}px`,
        color: T.textFaint,
        background: T.panel,
        border: `1px solid ${T.border}`,
        padding: "1px 4px",
        cursor: "pointer",
        pointerEvents: "auto"
      }}>
            dismiss
          </div>
        </div>}

      {/* Landing / double-jump dust particles */}
      {landingBursts.map(b => <div key={b.id} style={{
      position: "fixed",
      left: b.x - 10,
      top: b.y - 6,
      zIndex: 996,
      width: 20,
      height: 12,
      pointerEvents: "none",
      display: "flex",
      justifyContent: "space-between"
    }}>
          {[0, 1, 2].map(i => <div key={i} style={{
        width: 4,
        height: 4,
        background: T.accent,
        animation: "dust-pop 350ms ease-out forwards",
        animationDelay: `${i * 30}ms`
      }} />)}
        </div>)}
      <style>{`@keyframes dust-pop { 0% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: translateY(-10px) scale(0.4); opacity: 0; } }`}</style>

      {/* Companion movement hint */}
      {companion && <div style={{
      position: "fixed",
      top: 10,
      left: "50%",
      transform: "translateX(-50%)",
      background: T.panel,
      border: `2px solid ${T.border}`,
      boxShadow: `2px 2px 0 ${T.bg}`,
      padding: "5px 10px",
      fontSize: `${8 * fontScale}px`,
      color: T.textDim,
      letterSpacing: "0.5px",
      zIndex: 996
    }}>
          ARROW KEYS TO MOVE &middot; UP / SPACE TO JUMP
        </div>}

      {/* Companion encounter toast */}
      {encounterMsg && <div style={{
      position: "fixed",
      bottom: 24,
      left: "50%",
      transform: "translateX(-50%)",
      background: T.panel,
      border: `2px solid ${T.accent}`,
      boxShadow: `2px 2px 0 ${T.bg}`,
      padding: "10px 16px",
      fontSize: `${10 * fontScale}px`,
      color: T.text,
      zIndex: 999,
      maxWidth: 320,
      textAlign: "center"
    }}>
          {encounterMsg}
        </div>}

      </div>;
}
export default PortfolioSection116;
