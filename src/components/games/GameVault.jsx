import { useEffect, useState } from "react";
import PixelFrame from "@/components/ui/PixelFrame";
import PixelIcon from "@/components/ui/PixelIcon";
import PixelSprite from "@/components/ui/PixelSprite";
import CompanionRunGame from "@/components/games/CompanionRunGame";
import { CoreCollectorGame, SkyboundGame } from "@/components/games/ArcadeGames";
import ModalShell from "@/components/ui/ModalShell";

const GAMES = [
  { id: "platformer", title: "Botmay Kingdom", icon: "home", desc: "A Mario-style platform run with double jumps, moving enemies, shards, hazards, and a locked finish portal." },
  { id: "skybound", title: "Skybound", icon: "cloud", desc: "Guide Botmay through an endless gauntlet of shifting gates. One tap can save the run." },
  { id: "core-collector", title: "Core Collector", icon: "bolt", desc: "A fast top-down survival game. Recover energy cores while the system throws increasingly dangerous errors at you." }
];

function VaultDoor({ theme, beep, companion, fontScale, isMobile, pixelFont, setCompanion }) {
  return <div style={{ display: "grid", justifyItems: "center", gap: 12, padding: "20px 12px" }}>
    <div style={{ fontFamily: pixelFont, color: theme.accent, fontSize: `${10 * fontScale}px`, letterSpacing: 1 }}>BOTMAY ARCADE</div>
    <div data-companion-door="arcade" aria-label="Botmay Door" style={{
      position: "relative", width: 118, height: 148, overflow: "hidden",
      borderRadius: "59px 59px 3px 3px", background: theme.panel,
      border: `5px solid ${companion ? theme.accent : theme.border}`,
      boxShadow: companion ? `0 0 0 4px ${theme.bg}, 0 0 24px ${theme.accentDark}` : `0 0 0 4px ${theme.bg}`
    }}>
      <div style={{ position: "absolute", inset: 9, borderRadius: "49px 49px 0 0", border: `3px solid ${companion ? theme.accent : theme.textFaint}`, background: `linear-gradient(90deg, ${theme.accentDark}, ${theme.panelAlt}, ${theme.accentDark})` }}>
        {[28, 55, 82, 109].map(top => <div key={top} style={{ position: "absolute", left: 8, right: 8, top, height: 2, background: theme.border }} />)}
        <div style={{ position: "absolute", right: 10, top: 67, width: 8, height: 8, borderRadius: "50%", background: companion ? theme.accent : theme.textFaint }} />
      </div>
    </div>
    <div style={{ fontFamily: "var(--copy-font)", color: theme.textDim, fontSize: `${12 * fontScale}px`, lineHeight: 1.55, textAlign: "center", maxWidth: 390 }}>
      {companion
        ? "The vault recognizes Botmay. Use the arrow keys to walk Botmay through the door."
        : "The vault only opens for Botmay. Summon Botmay with Up Up Down Down Left Right Left Right B A, then bring Botmay to the door."}
    </div>
    {isMobile && <PixelFrame theme={theme} onClick={() => {
      const door = document.querySelector('[data-companion-door="arcade"]')?.getBoundingClientRect();
      if (!door) return;
      setCompanion({ x: Math.max(4, door.left - 18), y: door.top + 78, vx: 0, vy: 0, onGround: false });
      beep(620, 0.06);
    }} title="Guide Botmay into the Game Vault" style={{ padding: "9px 13px" }}>
      Guide Botmay In
    </PixelFrame>}
  </div>;
}

function DoorTransition({ theme, companion, fontScale, pixelFont }) {
  const [geometry] = useState(() => {
    const door = document.querySelector('[data-companion-door="arcade"]')?.getBoundingClientRect();
    return {
      x: door?.left ?? window.innerWidth / 2 - 59,
      y: door?.top ?? window.innerHeight / 2 - 74,
      sx: companion?.x ?? (door?.left ?? window.innerWidth / 2) - 30,
      sy: companion?.y ?? (door?.bottom ?? window.innerHeight / 2) - 40
    };
  });
  useEffect(() => {
    document.body.classList.add("companion-entering-door");
    return () => document.body.classList.remove("companion-entering-door");
  }, []);
  const dx = geometry.x + 40 - geometry.sx;
  const dy = geometry.y + 92 - geometry.sy;
  return <div aria-label="Entering Game Vault" style={{ position: "fixed", inset: 0, zIndex: 10040, pointerEvents: "none" }}>
    <style>{`
      .companion-entering-door .companion-world-sprite { visibility:hidden; }
      @keyframes arcade-door { 0%,18%{transform:perspective(220px) rotateY(0)} 60%,100%{transform:perspective(220px) rotateY(-84deg)} }
      @keyframes arcade-enter { 0%,18%{transform:translate(0,0) scale(1);opacity:1} 82%{transform:translate(${dx}px,${dy}px) scale(.65);opacity:1} 100%{transform:translate(${dx}px,${dy}px) scale(.15);opacity:0} }
      @keyframes arcade-iris { 0%,68%{opacity:0;clip-path:circle(0 at ${geometry.x + 59}px ${geometry.y + 80}px)} 100%{opacity:1;clip-path:circle(150vmax at ${geometry.x + 59}px ${geometry.y + 80}px)} }
    `}</style>
    <div style={{ position: "fixed", left: geometry.x, top: geometry.y, width: 118, height: 148, overflow: "hidden", borderRadius: "59px 59px 3px 3px", background: theme.accentDark, border: `5px solid ${theme.accent}`, boxShadow: `0 0 28px ${theme.accentDark}` }}>
      <div style={{ position: "absolute", inset: 8, transformOrigin: "left", borderRadius: "49px 49px 0 0", background: theme.panel, border: `3px solid ${theme.accent}`, animation: "arcade-door 1.15s ease-in-out forwards" }} />
    </div>
    <div style={{ position: "fixed", left: geometry.sx, top: geometry.sy, animation: "arcade-enter 1.15s ease-in-out forwards" }}><PixelSprite frame="walk1" size={40} color={theme.accent} facing={dx < 0 ? -1 : 1} /></div>
    <div style={{ position: "fixed", inset: 0, background: theme.bg, animation: "arcade-iris 1.15s ease-in forwards" }} />
    <div style={{ position: "fixed", left: 0, right: 0, bottom: 25, textAlign: "center", color: theme.accent, fontFamily: pixelFont, fontSize: `${11 * fontScale}px` }}>Entering Game Vault...</div>
  </div>;
}

