import PixelFrame from "./PixelFrame";
import PixelIcon from "./PixelIcon";

const GEORGIA_TECH_URL = "https://www.gatech.edu/";

function GeorgiaTechLink({ children }) {
  return <a
    href={GEORGIA_TECH_URL}
    target="_blank"
    rel="noopener noreferrer"
    title={GEORGIA_TECH_URL}
    aria-label={`${children} — ${GEORGIA_TECH_URL}`}
    style={{ color: "inherit", textDecoration: "none" }}
  >{children}</a>;
}

function CharacterSheet({ T, fontScale, isMobile, pixelFont }) {
  // Replace these slots with the exact Georgia Tech organizations when ready.
  const activities = [
    "Add Georgia Tech activity",
    "Add Georgia Tech society",
    "Add leadership or team role"
  ];
  const loadout = [
    { icon: "monitor", label: "Frontend", value: "React" },
    { icon: "sword", label: "Languages", value: "Python + Java" },
    { icon: "gear", label: "Systems", value: "Embedded hardware" },
    { icon: "github", label: "Proof", value: "GitHub projects" }
  ];
  // A compact recruiter-friendly summary, presented as character attributes.
  const profile = [
    ["Class", "Student developer"],
    ["Education", "Georgia Tech · 2029"],
    ["Specialty", "Software + robotics"],
    ["Interests", "Web, AI, and embedded systems"],
    ["Playstyle", "Curious, practical, detail-focused"],
    ["Open to", "Internships and collaborations"]
  ];
  const copyFont = "var(--copy-font)";
  return <div style={{ display: "grid", gap: 12 }}>
    <PixelFrame theme={T} style={{ padding: isMobile ? 14 : 16 }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        gap: 10, marginBottom: 12, paddingBottom: 10,
        borderBottom: `2px dashed ${T.border}`
      }}>
        <div style={{ fontFamily: pixelFont, fontSize: `${12 * fontScale}px`, color: T.accent }}>Character sheet</div>
        <div style={{ fontSize: `${10 * fontScale}px`, color: T.textDim }}>Level 12</div>
      </div>

      <div style={{ fontFamily: pixelFont, fontSize: `${14 * fontScale}px`, color: T.text }}>Sunmay Padiyar</div>
      <div style={{ color: T.accent, fontSize: `${11 * fontScale}px`, marginTop: 4, marginBottom: 12 }}>
        <GeorgiaTechLink>Georgia Tech · Class of 2029</GeorgiaTechLink>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(2, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))",
        gap: 8,
        marginBottom: 12
      }}>
        {profile.map(([label, value]) => <div key={label} style={{ padding: 10, background: T.panelAlt, border: `1px solid ${T.border}` }}>
          <div style={{ color: T.textFaint, fontSize: `${9 * fontScale}px`, marginBottom: 4 }}>{label}</div>
          <div style={{ color: T.text, fontSize: `${10 * fontScale}px`, lineHeight: 1.4 }}>{value}</div>
        </div>)}
      </div>

      <div style={{ fontFamily: copyFont, color: T.textDim, fontSize: `${13 * fontScale}px`, lineHeight: 1.5 }}>
        I&apos;m a <GeorgiaTechLink>Georgia Tech</GeorgiaTechLink> student who likes working where software meets the physical world. I build practical web, robotics, and embedded projects, learn by shipping, and enjoy debugging difficult systems. I care about useful products, clean details, and collaborating with teams that take pride in their work.
      </div>
    </PixelFrame>

    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) minmax(0, 1.35fr)", gap: 12 }}>
      <PixelFrame theme={T} style={{ padding: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <PixelIcon name="user" size={14} color={T.accent} />
          <div style={{ fontFamily: pixelFont, fontSize: `${11 * fontScale}px`, color: T.text }}>Activities & societies</div>
        </div>
        <div style={{ display: "grid", gap: 7 }}>
          {activities.map(activity => <div key={activity} style={{
            padding: "8px 10px", background: T.panelAlt, border: `1px solid ${T.border}`,
            color: T.textDim, fontSize: `${10 * fontScale}px`
          }}><GeorgiaTechLink>{activity}</GeorgiaTechLink></div>)}
        </div>
      </PixelFrame>

      <PixelFrame theme={T} style={{ padding: 14 }}>
        <div style={{ fontFamily: pixelFont, fontSize: `${11 * fontScale}px`, color: T.text, marginBottom: 10 }}>Developer loadout</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 }}>
          {loadout.map(entry => <div key={entry.label} style={{
            display: "grid", gridTemplateColumns: "18px minmax(0, 1fr)", gap: 8,
            alignItems: "center", padding: 9, background: T.panelAlt, border: `1px solid ${T.border}`
          }}>
            <PixelIcon name={entry.icon} size={15} color={T.accent} />
            <div>
              <div style={{ color: T.textFaint, fontSize: `${9 * fontScale}px`, marginBottom: 4 }}>{entry.label}</div>
              <div style={{ color: T.text, fontSize: `${10 * fontScale}px`, lineHeight: 1.35 }}>{entry.value}</div>
            </div>
          </div>)}
        </div>
      </PixelFrame>
    </div>
  </div>;
}

export default CharacterSheet;
