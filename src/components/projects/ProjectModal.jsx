import MediaGallery from "@/components/ui/media/MediaGallery";
import ModalShell from "@/components/ui/ModalShell";
import AccentList from "@/components/ui/AccentList";

/** Displays project context without duplicating modal dismissal or gallery behavior. */
function ProjectModal({ theme, beep, fontScale, project, pixelFont, setSelectedProjectId }) {
  const closeModal = () => {
    beep(220);
    setSelectedProjectId(null);
  };

  return <ModalShell ariaLabel={`${project.title} project details`} closeLabel="Close project details" onClose={closeModal} panelStyle={{ maxWidth: 780 }} theme={theme}>
    <div className="modal-heading">
      <div>
        <div style={{ fontFamily: pixelFont, fontSize: `${12 * fontScale}px`, lineHeight: 1.6, color: theme.text }}>{project.title}</div>
        <div style={{ fontSize: `${10 * fontScale}px`, color: theme.accent }}>{project.role} &middot; {project.year}</div>
      </div>
    </div>

    <MediaGallery items={project.images} label="Project images" beep={beep} theme={theme} fontScale={fontScale} pixelFont={pixelFont} />
    <p className="modal-description" style={{ color: theme.text, fontSize: `${13 * fontScale}px` }}>{project.desc}</p>
    <div className="modal-section-label" style={{ color: theme.textDim, fontFamily: pixelFont, fontSize: `${10 * fontScale}px` }}>Highlights</div>
    <AccentList items={project.highlights || []} theme={theme} fontScale={fontScale} />
    <div className="modal-meta" style={{ color: theme.textFaint, fontSize: `${10 * fontScale}px` }}>{project.tags}</div>
  </ModalShell>;
}

export default ProjectModal;
