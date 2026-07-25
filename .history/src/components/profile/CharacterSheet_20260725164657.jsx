import { useState } from "react";
import PixelIcon from "@/components/ui/PixelIcon";
import PixelFrame from "@/components/ui/PixelFrame";
import { ACHIEVEMENTS } from "@/data/achievements";

const GEORGIA_TECH_URL = "https://www.gatech.edu/";
const TREASURE_CHEST_SRC = "/images/profile/treasure-chest-pixel.png";

function HiddenScrollModal({ beep, fontScale, onClose, pixelFont, theme }) {
  const closeModal = () => {
    beep?.(220);
    onClose();
  };

  return <div role="presentation" onClick={closeModal} style={{
    position: "fixed",
    inset: 0,
    background: `${theme.bg}cc`,
    zIndex: 998,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(12px, 3vw, 20px)"
  }}>
    <div role="dialog" aria-modal="true" aria-label="Hidden scroll" onClick={event => event.stopPropagation()} style={{
      background: theme.panel,
      border: `2px solid ${theme.border}`,
      boxShadow: `4px 4px 0 ${theme.bg}`,
      padding: "clamp(24px, 4vw, 30px) clamp(20px, 4vw, 26px)",
      maxWidth: 440,
      width: "100%",
      position: "relative",
      margin: "10px"
    }}>
      <div aria-hidden="true" style={{
        position: "absolute",
        left: -10,
        right: -10,
        top: -8,
        height: 12,
        background: theme.panelAlt,
        border: `2px solid ${theme.border}`,
        boxShadow: `2px 2px 0 ${theme.bg}`
      }} />
      <div aria-hidden="true" style={{
        position: "absolute",
        left: -10,
        right: -10,
        bottom: -8,
        height: 12,
        background: theme.panelAlt,
        border: `2px solid ${theme.border}`,
        boxShadow: `2px 2px 0 ${theme.bg}`
      }} />
      <button type="button" onClick={closeModal} title="Close" aria-label="Close hidden scroll" style={{
        appearance: "none",
        background: "none",
        border: 0,
        padding: 0,
        position: "absolute",
        top: 16,
        right: 14,
        cursor: "pointer"
      }}>
        <PixelIcon name="close" size={12} color={theme.textDim} />
      </button>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <div style={{
          fontFamily: pixelFont,
          fontSize: `${9 * fontScale}px`,
          color: theme.textFaint,
          letterSpacing: "1px"
        }}>
          Hidden Scroll
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <div style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: theme.accent,
          border: `2px solid ${theme.accentDark}`,
          boxShadow: `2px 2px 0 ${theme.bg}`
        }} />
      </div>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <div style={{
          fontFamily: pixelFont,
          fontSize: `${12 * fontScale}px`,
          lineHeight: 1.7,
          color: theme.text
        }}>
          Final Chest Opened
        </div>
        <div style={{ fontSize: `${10 * fontScale}px`, color: theme.textDim, marginTop: 6 }}>
          Achievement vault &middot; complete set
        </div>
      </div>
      <div style={{ height: 2, background: theme.border, marginBottom: 18 }} />
      <div style={{
        fontSize: `${13 * fontScale}px`,
        color: theme.text,
        lineHeight: 1.9,
        fontFamily: "var(--copy-font)",
        textAlign: "center"
      }}>
       You actually made it to the end—unless you cheated and opened DevTools.

      Thanks for taking the time to explore the site instead of just clicking my résumé and leaving. I put a lot of time into making this feel like more than a normal portfolio, so the fact that you found this is pretty cool!

      If you ever want to talk about software, robotics, internships, project ideas, or something interesting you’re building, feel free to reach out.

      P.S. Replies may be delayed because of classes, debugging, or me completely losing track of time.
                    </div>
    </div>
  </div>;
}

