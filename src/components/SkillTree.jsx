import PixelFrame from "./PixelFrame";
import PixelIcon from "./PixelIcon";
import { SKILL_NODES } from "../data/skills";

function SkillTree({
  T,
  beep,
  fontScale,
  isMobile,
  pixelFont,
  setSelectedSkillId
}) {
  const core = SKILL_NODES.find(node => node.branch === "core");
  const branchAngles = { code: 225, design: 315, robotics: 45, experience: 135 };
  const branchColors = {
    code: "#62c98b",
    design: "#b08cff",
    robotics: "#e3a34d",
    experience: "#62a9df"
  };
  const nodeById = Object.fromEntries(SKILL_NODES.map(node => [node.id, node]));
  const depthOf = node => node.requires.length ? 1 + depthOf(nodeById[node.requires[0]]) : 0;

  // Mobile uses a tall elliptical tree: it stays radial while giving each level
  // enough vertical room for readable, tappable nodes.
  const canvas = isMobile
    ? { width: 360, height: 620, cx: 180, cy: 300, radiusX: 155, radiusY: 260 }
    : { width: 1000, height: 500, cx: 500, cy: 240, radiusX: 460, radiusY: 210 };
  const positionOf = node => {
    if (node.branch === "core") return { x: canvas.cx, y: canvas.cy };
    const level = depthOf(node);
    const angle = branchAngles[node.branch] * Math.PI / 180;
    const distance = 0.42 + (level - 1) * 0.29;
    return {
      x: canvas.cx + Math.cos(angle) * canvas.radiusX * distance,
      y: canvas.cy + Math.sin(angle) * canvas.radiusY * distance
    };
  };

  const nodes = SKILL_NODES.map(node => ({ ...node, level: depthOf(node), position: positionOf(node) }));
  const positionedById = Object.fromEntries(nodes.map(node => [node.id, node]));
  const edges = nodes.filter(node => node.requires.length).map(node => ({
    from: positionedById[node.requires[0]],
    to: node
  }));

  return <div style={{ position: "relative" }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontFamily: pixelFont, fontSize: `${13 * fontScale}px`, color: T.text }}>Skill tree</div>
          </div>

          <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: 6,
      color: T.textDim,
      fontSize: `${10 * fontScale}px`,
      marginBottom: 8
    }}>
            {Object.keys(branchAngles).map(branch => <div key={branch} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 7, height: 7, background: branchColors[branch] }} />
              {branch.charAt(0).toUpperCase() + branch.slice(1)} branch
            </div>)}
          </div>

          <div style={{
      position: "relative",
      width: "100%",
      height: canvas.height,
      overflow: "hidden"
    }}>
            <svg viewBox={`0 0 ${canvas.width} ${canvas.height}`} preserveAspectRatio="none" style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none"
      }}>
              <defs>
                {Object.entries(branchColors).map(([branch, color]) => <marker key={branch} id={`skill-arrow-${branch}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="10" markerHeight="10" orient="auto" markerUnits="userSpaceOnUse">
                  <path d="M 0 0 L 10 5 L 0 10 Z" fill={color} />
                </marker>)}
              </defs>
              {edges.map((edge, index) => <line
          key={index}
          x1={edge.from.position.x}
          y1={edge.from.position.y}
          x2={edge.to.position.x}
          y2={edge.to.position.y}
          stroke={branchColors[edge.to.branch]}
          strokeWidth={3}
          strokeLinecap="round"
          markerEnd={`url(#skill-arrow-${edge.to.branch})`}
          vectorEffect="non-scaling-stroke"
        />)}
              <circle cx={canvas.cx} cy={canvas.cy} r={isMobile ? 34 : 52} fill="none" stroke={T.accentDark} strokeWidth={2} opacity={0.55} />
            </svg>

            {nodes.map(node => {
      const isCore = node.id === core.id;
      const nodeColor = isCore ? T.accent : branchColors[node.branch];
      const width = isCore ? (isMobile ? 82 : 126) : (isMobile ? 64 : 108);
      return <PixelFrame key={node.id} theme={T} onClick={() => {
        setSelectedSkillId(node.id);
        beep(isCore ? 360 : 340, 0.04);
      }} title="Skill" style={{
        position: "absolute",
        left: `${node.position.x / canvas.width * 100}%`,
        top: node.position.y,
        transform: "translate(-50%, -50%)",
        width,
        minHeight: isMobile ? 54 : 64,
        padding: isMobile ? "6px 4px" : "8px 6px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        background: isCore ? T.accent : T.panel,
        border: `2px solid ${nodeColor}`,
        zIndex: isCore ? 2 : 1
      }}>
                <span style={{
          color: isCore ? T.bg : T.textFaint,
          fontSize: `${(isMobile ? 8 : 9) * fontScale}px`
        }}>{isCore ? "Core" : `Level ${node.level}`}</span>
                <PixelIcon name={node.icon} size={isCore ? 16 : 12} color={isCore ? T.bg : nodeColor} />
                <span style={{
          color: isCore ? T.bg : T.text,
          fontSize: `${(isMobile ? 8 : 9) * fontScale}px`,
          lineHeight: 1.25,
          textAlign: "center",
          whiteSpace: "pre-line",
          overflowWrap: "anywhere"
        }}>{node.label}</span>
              </PixelFrame>;
    })}
          </div>

        </div>;
}

export default SkillTree;
