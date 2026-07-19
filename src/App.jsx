import useCompanionSystem from "./hooks/useCompanionSystem";
import PortfolioSection116 from "./views/PortfolioSection116";
import PortfolioSection115 from "./views/PortfolioSection115";
import PortfolioSection114 from "./views/PortfolioSection114";
import PortfolioSection113 from "./views/PortfolioSection113";
import PortfolioSection112 from "./views/PortfolioSection112";
import PortfolioSection111 from "./views/PortfolioSection111";
import PortfolioSection110 from "./views/PortfolioSection110";
import PortfolioSection109 from "./views/PortfolioSection109";
import PortfolioSection108 from "./views/PortfolioSection108";
import PortfolioSection107 from "./views/PortfolioSection107";
import PortfolioSection106 from "./views/PortfolioSection106";
import PortfolioSection105 from "./views/PortfolioSection105";
import PortfolioSection104 from "./views/PortfolioSection104";
import PortfolioSection103 from "./views/PortfolioSection103";
import PortfolioSection102 from "./views/PortfolioSection102";
import PortfolioSection101 from "./views/PortfolioSection101";
import PortfolioSection100 from "./views/PortfolioSection100";
import React, { useState, useEffect, useRef } from "react";
import { THEMES } from "./data/themes";
import { LOGO_IMAGES, AVATAR_IMAGES } from "./data/images";
import { NAV_ITEMS } from "./data/nav";
import { PROJECTS } from "./data/projects";
import { GUILD_QUESTS } from "./data/quests";
import { MAIL_ITEMS } from "./data/mail";
import { SKILL_NODES } from "./data/skills";
import { ACHIEVEMENTS } from "./data/achievements";
import PixelIcon from "./components/PixelIcon";
import { LinkedInLogo, GithubLogo } from "./components/SocialLogos";
import PixelFrame from "./components/PixelFrame";
import { BrickBackground, ScanlineOverlay, CornerNubs, PixelHeart } from "./components/DecorativeUI";
import PixelSprite from "./components/PixelSprite";
import useViewportWidth from "./hooks/useViewportWidth";
import useAudioBeep from "./hooks/useAudioBeep";
import useGithubQuestLog from "./hooks/useGithubQuestLog";
export default function PortfolioHome() {
  const [themeKey, setThemeKey] = useState("amber");
  const [active, setActive] = useState("projects");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [fontScale, setFontScale] = useState(1);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState([{
    from: "ai",
    text: "Placeholder assistant. Ask me about the work on this site."
  }]);
  const [avatarClicks, setAvatarClicks] = useState(0);
  const [showClickEgg, setShowClickEgg] = useState(false);
  const [konamiActive, setKonamiActive] = useState(false);
  const [hiddenRoomUnlocked, setHiddenRoomUnlocked] = useState(false);
  const [hiddenRoomOpen, setHiddenRoomOpen] = useState(false);
  const [companion, setCompanion] = useState(null); // {x, y, vx, vy, onGround, facing, anim}
  const [companionSteps, setCompanionSteps] = useState(0);
  const [encounterMsg, setEncounterMsg] = useState(null);
  const [reunionFound, setReunionFound] = useState(false);
  const [logoSpin, setLogoSpin] = useState(false);
  const [logoSparkle, setLogoSparkle] = useState(false);
  const avatarRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(12);
  const [unlockedAchievements, setUnlockedAchievements] = useState({});
  const [xpGain, setXpGain] = useState(null); // { amount, id } for floating "+N XP" popup
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [nameEggShown, setNameEggShown] = useState(false);
  const [partyMode, setPartyMode] = useState(false);
  const [mailTab, setMailTab] = useState("inbox"); // "inbox" | "compose"
  const [openLetterId, setOpenLetterId] = useState(null);
  const [readLetters, setReadLetters] = useState({});
  const [composeName, setComposeName] = useState("");
  const [composeEmail, setComposeEmail] = useState("");
  const [composeMsg, setComposeMsg] = useState("");
  const [mailSent, setMailSent] = useState(false);
  const CONTACT_EMAIL = "you@example.com";
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedQuestId, setSelectedQuestId] = useState(null);
  const GITHUB_USERNAME = "S-Padiyar";
  const { commits, commitsError } = useGithubQuestLog(GITHUB_USERNAME);
  const vw = useViewportWidth();
  const isMobile = vw < 700;
  const isTablet = vw < 980;
  const beep = useAudioBeep(soundOn);
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  // Simple easter egg: a little message for anyone who opens devtools
  useEffect(() => {
    console.log("%cHey, looking under the hood? Nice.", "font-weight: bold;");
  }, []);
  function localTime() {
    return now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  }

  // Trigger the opening swipe-up reveal shortly after mount
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Typed-word easter egg: type "sunmay" anywhere
  const {
    companionFacing,
    companionFrame,
    landingBursts,
  } = useCompanionSystem({
    avatarRef,
    beep,
    companion,
    reunionFound,
    setCompanion,
    setCompanionSteps,
    setEncounterMsg,
    setKonamiActive,
    setNameEggShown,
    setReunionFound,
    unlockAchievement
  });
  const xpGainIdRef = useRef(0);
  function gainXp(amount, key) {
    xpGainIdRef.current += 1;
    const id = xpGainIdRef.current;
    setXpGain({
      amount,
      id
    });
    setTimeout(() => {
      setXpGain(cur => cur && cur.id === id ? null : cur);
    }, 900);
    setXp(prev => {
      let total = prev + amount;
      let leveledUp = false;
      while (total >= 100) {
        total -= 100;
        leveledUp = true;
      }
      if (leveledUp) {
        setLevel(l => l + 1);
        setShowLevelUp(true);
        beep(660, 0.06);
        setTimeout(() => beep(880, 0.09), 100);
        setTimeout(() => beep(1180, 0.12), 200);
        setTimeout(() => setShowLevelUp(false), 1800);
      }
      return total;
    });
  }
  const claimedQuestsRef = useRef({});
  function claimQuestXp(q) {
    if (claimedQuestsRef.current[q.id]) return;
    claimedQuestsRef.current[q.id] = true;
    gainXp(q.reward);
  }
  const unlockedRef = useRef({});
  function unlockAchievement(id) {
    if (unlockedRef.current[id]) return;
    unlockedRef.current[id] = true;
    setUnlockedAchievements(prev => ({
      ...prev,
      [id]: true
    }));
    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (ach) gainXp(ach.xp);
  }
  function handleAvatarClick() {
    beep(400 + avatarClicks * 20, 0.03);
    const next = avatarClicks + 1;
    setAvatarClicks(next);
    unlockAchievement("wake_up");
    if (next === 7) {
      setShowClickEgg(true);
      setHiddenRoomUnlocked(true);
      unlockAchievement("persistent");
      beep(700, 0.15);
      setTimeout(() => setShowClickEgg(false), 3000);
    }
  }
  function handleLogoDoubleClick() {
    // A single smooth spin, deliberately no rapid flashing/color-cycling.
    setPartyMode(true);
    setLogoSpin(true);
    unlockAchievement("spin_cycle");
    beep(500, 0.05);
    setTimeout(() => beep(700, 0.08), 260);
    setTimeout(() => {
      setLogoSpin(false);
      setPartyMode(false);
      // Sparkle burst lands right as the spin finishes
      setLogoSparkle(true);
      beep(900, 0.06);
      setTimeout(() => beep(1200, 0.05), 90);
      setTimeout(() => setLogoSparkle(false), 650);
    }, 700);
  }
  const T = THEMES[themeKey];
  function handleNavClick(id) {
    setActive(id);
    beep(320, 0.04);
  }
  function sendAiMessage() {
    if (!aiInput.trim()) return;
    beep(440, 0.04);
    setAiMessages(m => [...m, {
      from: "user",
      text: aiInput
    }, {
      from: "ai",
      text: "Placeholder response. Wire this up to real content later."
    }]);
    setAiInput("");
  }
  function openLetter(id) {
    beep(300, 0.05);
    setOpenLetterId(id);
    setReadLetters(r => ({
      ...r,
      [id]: true
    }));
  }
  function sendMail() {
    if (!composeEmail.trim() || !composeMsg.trim()) return;
    beep(500, 0.05);
    const subject = encodeURIComponent(`Portfolio message from ${composeName || "a visitor"}`);
    const body = encodeURIComponent(`${composeMsg}\n\n— ${composeName || "Anonymous"} (${composeEmail})`);
    window.open(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`, "_blank");
    setMailSent(true);
    setTimeout(() => setMailSent(false), 3000);
    setComposeName("");
    setComposeEmail("");
    setComposeMsg("");
  }
  const unreadCount = MAIL_ITEMS.filter(m => !readLetters[m.id]).length;
  const pixelFont = "'Press Start 2P', 'Courier New', monospace";
  const bodyFont = "'Silkscreen', 'Courier New', monospace";
  return <div className="pixel-root" style={{
    fontFamily: bodyFont,
    background: T.bg,
    color: T.text,
    minHeight: "100vh", height: "100%",
    width: "100%", maxWidth: "100vw", boxSizing: "border-box",
    display: "flex", flexDirection: "column",
    fontSize: `${14 * fontScale}px`,
    letterSpacing: "0.5px",
    overflowX: "hidden",
    border: `3px solid ${T.border}`,
    position: "relative"
  }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&display=swap');
        html, body, #root { width: 100%; max-width: 100%; min-width: 0; overflow-x: hidden; }
        *, *::before, *::after { box-sizing: border-box; }
        .pixel-root ::-webkit-scrollbar { display: none; }
      `}</style>



      <style>{`@keyframes avatar-breathe { 0%,100% { box-shadow: 2px 2px 0 ${T.bg}; } 50% { box-shadow: 2px 2px 0 ${T.bg}, 0 0 6px ${T.accent}88; } }
        @keyframes xp-float {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-16px); opacity: 0; }
        }
        @keyframes logo-sparkle {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          25% { transform: scale(1.4) rotate(45deg); opacity: 1; }
          100% { transform: scale(0.2) rotate(90deg) translateY(-6px); opacity: 0; }
        }
      `}</style>

      <PortfolioSection116 ACHIEVEMENTS={ACHIEVEMENTS} AVATAR_IMAGES={AVATAR_IMAGES} BrickBackground={BrickBackground} GUILD_QUESTS={GUILD_QUESTS} GithubLogo={GithubLogo} LOGO_IMAGES={LOGO_IMAGES} LinkedInLogo={LinkedInLogo} MAIL_ITEMS={MAIL_ITEMS} NAV_ITEMS={NAV_ITEMS} PROJECTS={PROJECTS} PixelFrame={PixelFrame} PixelHeart={PixelHeart} PixelIcon={PixelIcon} PixelSprite={PixelSprite} SKILL_NODES={SKILL_NODES} ScanlineOverlay={ScanlineOverlay} T={T} THEMES={THEMES} active={active} aiInput={aiInput} aiMessages={aiMessages} aiOpen={aiOpen} avatarRef={avatarRef} beep={beep} bodyFont={bodyFont} claimQuestXp={claimQuestXp} commits={commits} commitsError={commitsError} companion={companion} companionFacing={companionFacing} companionFrame={companionFrame} composeEmail={composeEmail} composeMsg={composeMsg} composeName={composeName} encounterMsg={encounterMsg} fontScale={fontScale} handleAvatarClick={handleAvatarClick} handleLogoDoubleClick={handleLogoDoubleClick} handleNavClick={handleNavClick} hiddenRoomOpen={hiddenRoomOpen} hiddenRoomUnlocked={hiddenRoomUnlocked} isMobile={isMobile} isTablet={isTablet} konamiActive={konamiActive} landingBursts={landingBursts} level={level} localTime={localTime} logoSparkle={logoSparkle} logoSpin={logoSpin} mailSent={mailSent} mailTab={mailTab} nameEggShown={nameEggShown} openLetter={openLetter} openLetterId={openLetterId} pixelFont={pixelFont} readLetters={readLetters} revealed={revealed} selectedProjectId={selectedProjectId} selectedQuestId={selectedQuestId} selectedSkillId={selectedSkillId} sendAiMessage={sendAiMessage} sendMail={sendMail} setAiInput={setAiInput} setAiOpen={setAiOpen} setCompanion={setCompanion} setComposeEmail={setComposeEmail} setComposeMsg={setComposeMsg} setComposeName={setComposeName} setFontScale={setFontScale} setHiddenRoomOpen={setHiddenRoomOpen} setMailTab={setMailTab} setOpenLetterId={setOpenLetterId} setSelectedProjectId={setSelectedProjectId} setSelectedQuestId={setSelectedQuestId} setSelectedSkillId={setSelectedSkillId} setSettingsOpen={setSettingsOpen} setSoundOn={setSoundOn} setThemeKey={setThemeKey} settingsOpen={settingsOpen} showClickEgg={showClickEgg} showLevelUp={showLevelUp} soundOn={soundOn} themeKey={themeKey} unlockAchievement={unlockAchievement} unlockedAchievements={unlockedAchievements} unreadCount={unreadCount} xp={xp} xpGain={xpGain} />

    </div>;
}