function TreasureReward({ beep, fontScale, isMobile, pixelFont, theme, themeKey, unlockedAchievements = {} }) {
  const [scrollOpen, setScrollOpen] = useState(false);
  const unlockedCount = ACHIEVEMENTS.filter(achievement => unlockedAchievements[achievement.id]).length;
  const savedAchievementCount = Object.keys(unlockedAchievements).length;
  // The achievements panel historically counted every saved badge key. Matching that behavior here
  // prevents older local-storage progress from showing "complete" in one place but hiding the reward.
  const allUnlocked = unlockedCount === ACHIEVEMENTS.length || savedAchievementCount >= ACHIEVEMENTS.length;

  return <>
    <div style={{
      display: "grid",
      gap: 2,
      justifyItems: "center",
      padding: isMobile ? "2px 0 0" : "4px 0 0"
    }}>
    {!allUnlocked ? <>
      <div style={{
      display: "grid",
      gap: 8,
      justifyItems: "center",
      textAlign: "center",
      color: theme.textDim,
      transform: "translateY(5px)"
    }}>
      <div style={{ fontFamily: pixelFont, color: theme.text, fontSize: `${12 * fontScale}px`, lineHeight: 1.35 }}>Secret chest locked</div>
      <div style={{ fontFamily: "var(--copy-font)", fontSize: `${13 * fontScale}px`, lineHeight: 1.55 }}>
        Complete every achievement to reveal the final chest.
      </div>
      <div style={{
        width: "100%",
        maxWidth: 320,
        height: 8,
        background: theme.panelAlt,
        border: `1px solid ${theme.border}`,
        overflow: "hidden"
      }}>
        <div style={{
          width: `${Math.min(100, unlockedCount / ACHIEVEMENTS.length * 100)}%`,
          height: "100%",
          background: theme.accent,
          transition: "width 240ms ease"
        }} />
      </div>
      <div style={{ color: theme.textFaint, fontSize: `${10 * fontScale}px`, lineHeight: 1.35 }}>
        {unlockedCount}/{ACHIEVEMENTS.length} achievements
      </div>
      </div>
    </> : <>
      <div style={{
      display: "grid",
      placeItems: "center",
      paddingTop: isMobile ? 4 : 10,
      width: "100%"
    }}>
      <div style={{
        width: isMobile ? "100%" : "82%",
        maxWidth: isMobile ? 360 : 1230,
        background: theme.panel,
        border: `2px solid ${theme.border}`,
        outline: `1px solid ${theme.bg}`,
        outlineOffset: -6,
        boxShadow: `4px 4px 0 ${theme.bg}`,
        padding: isMobile ? "14px 14px 9px" : "18px 20px 9px",
        boxSizing: "border-box",
        display: "grid",
        gap: 12,
        justifyItems: "center"
      }}>
        <div style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          paddingBottom: 8,
          borderBottom: `1px solid ${theme.border}`,
          fontFamily: pixelFont,
          fontSize: `${10 * fontScale}px`,
          letterSpacing: "1px",
          lineHeight: 1.25
        }}>
          <span style={{ color: theme.accent }}>Final Reward</span>
          <span style={{ color: theme.textDim }}>{unlockedCount}/{ACHIEVEMENTS.length}</span>
        </div>

        <button type="button" onClick={() => {
          beep?.(420);
          setScrollOpen(true);
        }} title="Open treasure chest" style={{
          appearance: "none",
          width: isMobile ? 190 : 220,
          background: "transparent",
          border: 0,
          boxShadow: "none",
          cursor: "pointer",
          font: "inherit",
          padding: 0,
          display: "grid",
          placeItems: "center",
          zIndex: 2
        }}>
          <img src={TREASURE_CHEST_SRC} alt="Treasure chest" style={{
            display: "block",
            position: "relative",
            width: "100%",
            maxWidth: isMobile ? 190 : 220,
            height: "auto",
            objectFit: "contain",
            imageRendering: "pixelated",
            filter: themeKey === "mono" ? "grayscale(1) contrast(1.08)" : themeKey === "violet" ? "hue-rotate(250deg) saturate(1.12)" : "none"
          }} />
        </button>

        <div style={{
          width: "100%",
          display: "grid",
          gap: 10
        }}>
          <div style={{
            height: 10,
            background: theme.panelAlt,
            border: `1px solid ${theme.border}`,
            overflow: "hidden"
          }}>
            <div style={{
              width: `${Math.min(100, unlockedCount / ACHIEVEMENTS.length * 100)}%`,
              height: "100%",
              background: theme.accent,
              transition: "width 240ms ease"
            }} />
          </div>
          <div style={{
            color: theme.textFaint,
            fontFamily: "var(--copy-font)",
            fontSize: `${12.5 * fontScale}px`,
            lineHeight: 1.4,
            textAlign: "center"
          }}>
            Open the chest to read the hidden scroll.
          </div>
        </div>
      </div>
      </div>
    </>}
    </div>
    {scrollOpen && <HiddenScrollModal beep={beep} fontScale={fontScale} onClose={() => setScrollOpen(false)} pixelFont={pixelFont} theme={theme} />}
  </>;
}

export default function CharacterSheet({ theme, beep, fontScale, isMobile, pixelFont, themeKey, unlockedAchievements }) {
  return <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gap: 14 }}>
    <PixelFrame theme={theme} style={{ padding: isMobile ? 16 : 22, background: theme.panel }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) auto",
        gap: 10,
        alignItems: "center",
        marginBottom: 14,
        paddingBottom: 12,
        borderBottom: `2px solid ${theme.border}`
      }}>
        <div>
          <div style={{ fontFamily: pixelFont, color: theme.text, fontSize: `${15 * fontScale}px`, lineHeight: 1.3 }}>Bio</div>
          <a href={GEORGIA_TECH_URL} target="_blank" rel="noopener noreferrer" title={GEORGIA_TECH_URL} style={{
            color: theme.accent,
            textDecoration: "none",
            fontSize: `${11 * fontScale}px`,
            lineHeight: 1.4
          }}>
            Georgia Tech / Computer Science / Class of 2029
          </a>
        </div>

        <div style={{
          justifySelf: isMobile ? "start" : "end",
          padding: "6px 8px",
          color: theme.text,
          background: theme.panelAlt,
          border: `1px solid ${theme.border}`,
          fontSize: `${11 * fontScale}px`,
          lineHeight: 1.3
        }}>Open to internships</div>
      </div>

      <p style={{
        margin: 0,
        color: theme.textDim,
        fontFamily: "var(--copy-font)",
        fontSize: `${14 * fontScale}px`,
        lineHeight: 1.65
      }}>
        I'm a Computer Science student at Georgia Tech interested in systems, robotics, and software engineering. My experience so far includes research that I presented at the MIT Undergraduate Research Technology Conference and published through IEEE, internships focused on cloud computing and full-stack development, and hardware/software work through my robotics team.
        <br /><br />
        Currently, I'm looking for internship opportunities where I can keep learning and contribute to cool projects!
        <br /><br />
        Feel free to connect!
      </p>
    </PixelFrame>

    <TreasureReward beep={beep} fontScale={fontScale} isMobile={isMobile} pixelFont={pixelFont} theme={theme} themeKey={themeKey} unlockedAchievements={unlockedAchievements} />
  </div>;
}
