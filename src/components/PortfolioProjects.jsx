import GalleryImage from "./GalleryImage";
import PixelFrame from "./PixelFrame";
import PixelIcon from "./PixelIcon";
import { PROJECTS } from "../data/projects";

function ProjectImage({ image, label, theme }) {
  if (image) return <GalleryImage image={image} theme={theme} />;

  return <div style={{
    height: 150,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    color: theme.textFaint,
    background: theme.panelAlt,
    border: `1px solid ${theme.border}`
  }}>
    <PixelIcon name="monitor" size={20} color={theme.textFaint} />
    <span style={{ fontFamily: "var(--copy-font)", fontSize: 12 }}>{label}</span>
  </div>;
}

export default function PortfolioProjects({
  theme,
  beep,
  fontScale,
  isMobile,
  isTablet,
  pixelFont,
  setSelectedProjectId
}) {
  const copyFont = "var(--copy-font)";
  const uiFont = "var(--ui-font)";

  return <div style={{ position: "relative" }}>
    <div style={{
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))",
      gap: 16
    }}>
      {PROJECTS.map((project, index) => <PixelFrame
        key={project.title}
        theme={theme}
        onClick={() => { setSelectedProjectId(index); beep(340); }}
        title={`Open ${project.title}`}
        style={{ padding: 12, display: "flex", flexDirection: "column", gap: 11, height: "100%" }}
      >
        <ProjectImage image={project.images?.[0]} label="Project image" theme={theme} />
        <div style={{ fontFamily: pixelFont, fontSize: `${11 * fontScale}px`, color: theme.text, lineHeight: 1.45 }}>{project.title}</div>
        <div style={{ fontFamily: copyFont, fontSize: `${13 * fontScale}px`, color: theme.textDim, lineHeight: 1.55 }}>{project.desc}</div>
        <div style={{ marginTop: "auto", display: "grid", gap: 8 }}>
          <div style={{ fontFamily: uiFont, fontSize: `${10 * fontScale}px`, color: theme.textFaint }}>{project.tags}</div>
          <div style={{ fontFamily: uiFont, fontSize: `${10 * fontScale}px`, color: theme.accent }}>View project</div>
        </div>
      </PixelFrame>)}
    </div>
  </div>;
}