function ArcadeModal({ theme, beep, fontScale, pixelFont, selectedGameId, setSelectedGameId, onClose }) {
  const game = GAMES.find(item => item.id === selectedGameId);

  return <ModalShell ariaLabel="Game Vault" closeLabel="Close Game Vault" onClose={onClose}
    panelStyle={{ width: "min(940px, 98vw)", maxWidth: "min(940px, 98vw)", maxHeight: "96vh", padding: "clamp(12px, 2vw, 22px)" }}
    theme={theme} zIndex={10020}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
      <div>
        <div style={{ fontFamily: pixelFont, color: theme.accent, fontSize: `${12 * fontScale}px` }}>{game?.title || "Botmay Arcade"}</div>
        <div style={{ fontFamily: "var(--copy-font)", color: theme.textDim, fontSize: `${11 * fontScale}px`, marginTop: 5 }}>{game?.desc || "Choose a game. Botmay is the hero in every world."}</div>
      </div>
      {game && <PixelFrame theme={theme} onClick={() => { beep(260); setSelectedGameId(null); }} title="Back to games" style={{ padding: "8px 10px" }}>Back</PixelFrame>}
    </div>
    {!game ? <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: 14 }}>
      {GAMES.map(item => <PixelFrame key={item.id} theme={theme} onClick={() => { beep(460); setSelectedGameId(item.id); }} title={`Play ${item.title}`} style={{ padding: 14, minHeight: 210, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ height: 86, display: "grid", placeItems: "center", background: theme.panelAlt, border: `2px solid ${theme.border}` }}><PixelIcon name={item.icon} size={32} color={theme.accent} /></div>
        <div style={{ fontFamily: pixelFont, color: theme.text, fontSize: `${10 * fontScale}px` }}>{item.title}</div>
        <div style={{ fontFamily: "var(--copy-font)", color: theme.textDim, fontSize: `${11 * fontScale}px`, lineHeight: 1.5 }}>{item.desc}</div>
        <div style={{ color: theme.accent, marginTop: "auto", fontSize: `${10 * fontScale}px` }}>Play -&gt;</div>
      </PixelFrame>)}
    </div> : <div key={game.id}>
      {game.id === "platformer" && <CompanionRunGame theme={theme} beep={beep} fontScale={fontScale} />}
      {game.id === "skybound" && <SkyboundGame theme={theme} beep={beep} fontScale={fontScale} />}
      {game.id === "core-collector" && <CoreCollectorGame theme={theme} beep={beep} fontScale={fontScale} />}
    </div>}
  </ModalShell>;
}

export default function GameVault({ theme, beep, companion, enteredGameDoor, fontScale, isMobile, pixelFont, setCompanion }) {
  const [dismissedEntryId, setDismissedEntryId] = useState(null);
  const [readyEntryId, setReadyEntryId] = useState(null);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const entryActive = enteredGameDoor?.id === "arcade" && dismissedEntryId !== enteredGameDoor.entryId;
  useEffect(() => {
    if (!entryActive) return;
    const id = enteredGameDoor.entryId;
    const timer = setTimeout(() => setReadyEntryId(id), 1200);
    return () => clearTimeout(timer);
  }, [enteredGameDoor?.entryId, entryActive]);
  const close = () => {
    setSelectedGameId(null);
    setDismissedEntryId(enteredGameDoor?.entryId ?? null);
    beep(220, 0.04);
  };
  return <div>
    <PixelFrame theme={theme} style={{ padding: 14, borderStyle: "dashed" }}><VaultDoor theme={theme} beep={beep} companion={companion} fontScale={fontScale} isMobile={isMobile} pixelFont={pixelFont} setCompanion={setCompanion} /></PixelFrame>
    {entryActive && readyEntryId !== enteredGameDoor.entryId && <DoorTransition theme={theme} companion={companion} fontScale={fontScale} pixelFont={pixelFont} />}
    {entryActive && readyEntryId === enteredGameDoor.entryId && <ArcadeModal theme={theme} beep={beep} fontScale={fontScale} pixelFont={pixelFont} selectedGameId={selectedGameId} setSelectedGameId={setSelectedGameId} onClose={close} />}
  </div>;
}
