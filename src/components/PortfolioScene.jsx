import TopBar from "./TopBar";
import PortfolioWorkspace from "./PortfolioWorkspace";
import KonamiOverlay from "./KonamiOverlay";
import SkillModal from "./SkillModal";
import ProjectModal from "./ProjectModal";
import ExperienceModal from "./ExperienceModal";
import MailModal from "./MailModal";
import HiddenDungeonModal from "./HiddenDungeonModal";
import PixelSprite from "./PixelSprite";
import ToastNotice from "./ui/ToastNotice";
import { GUILD_QUESTS } from "../data/quests";
import { MAIL_ITEMS } from "../data/mail";
import { PROJECTS } from "../data/projects";
import { SKILL_NODES } from "../data/skills";

/** Owns page-level overlays so content panels stay focused on their own views. */
function PortfolioScene({ appearance, state, actions }) {
  const { theme, fontScale, pixelFont } = appearance;
  const {
    companion, companionFacing, companionFrame, encounterMsg, hiddenRoomOpen,
    konamiActive, landingBursts, nameEggShown, openLetterId, revealed,
    selectedProjectId, selectedQuestId, selectedSkillId, showClickEgg, showLevelUp
  } = state;
  const {
    beep, setCompanion, setHiddenRoomOpen, setOpenLetterId,
    setSelectedProjectId, setSelectedQuestId, setSelectedSkillId
  } = actions;

  // Each active notice gets a predictable lane so transient messages never overlap.
  const toastBottom = (...lowerNotices) => 24 + lowerNotices.filter(Boolean).length * 72;

  return <div style={{
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: "100vh",
    clipPath: revealed ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 50vh, 100% 50vh, 100% 50vh, 0 50vh)",
    WebkitClipPath: revealed ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 50vh, 100% 50vh, 100% 50vh, 0 50vh)",
    transition: "clip-path 850ms cubic-bezier(0.65, 0, 0.35, 1), -webkit-clip-path 850ms cubic-bezier(0.65, 0, 0.35, 1)"
  }}>
    <TopBar {...appearance} {...state} {...actions} />
    <PortfolioWorkspace appearance={appearance} state={state} actions={actions} />

    {konamiActive && <KonamiOverlay theme={theme} fontScale={fontScale} pixelFont={pixelFont} />}

    {showClickEgg && <ToastNotice bottom={toastBottom()} fontScale={fontScale} theme={theme}>
      You clicked me 7 times. Persistent. Hidden Dungeon unlocked.
    </ToastNotice>}
    {showLevelUp && <ToastNotice bottom={toastBottom(showClickEgg)} fontScale={fontScale} theme={theme}>Level up!</ToastNotice>}
    {nameEggShown && <ToastNotice bottom={toastBottom(showClickEgg, showLevelUp, encounterMsg)} fontScale={fontScale} theme={theme}>
      Wait, that&apos;s my name! Hi there.
    </ToastNotice>}

    {selectedSkillId && (() => {
      const skill = SKILL_NODES.find(node => node.id === selectedSkillId);
      return skill ? <SkillModal theme={theme} beep={beep} fontScale={fontScale} node={skill} pixelFont={pixelFont} setSelectedSkillId={setSelectedSkillId} /> : null;
    })()}

    {selectedProjectId !== null && (() => {
      const project = PROJECTS[selectedProjectId];
      return project ? <ProjectModal theme={theme} beep={beep} fontScale={fontScale} project={project} pixelFont={pixelFont} setSelectedProjectId={setSelectedProjectId} /> : null;
    })()}

    {selectedQuestId && (() => {
      const experience = GUILD_QUESTS.find(quest => quest.id === selectedQuestId);
      return experience ? <ExperienceModal theme={theme} beep={beep} fontScale={fontScale} pixelFont={pixelFont} experience={experience} setSelectedQuestId={setSelectedQuestId} /> : null;
    })()}

    {openLetterId && (() => {
      const letter = MAIL_ITEMS.find(message => message.id === openLetterId);
      return letter ? <MailModal theme={theme} beep={beep} fontScale={fontScale} letter={letter} pixelFont={pixelFont} setOpenLetterId={setOpenLetterId} /> : null;
    })()}

    {hiddenRoomOpen && <HiddenDungeonModal theme={theme} beep={beep} fontScale={fontScale} pixelFont={pixelFont} setHiddenRoomOpen={setHiddenRoomOpen} />}

    {companion && <div className="companion-world-sprite" style={{
      position: "fixed", left: companion.x, top: companion.y, zIndex: 997,
      userSelect: "none", display: "flex", flexDirection: "column", alignItems: "center",
      gap: 2, pointerEvents: "none",
      transform: !companion.onGround ? "scale(0.9, 1.12)" : companionFrame === "walk1" || companionFrame === "walk2" ? "translateY(-1px)" : "translateY(0)",
      transformOrigin: "bottom center", transition: "transform 100ms ease"
    }}>
      <PixelSprite frame={companionFrame} size={40} color={theme.accent} facing={companionFacing} />
      <button type="button" onClick={() => { beep(220); setCompanion(null); }} title="Dismiss" aria-label="Dismiss Botmay" style={{
        appearance: "none", cursor: "pointer",
        fontSize: `${9 * fontScale}px`, color: theme.textFaint, background: theme.panel,
        border: `1px solid ${theme.border}`, padding: "1px 4px", fontFamily: pixelFont,
        pointerEvents: "auto"
      }}>dismiss</button>
    </div>}

    {landingBursts.map(burst => <div key={burst.id} style={{
      position: "fixed", left: burst.x - 10, top: burst.y - 6, zIndex: 996,
      width: 20, height: 12, pointerEvents: "none", display: "flex", justifyContent: "space-between"
    }}>
      {[0, 1, 2].map(index => <div key={index} style={{ width: 4, height: 4, background: theme.accent, animation: "dust-pop 350ms ease-out forwards", animationDelay: `${index * 30}ms` }} />)}
    </div>)}
    <style>{`@keyframes dust-pop { 0% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: translateY(-10px) scale(0.4); opacity: 0; } }`}</style>

    {companion && <div className="hint-notice" style={{ top: 72, right: 16, background: theme.panel, borderColor: theme.border, borderLeftColor: theme.accent, boxShadow: `2px 2px 0 ${theme.bg}`, color: theme.textDim, fontSize: `${12 * fontScale}px` }}>
      Arrow keys to move &middot; Up / Space to jump
    </div>}
    {encounterMsg && <ToastNotice bottom={toastBottom(showClickEgg, showLevelUp)} fontScale={fontScale} theme={theme}>{encounterMsg}</ToastNotice>}
  </div>;
}

export default PortfolioScene;
