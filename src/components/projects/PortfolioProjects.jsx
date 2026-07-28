import GalleryImage from "@/components/ui/media/GalleryImage";
import PixelFrame from "@/components/ui/PixelFrame";
import PixelIcon from "@/components/ui/PixelIcon";
import { PROJECTS } from "@/data/projects";

function ProjectImage({ fontScale, image, label, theme }) {
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
    <span style={{ fontFamily: "var(--copy-font)", fontSize: `${12 * fontScale}px` }}>{label}</span>
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
        style={{
          padding: 12,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          height: "100%",
          background: theme.panel
        }}
      >
        <div style={{
          padding: 5,
          background: theme.panelAlt,
          border: `1px solid ${theme.border}`
        }}>
          <ProjectImage fontScale={fontScale} image={project.images?.[0]} label="Project image" theme={theme} />
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ fontFamily: pixelFont, fontSize: `${11 * fontScale}px`, color: theme.text, lineHeight: 1.45 }}>{project.title}</div>
          <div style={{ fontFamily: uiFont, fontSize: `${9 * fontScale}px`, color: theme.textFaint, lineHeight: 1.35 }}>{project.role}</div>
        </div>
        <div style={{ fontFamily: copyFont, fontSize: `${13 * fontScale}px`, color: theme.textDim, lineHeight: 1.55 }}>{project.desc}</div>
        <div style={{ marginTop: "auto", display: "grid", gap: 8, paddingTop: 2 }}>
          <div style={{
            minHeight: `${28 * fontScale}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            textAlign: "center",
            fontFamily: uiFont,
            fontSize: `${10 * fontScale}px`,
            color: theme.textFaint,
            lineHeight: 1.4
          }}>{project.tags}</div>
          <div style={{
            fontFamily: uiFont,
            fontSize: `${10 * fontScale}px`,
            color: theme.accent
          }}>View project</div>
        </div>
      </PixelFrame>)}
    </div>
  </div>;
}
