import PixelFrame from "./PixelFrame";
import { CURRENT_QUESTS, DEVELOPER_LOADOUT, EDUCATION, PROFILE_MILESTONES, PROFILE_STATS } from "../data/profile";

const GEORGIA_TECH_URL = "https://www.gatech.edu/";

function SectionTitle({ theme, children, fontScale, pixelFont }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
    <div style={{ fontFamily: pixelFont, fontSize: `${11 * fontScale}px`, color: theme.text }}>{children}</div>
  </div>;
}

function StatGrid({ theme, fontScale }) {
  return <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 7 }}>
    {PROFILE_STATS.map(([label, value]) => <div key={label} style={{ padding: "8px 9px", background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
      <div style={{ color: theme.textFaint, fontSize: `${9 * fontScale}px`, marginBottom: 3 }}>{label}</div>
      <div style={{ color: theme.text, fontSize: `${10 * fontScale}px`, lineHeight: 1.4 }}>{value}</div>
    </div>)}
  </div>;
}

export default function CharacterSheet({ theme, fontScale, isMobile, level, pixelFont }) {
  const education = EDUCATION[0];
  const cardGrid = isMobile ? "1fr" : "minmax(0, 1.15fr) minmax(280px, .85fr)";

  return <div style={{ display: "grid", gap: 12, maxWidth: 980, margin: "0 auto" }}>
    <PixelFrame theme={theme} style={{ padding: isMobile ? 14 : 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 12, paddingBottom: 10, borderBottom: `2px dashed ${theme.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div>
            <div style={{ fontFamily: pixelFont, fontSize: `${15 * fontScale}px`, color: theme.text, lineHeight: 1.4 }}>Sunmay Padiyar</div>
            <div style={{ color: theme.textDim, fontSize: `${10 * fontScale}px`, marginTop: 2 }}>Software engineer and CS student</div>
          </div>
        </div>
        <div style={{ flexShrink: 0, padding: "6px 9px", color: theme.accent, background: theme.panelAlt, border: `1px solid ${theme.border}`, fontSize: `${10 * fontScale}px` }}>Level {level}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: cardGrid, gap: 14, alignItems: "start" }}>
        <div>
          <a href={GEORGIA_TECH_URL} target="_blank" rel="noopener noreferrer" title={GEORGIA_TECH_URL} style={{ color: theme.accent, textDecoration: "none", fontSize: `${11 * fontScale}px` }}>Georgia Tech - Computer Science - Class of 2029</a>
          <p style={{ margin: "10px 0 12px", fontFamily: "var(--copy-font)", color: theme.textDim, fontSize: `${13 * fontScale}px`, lineHeight: 1.6 }}>I build software where careful engineering matters: cloud products, full-stack applications, AI evaluation tools, and autonomous robotics. I enjoy turning ambiguous problems into systems that are clear, testable, and useful to real people.</p>
          <StatGrid theme={theme} fontScale={fontScale} />
        </div>

        <div>
          <SectionTitle theme={theme} icon="bolt" fontScale={fontScale} pixelFont={pixelFont}>Current quests</SectionTitle>
          <div style={{ display: "grid", gap: 7 }}>
            {CURRENT_QUESTS.map((quest, index) => <div key={quest} style={{ display: "grid", gridTemplateColumns: "20px minmax(0, 1fr)", alignItems: "center", gap: 7, padding: 8, background: theme.panelAlt, border: `1px solid ${theme.border}`, fontFamily: "var(--copy-font)", color: theme.textDim, fontSize: `${11 * fontScale}px`, lineHeight: 1.45 }}><span style={{ color: theme.accent }}>{index + 1}.</span>{quest}</div>)}
          </div>
        </div>
      </div>
    </PixelFrame>

    <div style={{ display: "grid", gridTemplateColumns: cardGrid, gap: 12 }}>
      <PixelFrame theme={theme} style={{ padding: 14 }}>
        <SectionTitle theme={theme} icon="star" fontScale={fontScale} pixelFont={pixelFont}>Quest history</SectionTitle>
        <div style={{ display: "grid", gap: 7 }}>
          {PROFILE_MILESTONES.map(item => <div key={item} style={{ padding: "8px 10px", background: theme.panelAlt, border: `1px solid ${theme.border}`, fontFamily: "var(--copy-font)", color: theme.textDim, fontSize: `${11 * fontScale}px`, lineHeight: 1.45 }}>{item}</div>)}
        </div>
      </PixelFrame>

      <PixelFrame theme={theme} style={{ padding: 14 }}>
        <SectionTitle theme={theme} icon="user" fontScale={fontScale} pixelFont={pixelFont}>Georgia Tech</SectionTitle>
        <a href={GEORGIA_TECH_URL} target="_blank" rel="noopener noreferrer" title={GEORGIA_TECH_URL} style={{ color: theme.text, textDecoration: "none", fontSize: `${11 * fontScale}px`, lineHeight: 1.45 }}>{education.school}</a>
        <div style={{ color: theme.accent, fontSize: `${10 * fontScale}px`, marginTop: 3 }}>{education.credential}</div>
        <div style={{ color: theme.textFaint, fontSize: `${9 * fontScale}px`, marginTop: 3 }}>{education.dates}</div>
        <p style={{ margin: "8px 0 10px", fontFamily: "var(--copy-font)", color: theme.textDim, fontSize: `${10 * fontScale}px`, lineHeight: 1.5 }}>{education.detail}</p>
        <div style={{ color: theme.textFaint, fontSize: `${9 * fontScale}px`, marginBottom: 3 }}>Activities and communities</div>
        <div style={{ fontFamily: "var(--copy-font)", color: theme.textDim, fontSize: `${10 * fontScale}px`, lineHeight: 1.45 }}>Computing, engineering, research, and builder communities.</div>
      </PixelFrame>
    </div>

    <PixelFrame theme={theme} style={{ padding: 14 }}>
      <SectionTitle theme={theme} icon="gear" fontScale={fontScale} pixelFont={pixelFont}>Developer loadout</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))", gap: 7 }}>
        {DEVELOPER_LOADOUT.map(item => <div key={item.label} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 0, alignItems: "center", padding: 8, background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
          <div><div style={{ color: theme.textFaint, fontSize: `${9 * fontScale}px`, marginBottom: 2 }}>{item.label}</div><div style={{ color: theme.text, fontSize: `${10 * fontScale}px`, lineHeight: 1.4 }}>{item.value}</div></div>
        </div>)}
      </div>
    </PixelFrame>
  </div>;
}