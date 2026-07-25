import ModalShell from "@/components/ui/ModalShell";
import AccentList from "@/components/ui/AccentList";
import { SKILL_NODES } from "@/data/skills";

/** Explains how a skill was earned while preserving the tree accent system. */
function SkillModal({ theme, beep, fontScale, node, pixelFont, setSelectedSkillId }) {
  const closeModal = () => {
    beep(220);
    setSelectedSkillId(null);
  };
  const requiredSkills = node.requires
    .map(requiredId => SKILL_NODES.find(skill => skill.id === requiredId)?.label.replace("\n", " "))
    .filter(Boolean);

  return <ModalShell ariaLabel={`${node.label.replace("\n", " ")} skill details`} closeLabel="Close skill details" onClose={closeModal} panelStyle={{ maxWidth: 440 }} theme={theme}>
    <div className="modal-heading">
      <div>
        <div style={{ fontFamily: pixelFont, fontSize: `${12 * fontScale}px`, lineHeight: 1.6, color: theme.text }}>{node.label.replace("\n", " ")}</div>
      </div>
    </div>
    <p className="modal-description" style={{ color: theme.text, fontSize: `${13 * fontScale}px` }}>{node.desc}</p>
    <div className="modal-section-label" style={{ color: theme.textDim, fontFamily: pixelFont, fontSize: `${10 * fontScale}px` }}>Where this was earned</div>
    <AccentList items={node.experiences || []} theme={theme} fontScale={fontScale} />
    {requiredSkills.length > 0 && <div className="modal-meta" style={{ color: theme.textFaint, fontSize: `${10 * fontScale}px` }}>Requires: {requiredSkills.join(", ")}</div>}
  </ModalShell>;
}

export default SkillModal;
