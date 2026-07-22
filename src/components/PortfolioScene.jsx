import TopBar from "./TopBar";
import PortfolioWorkspace from "./PortfolioWorkspace";
import KonamiOverlay from "./KonamiOverlay";
import SkillModal from "./SkillModal";
import ProjectModal from "./ProjectModal";
import ExperienceModal from "./ExperienceModal";
import MailModal from "./MailModal";
import HiddenDungeonModal from "./HiddenDungeonModal";
import PixelSprite from "./PixelSprite";
import { GUILD_QUESTS } from "../data/quests";
import { MAIL_ITEMS } from "../data/mail";
import { PROJECTS } from "../data/projects";
import { SKILL_NODES } from "../data/skills";

function PortfolioScene({ appearance, state, actions }) {
  const {
    T, fontScale, pixelFont
  } = appearance;
  const {
    companion, companionFacing, companionFrame, encounterMsg, hiddenRoomOpen,
    konamiActive, landingBursts, nameEggShown, openLetterId, revealed,
    selectedProjectId, selectedQuestId, selectedSkillId, showClickEgg,
    showLevelUp
  } = state;
  const {
    beep, setCompanion, setHiddenRoomOpen, setOpenLetterId,
    setSelectedProjectId, setSelectedQuestId, setSelectedSkillId
  } = actions;
  // Bottom notifications occupy deterministic lanes so simultaneous events
  // never cover one another, including on narrow screens.
  const toastBottom = (...lowerToasts) => 24 + lowerToasts.filter(Boolean).length * 72;
  return <div style={{
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: "100vh",
    clipPath: revealed
      ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
      : "polygon(0 50vh, 100% 50vh, 100% 50vh, 0 50vh)",
    WebkitClipPath: revealed
      ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
      : "polygon(0 50vh, 100% 50vh, 100% 50vh, 0 50vh)",
    transition: "clip-path 850ms cubic-bezier(0.65, 0, 0.35, 1), -webkit-clip-path 850ms cubic-bezier(0.65, 0, 0.35, 1)"
  }}>

      {/* Top bar */}
      <TopBar
        {...appearance}
        {...state}
        {...actions}
      />
      <PortfolioWorkspace
        appearance={appearance}
        state={state}
        actions={actions}
      />

      {/* Konami code overlay */}
      {konamiActive && <KonamiOverlay T={T} fontScale={fontScale} pixelFont={pixelFont} />}

      {/* Avatar click-counter easter egg */}
      {showClickEgg && <div style={{
      position: "fixed",
      bottom: toastBottom(),
      left: "50%",
      transform: "translateX(-50%)",
      background: T.panel,
      border: `1px solid ${T.border}`,
      borderLeft: `3px solid ${T.accent}`,
      boxShadow: `2px 2px 0 ${T.bg}`,
      padding: "10px 16px",
      fontFamily: "var(--copy-font)",
      fontSize: `${12 * fontScale}px`,
      color: T.text,
      zIndex: 999
    }}>
          You clicked me 7 times. Persistent. Hidden Dungeon unlocked.
        </div>}

      {/* Level-up easter egg */}
      {showLevelUp && <div style={{
      position: "fixed",
      bottom: toastBottom(showClickEgg),
      left: "50%",
      transform: "translateX(-50%)",
      background: T.panel,
      color: T.text,
      border: `1px solid ${T.border}`,
      borderLeft: `3px solid ${T.accent}`,
      boxShadow: `2px 2px 0 ${T.bg}`,
      padding: "10px 16px",
      fontFamily: "var(--copy-font)",
      fontSize: `${12 * fontScale}px`,
      zIndex: 999
    }}>
          Level up!
        </div>}


      {/* Typed-name easter egg */}
      {nameEggShown && <div style={{
      position: "fixed",
      bottom: toastBottom(showClickEgg, showLevelUp, encounterMsg),
      left: "50%",
      transform: "translateX(-50%)",
      background: T.panel,
      border: `1px solid ${T.border}`,
      borderLeft: `3px solid ${T.accent}`,
      boxShadow: `2px 2px 0 ${T.bg}`,
      padding: "10px 16px",
      fontFamily: "var(--copy-font)",
      fontSize: `${12 * fontScale}px`,
      color: T.text,
      zIndex: 999
    }}>
          Wait, that's my name! Hi there 👋
        </div>}

      {/* Skill node detail modal */}
      {selectedSkillId && (() => {
      const node = SKILL_NODES.find(n => n.id === selectedSkillId);
      if (!node) return null;
      return <SkillModal T={T} beep={beep} fontScale={fontScale} node={node} pixelFont={pixelFont} setSelectedSkillId={setSelectedSkillId} />;
    })()}

      {/* Trophy Case project detail modal */}
      {selectedProjectId !== null && (() => {
      const p = PROJECTS[selectedProjectId];
      if (!p) return null;
      return <ProjectModal T={T} beep={beep} fontScale={fontScale} p={p} pixelFont={pixelFont} setSelectedProjectId={setSelectedProjectId} />;
    })()}

      {/* Guild Hall quest detail modal */}
      {selectedQuestId && (() => {
      const q = GUILD_QUESTS.find(x => x.id === selectedQuestId);
      if (!q) return null;
      return <ExperienceModal T={T} beep={beep} fontScale={fontScale} pixelFont={pixelFont} q={q} setSelectedQuestId={setSelectedQuestId} />;
    })()}

      {/* Opened letter modal */}
      {openLetterId && (() => {
      const letter = MAIL_ITEMS.find(m => m.id === openLetterId);
      if (!letter) return null;
      return <MailModal T={T} beep={beep} fontScale={fontScale} letter={letter} pixelFont={pixelFont} setOpenLetterId={setOpenLetterId} />;
    })()}

      {/* Hidden room modal */}
      {hiddenRoomOpen && <HiddenDungeonModal T={T} beep={beep} fontScale={fontScale} pixelFont={pixelFont} setHiddenRoomOpen={setHiddenRoomOpen} />}

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
          <button type="button" onClick={() => { beep(220); setCompanion(null); }} title="Dismiss" aria-label="Dismiss companion" style={{
        appearance: "none",
        fontSize: `${9 * fontScale}px`,
        color: T.textFaint,
        background: T.panel,
        border: `1px solid ${T.border}`,
        padding: "1px 4px",
        cursor: "pointer",
        pointerEvents: "auto"
      }}>
            dismiss
          </button>
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
      top: 72,
      right: 16,
      background: T.panel,
      border: `1px solid ${T.border}`,
      borderLeft: `3px solid ${T.accent}`,
      boxShadow: `2px 2px 0 ${T.bg}`,
      padding: "10px 16px",
      fontFamily: "var(--copy-font)",
      fontSize: `${12 * fontScale}px`,
      color: T.textDim,
      letterSpacing: "0.5px",
      zIndex: 996
    }}>
          Arrow keys to move &middot; Up / Space to jump
        </div>}

      {/* Companion encounter toast */}
      {encounterMsg && <div style={{
      position: "fixed",
      bottom: toastBottom(showClickEgg, showLevelUp),
      left: "50%",
      transform: "translateX(-50%)",
      background: T.panel,
      border: `1px solid ${T.border}`,
      borderLeft: `3px solid ${T.accent}`,
      boxShadow: `2px 2px 0 ${T.bg}`,
      padding: "10px 16px",
      fontFamily: "var(--copy-font)",
      fontSize: `${12 * fontScale}px`,
      color: T.text,
      zIndex: 999,
      maxWidth: 320,
      textAlign: "center"
    }}>
          {encounterMsg}
        </div>}

      </div>;
}
export default PortfolioScene;
