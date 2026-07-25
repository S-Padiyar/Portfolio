import PixelFrame from "@/components/ui/PixelFrame";
import { AVATAR_IMAGES } from "@/data/images";
import { DEVELOPER_LOADOUT, EDUCATION, EMPLOYER_VALUE, PROFILE_MILESTONES, PROFILE_STATS } from "@/data/profile";

const GEORGIA_TECH_URL = "https://www.gatech.edu/";

function SheetLabel({ children, fontScale, pixelFont, theme }) {
  return <div style={{
    fontFamily: pixelFont,
    fontSize: `${10 * fontScale}px`,
    color: theme.accent,
    lineHeight: 1.2,
    marginBottom: 7
  }}>{children}</div>;
}

function StatBar({ label, value, fontScale, theme }) {
  return <div>
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, color: theme.textDim, fontSize: `${9 * fontScale}px`, lineHeight: 1.25, marginBottom: 3 }}>
      <span>{label}</span>
      <span style={{ color: theme.accent }}>{value}</span>
    </div>
    <div style={{ height: 8, background: theme.bg, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
      <div style={{ width: value, height: "100%", background: theme.accent }} />
    </div>
  </div>;
}

function InfoTile({ label, value, fontScale, theme }) {
  return <div style={{ padding: "7px 8px", background: theme.panelAlt, border: `1px solid ${theme.border}`, textAlign: "center" }}>
    <div style={{ color: theme.textFaint, fontSize: `${8 * fontScale}px`, lineHeight: 1.2, marginBottom: 3 }}>{label}</div>
    <div style={{ color: theme.text, fontSize: `${10 * fontScale}px`, lineHeight: 1.35 }}>{value}</div>
  </div>;
}

function TextRow({ children, fontScale, theme }) {
  return <div style={{
    padding: "7px 9px",
    background: theme.panelAlt,
    border: `1px solid ${theme.border}`,
    color: theme.textDim,
    fontFamily: "var(--copy-font)",
    fontSize: `${11 * fontScale}px`,
    lineHeight: 1.42
  }}>{children}</div>;
}

export default function CharacterSheet({ theme, fontScale, isMobile, level, pixelFont, themeKey = "amber" }) {
  const education = EDUCATION[0];
  const avatarSrc = AVATAR_IMAGES[themeKey] || AVATAR_IMAGES.amber;
  const stats = [
    ["Software", "92%"],
    ["Cloud", "84%"],
    ["AI Research", "86%"],
    ["Robotics", "90%"]
  ];

  return <div style={{ maxWidth: 880, margin: "0 auto" }}>
    <PixelFrame theme={theme} style={{ padding: isMobile ? 14 : 16 }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "220px minmax(0, 1fr)",
        gap: 16,
        alignItems: "stretch"
      }}>
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{
            padding: 10,
            background: theme.panelAlt,
            border: `2px solid ${theme.border}`,
            display: "grid",
            justifyItems: "center",
            gap: 8
          }}>
            <div style={{
              width: 132,
              height: 132,
              display: "grid",
              placeItems: "center",
              background: theme.bg,
              border: `2px solid ${theme.accent}`,
              overflow: "hidden"
            }}>
              <img src={avatarSrc} alt="Pixel avatar of Sunmay" draggable={false} style={{
                width: "118%",
                height: "118%",
                objectFit: "contain",
                objectPosition: "center bottom",
                imageRendering: "pixelated",
                transform: "translateY(4px)"
              }} />
            </div>
            <div style={{ fontFamily: pixelFont, color: theme.text, fontSize: `${14 * fontScale}px`, lineHeight: 1.2, textAlign: "center" }}>Sunmay Padiyar</div>
            <div style={{ color: theme.accent, fontSize: `${10 * fontScale}px`, lineHeight: 1.3, textAlign: "center" }}>Builder Class</div>
            <div style={{ color: theme.textDim, fontSize: `${9 * fontScale}px`, lineHeight: 1.35, textAlign: "center" }}>Software engineer · cloud · AI · robotics</div>
          </div>

          <div style={{ padding: 10, background: theme.panel, border: `1px solid ${theme.border}` }}>
            <div style={{ color: theme.accent, fontSize: `${10 * fontScale}px`, lineHeight: 1.3, textAlign: "center", marginBottom: 8 }}>Level {level}</div>
            <div style={{ display: "grid", gap: 7 }}>
              {stats.map(([label, value]) => <StatBar key={label} label={label} value={value} fontScale={fontScale} theme={theme} />)}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) auto",
            gap: 10,
            alignItems: "center",
            paddingBottom: 10,
            borderBottom: `2px solid ${theme.accent}`
          }}>
            <div>
              <div style={{ fontFamily: pixelFont, color: theme.text, fontSize: `${13 * fontScale}px`, lineHeight: 1.3 }}>Character File</div>
              <a href={GEORGIA_TECH_URL} target="_blank" rel="noopener noreferrer" title={GEORGIA_TECH_URL} style={{
                color: theme.accent,
                textDecoration: "none",
                fontSize: `${10 * fontScale}px`,
                lineHeight: 1.35
              }}>Georgia Tech · Computer Science · Class of 2029</a>
            </div>
            <div style={{
              justifySelf: isMobile ? "start" : "end",
              padding: "6px 8px",
              color: theme.text,
              background: theme.panelAlt,
              border: `1px solid ${theme.border}`,
              fontSize: `${9 * fontScale}px`,
              lineHeight: 1.25
            }}>Status: Open to internships</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))", gap: 8 }}>
            {PROFILE_STATS.map(([label, value]) => <InfoTile key={label} label={label} value={value} fontScale={fontScale} theme={theme} />)}
          </div>

          <div>
            <SheetLabel fontScale={fontScale} pixelFont={pixelFont} theme={theme}>Main quest</SheetLabel>
            <TextRow fontScale={fontScale} theme={theme}>
              Build reliable software that connects product, cloud infrastructure, AI systems, and robotics.
            </TextRow>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
            <div>
              <SheetLabel fontScale={fontScale} pixelFont={pixelFont} theme={theme}>Employer value</SheetLabel>
              <div style={{ display: "grid", gap: 7 }}>
                {EMPLOYER_VALUE.map(item => <TextRow key={item} fontScale={fontScale} theme={theme}>{item}</TextRow>)}
              </div>
            </div>

            <div>
              <SheetLabel fontScale={fontScale} pixelFont={pixelFont} theme={theme}>Completed quests</SheetLabel>
              <div style={{ display: "grid", gap: 7 }}>
                {PROFILE_MILESTONES.map(item => <TextRow key={item} fontScale={fontScale} theme={theme}>{item}</TextRow>)}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
            <div>
              <SheetLabel fontScale={fontScale} pixelFont={pixelFont} theme={theme}>Loadout</SheetLabel>
              <div style={{ display: "grid", gap: 7 }}>
                {DEVELOPER_LOADOUT.map(item => <InfoTile key={item.label} label={item.label} value={item.value} fontScale={fontScale} theme={theme} />)}
              </div>
            </div>

            <div>
              <SheetLabel fontScale={fontScale} pixelFont={pixelFont} theme={theme}>Training ground</SheetLabel>
              <div style={{ padding: 10, background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
                <a href={GEORGIA_TECH_URL} target="_blank" rel="noopener noreferrer" title={GEORGIA_TECH_URL} style={{ color: theme.text, textDecoration: "none", fontSize: `${10 * fontScale}px`, lineHeight: 1.35 }}>{education.school}</a>
                <div style={{ color: theme.accent, fontSize: `${9 * fontScale}px`, lineHeight: 1.35, marginTop: 3 }}>{education.credential}</div>
                <div style={{ color: theme.textFaint, fontSize: `${8 * fontScale}px`, lineHeight: 1.35, margin: "3px 0 6px" }}>{education.dates}</div>
                <div style={{ color: theme.textDim, fontFamily: "var(--copy-font)", fontSize: `${10 * fontScale}px`, lineHeight: 1.48 }}>{education.detail}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PixelFrame>
  </div>;
}
