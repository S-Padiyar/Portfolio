import useCompanionSystem from "./hooks/useCompanionSystem";
import PortfolioScene from "./components/PortfolioScene";
import { useState, useEffect, useRef } from "react";
import { THEMES } from "./data/themes";
import { MAIL_ITEMS } from "./data/mail";
import { ACHIEVEMENTS } from "./data/achievements";
import PixelIcon from "./components/PixelIcon";
import useViewportWidth from "./hooks/useViewportWidth";
import useAudioBeep from "./hooks/useAudioBeep";
import useGithubQuestLog from "./hooks/useGithubQuestLog";
import usePortfolioAssistant from "./hooks/usePortfolioAssistant";
import useProgression from "./hooks/useProgression";
import { isValidContactSubmission, submitContactForm } from "./services/contactService";
export default function PortfolioHome() {
  const [themeKey, setThemeKey] = useState("amber");
  const [active, setActive] = useState("projects");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [fontScale, setFontScale] = useState(1.05);
  // Accessibility option: swap decorative pixel fonts for familiar system fonts.
  const [readableFont, setReadableFont] = useState(false);
  const [avatarClicks, setAvatarClicks] = useState(0);
  const [showClickEgg, setShowClickEgg] = useState(false);
  const [konamiActive, setKonamiActive] = useState(false);
  const [hiddenRoomUnlocked, setHiddenRoomUnlocked] = useState(false);
  const [hiddenRoomOpen, setHiddenRoomOpen] = useState(false);
  const [companion, setCompanion] = useState(null); // {x, y, vx, vy, onGround, facing, anim}
  const [encounterMsg, setEncounterMsg] = useState(null);
  const [reunionFound, setReunionFound] = useState(false);
  const [logoSpin, setLogoSpin] = useState(false);
  const [logoSparkle, setLogoSparkle] = useState(false);
  const avatarRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [nameEggShown, setNameEggShown] = useState(false);
  const [mailTab, setMailTab] = useState("inbox"); // "inbox" | "compose"
  const [openLetterId, setOpenLetterId] = useState(null);
  const [readLetters, setReadLetters] = useState({});
  const [composeName, setComposeName] = useState("");
  const [composeEmail, setComposeEmail] = useState("");
  const [composeMsg, setComposeMsg] = useState("");
  const [mailSent, setMailSent] = useState(false);
  const [selectedSkillId, setSelectedSkillIdState] = useState(null);
  const [selectedProjectId, setSelectedProjectIdState] = useState(null);
  const [selectedQuestId, setSelectedQuestIdState] = useState(null);
  const GITHUB_USERNAME = "S-Padiyar";
  const { commits, commitsError } = useGithubQuestLog(GITHUB_USERNAME);
  const vw = useViewportWidth();
  const isMobile = vw < 700;
  const isTablet = vw < 980;
  const beep = useAudioBeep(soundOn);
  const {
    achievementToast,
    claimQuestXp,
    level,
    showLevelUp,
    unlockAchievement,
    unlockedAchievements,
    xp,
    xpGain
  } = useProgression({ achievements: ACHIEVEMENTS, beep });
  const {
    aiInput,
    aiMessages,
    sendAiMessage,
    setAiInput
  } = usePortfolioAssistant({
    beep,
    endpoint: import.meta.env.VITE_AI_ASSISTANT_URL,
    unlockAchievement
  });
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
      hour12: false,
      timeZone: "America/New_York"
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
    setEncounterMsg,
    setKonamiActive,
    setNameEggShown,
    setReunionFound,
    unlockAchievement
  });
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
    setLogoSpin(true);
    unlockAchievement("spin_cycle");
    beep(500, 0.05);
    setTimeout(() => beep(700, 0.08), 260);
    setTimeout(() => {
      setLogoSpin(false);
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
    if (id === "about") unlockAchievement("character_loaded");
    beep(320, 0.04);
  }
  function openLetter(id) {
    unlockAchievement("mail_reader");
    beep(300, 0.05);
    setOpenLetterId(id);
    setReadLetters(r => ({
      ...r,
      [id]: true
    }));
  }
  async function sendMail() {
    const senderEmail = composeEmail.trim();
    const message = composeMsg.trim();
    if (mailSent === "sending") return;
    if (!isValidContactSubmission(senderEmail, message)) {
      setMailSent("invalid");
      return;
    }
    setMailSent("sending");
    try {
      await submitContactForm({ name: composeName, email: senderEmail, message });
      unlockAchievement("message_sent");
      beep(500, 0.05);
      setMailSent("sent");
      setTimeout(() => setMailSent(false), 5000);
      setComposeName("");
      setComposeEmail("");
      setComposeMsg("");
    } catch (error) {
      console.error("Contact form failed:", error);
      setMailSent("error");
    }
  }
  const unreadCount = MAIL_ITEMS.filter(m => !readLetters[m.id]).length;
  function setSelectedProjectId(id) {
    if (id === "__game__" || id === "__vault_game__") {
      unlockAchievement(id === "__vault_game__" ? "vault_raider" : "game_on");
      return;
    }
    setSelectedProjectIdState(id);
    if (id !== null) unlockAchievement("artifact_hunter");
  }
  function setSelectedQuestId(id) {
    setSelectedQuestIdState(id);
    if (id !== null) unlockAchievement("career_lore");
  }
  function setSelectedSkillId(id) {
    setSelectedSkillIdState(id);
    if (id !== null) unlockAchievement("skill_inspector");
  }
  // All child views use these shared values, so the font switch updates the whole UI.
  const pixelFont = readableFont ? "'IBM Plex Mono', 'Courier New', monospace" : "'Silkscreen', 'Courier New', monospace";
  // Keep the original pixel body style; paragraph descriptions opt into a
  // separate readable face inside their individual views.
  const bodyFont = readableFont ? "'IBM Plex Mono', 'Courier New', monospace" : "'Silkscreen', 'Courier New', monospace";

  // Keep the scene boundary readable by grouping values by responsibility.
  const sceneAppearance = {
    T, bodyFont, fontScale, isMobile, isTablet, pixelFont, readableFont,
    themeKey
  };
  const sceneState = {
    active, aiInput, aiMessages, aiOpen, avatarRef, commits, commitsError,
    companion, companionFacing, companionFrame, composeEmail, composeMsg,
    composeName, encounterMsg, hiddenRoomOpen, hiddenRoomUnlocked, konamiActive,
    landingBursts, level, logoSparkle, logoSpin, mailSent, mailTab,
    nameEggShown, openLetterId, readLetters, revealed, selectedProjectId,
    selectedQuestId, selectedSkillId, settingsOpen, showClickEgg, showLevelUp,
    soundOn, unlockedAchievements, unreadCount, xp, xpGain
  };
  const sceneActions = {
    beep, claimQuestXp, handleAvatarClick, handleLogoDoubleClick,
    handleNavClick, localTime, openLetter, sendAiMessage, sendMail, setAiInput,
    setAiOpen, setCompanion, setComposeEmail, setComposeMsg, setComposeName,
    setFontScale, setHiddenRoomOpen, setMailTab, setOpenLetterId,
    setReadableFont, setSelectedProjectId, setSelectedQuestId,
    setSelectedSkillId, setSettingsOpen, setSoundOn, setThemeKey,
    unlockAchievement
  };

  return <div className="pixel-root" style={{
    fontFamily: bodyFont,
    "--copy-font": readableFont ? "'IBM Plex Mono', 'Courier New', monospace" : "'Pixelify Sans', 'Courier New', sans-serif",
    "--ui-font": pixelFont,
    background: T.bg,
    color: T.text,
    minHeight: "100vh",
    width: "100%", maxWidth: "100vw", boxSizing: "border-box",
    display: "flex", flexDirection: "column",
    fontSize: `${14 * fontScale}px`,
    letterSpacing: "0.5px",
    overflowX: "hidden",
    border: `3px solid ${T.border}`,
    position: "relative"
  }}>
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
      <PortfolioScene
        appearance={sceneAppearance}
        state={sceneState}
        actions={sceneActions}
      />

      {achievementToast && <div role="status" aria-live="polite" style={{
        position: "fixed", left: "50%",
        bottom: 24 + [showClickEgg, showLevelUp, encounterMsg, nameEggShown].filter(Boolean).length * 72,
        transform: "translateX(-50%)",
        width: "min(340px, calc(100vw - 36px))", zIndex: 1200,
        display: "flex", alignItems: "center", gap: 12,
        padding: "12px 14px", background: T.panel, color: T.text,
        border: `1px solid ${T.border}`, borderLeft: `3px solid ${T.accent}`,
        boxShadow: `2px 2px 0 ${T.bg}`,
        transition: "bottom 180ms ease"
      }}>
        <PixelIcon name="star" size={18} color={T.accent} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: pixelFont, fontSize: `${9 * fontScale}px` }}>Achievement unlocked</div>
          <div style={{ fontFamily: "var(--copy-font)", fontSize: `${12 * fontScale}px`, color: T.textDim, lineHeight: 1.4, marginTop: 3 }}>
            {achievementToast.label} · +{achievementToast.xp} XP
          </div>
        </div>
      </div>}

    </div>;
}
