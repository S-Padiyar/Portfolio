import { useState } from "react";

const GAMES = [
  { title: "First Quest", desc: "Add a short description of the game, its controls, and what you built.", locked: false },
  { title: "Boss Build", desc: "Add a short description of the gameplay loop and technical work.", locked: false },
  { title: "Companion Vault", desc: "A hidden game area that only opens when the playable companion is active.", locked: true }
];

function ImageSlot({ label, PixelIcon, T, height = 150 }) {
  return <div style={{
    height,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    color: T.textFaint,
    background: T.panelAlt,
    border: `1px solid ${T.border}`
  }}>
    <PixelIcon name="monitor" size={20} color={T.textFaint} />
    <span style={{ fontFamily: "var(--copy-font)", fontSize: 12 }}>{label}</span>
  </div>;
}

export default function PortfolioProjects({
  PROJECTS,
  PixelFrame,
  PixelIcon,
  T,
  beep,
  companion,
  fontScale,
  isMobile,
  isTablet,
  pixelFont,
  setSelectedProjectId
}) {
  const [section, setSection] = useState("projects");
  const [openGame, setOpenGame] = useState(null);
  const copyFont = "var(--copy-font)";
  const uiFont = "var(--ui-font)";

  return <div style={{ position: "relative" }}>
    <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
      {[
        { id: "projects", label: "Artifacts", icon: "monitor" },
        { id: "games", label: "Game Vault", icon: "gamepad" }
      ].map(tab => <PixelFrame
        key={tab.id}
        theme={T}
        active={section === tab.id}
        onClick={() => { setSection(tab.id); setOpenGame(null); beep(320, 0.03); }}
        title={tab.label}
        style={{
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: pixelFont,
          fontSize: `${10 * fontScale}px`,
          color: section === tab.id ? T.bg : T.text
        }}
      >
        <PixelIcon name={tab.icon} size={12} color={section === tab.id ? T.bg : T.accent} />
        <span>{tab.label}</span>
      </PixelFrame>)}
    </div>

    {section === "projects" ? <div style={{
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))",
      gap: 16
    }}>
      {PROJECTS.map((project, index) => <PixelFrame
        key={project.title}
        theme={T}
        onClick={() => { setSelectedProjectId(index); beep(340); }}
        title="Project"
        style={{ padding: 12, display: "flex", flexDirection: "column", gap: 11, height: "100%" }}
      >
        <ImageSlot label="Add project image" PixelIcon={PixelIcon} T={T} />
        <div style={{ fontFamily: pixelFont, fontSize: `${11 * fontScale}px`, color: T.text, lineHeight: 1.45 }}>{project.title}</div>
        <div style={{ fontFamily: copyFont, fontSize: `${13 * fontScale}px`, color: T.textDim, lineHeight: 1.55 }}>{project.desc}</div>
        <div style={{ fontFamily: uiFont, fontSize: `${10 * fontScale}px`, color: T.textFaint }}>{project.tags}</div>
        <div style={{ fontFamily: uiFont, fontSize: `${10 * fontScale}px`, color: T.accent, marginTop: "auto" }}>View project →</div>
      </PixelFrame>)}
    </div> : <div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))", gap: 14 }}>
        {GAMES.map(game => {
          const accessible = !game.locked || !!companion;
          return <PixelFrame
            key={game.title}
            theme={T}
            onClick={() => {
              if (!accessible) {
                beep(180, 0.05);
                return;
              }
              setOpenGame(game.title);
              setSelectedProjectId(game.locked ? "__vault_game__" : "__game__");
              beep(420, 0.04);
            }}
            title={accessible ? "Game" : "Locked"}
            style={{ padding: 12, opacity: accessible ? 1 : 0.58 }}
          >
            <ImageSlot label="Add game image" PixelIcon={PixelIcon} T={T} height={120} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 11 }}>
              <PixelIcon name={game.locked ? "shield" : "gamepad"} size={15} color={T.accent} />
              <div style={{ fontFamily: pixelFont, fontSize: `${10 * fontScale}px`, color: T.text }}>{game.title}</div>
            </div>
            <div style={{ fontFamily: copyFont, color: T.textDim, fontSize: `${12 * fontScale}px`, lineHeight: 1.55, marginTop: 10 }}>{game.desc}</div>
            {game.locked && <div style={{ fontFamily: uiFont, color: T.textFaint, fontSize: `${10 * fontScale}px`, marginTop: 10 }}>
              {companion ? "Companion present — enter door" : "Locked — bring the companion"}
            </div>}
          </PixelFrame>;
        })}
      </div>
      {openGame && <PixelFrame theme={T} style={{ marginTop: 14, padding: 14, borderStyle: "dashed" }}>
        <div style={{ fontFamily: pixelFont, fontSize: `${10 * fontScale}px`, color: T.text, marginBottom: 8 }}>{openGame}</div>
        <div style={{ fontFamily: copyFont, fontSize: `${9 * fontScale}px`, color: T.textDim }}>Game launch area. Replace this panel with the finished game embed.</div>
      </PixelFrame>}
    </div>}
  </div>;
}
