import PixelSprite from "./PixelSprite";
import PixelFrame from "./PixelFrame";
import PixelIcon from "./PixelIcon";
import { GithubLogo, LinkedInLogo } from "./SocialLogos";
import { LOGO_IMAGES } from "../data/images";

function TopBar({
  T,
  aiOpen,
  beep,
  fontScale,
  handleLogoDoubleClick,
  handleNavClick,
  isTablet,
  localTime,
  logoSparkle,
  logoSpin,
  pixelFont,
  setAiOpen,
  setMailTab,
  setSettingsOpen,
  settingsOpen,
  themeKey,
  unlockAchievement
}) {
  return <div style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 16px",
    background: T.panel,
    borderBottom: `3px solid ${T.border}`,
    flexWrap: "wrap",
    gap: 10,
    rowGap: 8
  }}>
        <div style={{
      display: "flex",
      alignItems: "center",
      gap: 12
    }}>
          <div style={{
        position: "relative",
        width: 34,
        height: 34,
        flexShrink: 0
      }}>
            <PixelFrame theme={T} onClick={handleLogoDoubleClick} title="Logo" style={{
          width: 34,
          height: 34,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          transition: "transform 700ms ease",
          transform: logoSpin ? "rotate(360deg) scale(1.5)" : "rotate(0deg) scale(1)"
        }}>
              <img src={LOGO_IMAGES[themeKey]} alt="SP logo" draggable={false} style={{
            width: 20,
            height: 20,
            imageRendering: "pixelated",
            pointerEvents: "none",
            display: "block"
          }} />
            </PixelFrame>
            {logoSparkle && [{
          x: -8,
          y: -8,
          delay: 0,
          size: 5
        }, {
          x: 38,
          y: -6,
          delay: 40,
          size: 4
        }, {
          x: 40,
          y: 22,
          delay: 90,
          size: 5
        }, {
          x: -10,
          y: 26,
          delay: 60,
          size: 4
        }, {
          x: 16,
          y: -14,
          delay: 120,
          size: 4
        }, {
          x: 28,
          y: 38,
          delay: 150,
          size: 3
        }].map((s, i) => <div key={i} style={{
          position: "absolute",
          left: s.x,
          top: s.y,
          width: s.size,
          height: s.size,
          background: T.accent,
          boxShadow: `0 0 4px ${T.accent}`,
          animation: `logo-sparkle 550ms ease-out ${s.delay}ms forwards`,
          pointerEvents: "none"
        }} />)}
          </div>
          <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 34,
        gap: 2
      }}>
            <div style={{
          fontFamily: pixelFont,
          fontSize: `${11 * fontScale}px`,
          letterSpacing: "1px",
          lineHeight: 1,
          margin: 0
        }} title="Portfolio">SUNMAY PADIYAR</div>
            <div style={{
          fontSize: `${10 * fontScale}px`,
          color: T.textDim,
          letterSpacing: "1px",
          lineHeight: 1,
          margin: 0
        }}>PORTFOLIO</div>
          </div>
        </div>
        <div style={{
      display: "flex",
      gap: 8,
      alignItems: "center",
      flexWrap: "wrap"
    }}>
          <PixelFrame
            as="a"
            href="/Sunmay-Padiyar-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            theme={T}
            onClick={() => beep(300)}
            title="/Sunmay-Padiyar-Resume.pdf"
            style={{
        padding: "6px 10px",
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: `${10 * fontScale}px`,
        textDecoration: "none"
      }}>
            <PixelIcon name="briefcase" size={12} />
            {!isTablet && "RESUME"}
          </PixelFrame>
      <PixelFrame theme={T} onClick={() => {
        beep(300);
        // The top-bar email shortcut should lead directly to the contact form,
        // even when the visitor previously left the Mailbox on its inbox tab.
        setMailTab("compose");
        handleNavClick("contact");
      }} title="Open the Quest Mail contact form" style={{
        padding: "6px 10px",
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: `${10 * fontScale}px`,
        textDecoration: "none"
      }}>
            <PixelIcon name="mail" size={12} />
            {!isTablet && "EMAIL"}
          </PixelFrame>
          <PixelFrame as="a" href="https://calendar.app.google/Ng2aCz3XWeMGxjfn8" target="_blank" rel="noopener noreferrer" theme={T} onClick={() => beep(300)} title="https://calendar.app.google/Ng2aCz3XWeMGxjfn8" style={{
        padding: "6px 10px",
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: `${10 * fontScale}px`,
        textDecoration: "none"
      }}>
            <PixelIcon name="calendar" size={12} />
            {!isTablet && "CALENDAR"}
          </PixelFrame>
          <PixelFrame as="a" href="https://www.linkedin.com/in/sunmay-padiyar/" target="_blank" rel="noopener noreferrer" theme={T} onClick={() => beep(300)} title="https://www.linkedin.com/in/sunmay-padiyar/" style={{
        padding: "6px 10px",
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: `${10 * fontScale}px`,
        textDecoration: "none"
      }}>
            <LinkedInLogo size={13} color={T.text} />
            {!isTablet && "LINKEDIN"}
          </PixelFrame>
          <PixelFrame as="a" href="https://github.com/S-Padiyar" target="_blank" rel="noopener noreferrer" theme={T} onClick={() => beep(300)} title="https://github.com/S-Padiyar" style={{
        padding: "6px 10px",
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: `${10 * fontScale}px`,
        textDecoration: "none"
      }}>
            <GithubLogo size={13} color={T.text} />
            {!isTablet && "GITHUB"}
          </PixelFrame>
          <div style={{
        width: 2,
        height: 22,
        background: T.border,
        margin: "0 4px"
      }} />
          <PixelFrame theme={T} active={aiOpen} onClick={() => {
        setAiOpen(v => {
          const next = !v;
          if (next) setSettingsOpen(false);
          return next;
        });
        beep(500);
      }} title="Companion" style={{
        width: 34,
        height: 34,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
            <PixelSprite frame="idle" size={18} color={aiOpen ? T.bg : T.accent} />
          </PixelFrame>
          <PixelFrame theme={T} active={settingsOpen === "achievements"} onClick={() => {
        setAiOpen(false);
        setSettingsOpen(v => v === "achievements" ? false : "achievements");
        unlockAchievement("achievement_hunter");
        beep(420);
      }} title="Achievements" style={{
        width: 34,
        height: 34,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
            <PixelIcon name="star" size={16} color={settingsOpen === "achievements" ? T.bg : T.accent} />
          </PixelFrame>
          <PixelFrame theme={T} active={settingsOpen === "settings"} onClick={() => {
        setAiOpen(false);
        setSettingsOpen(v => v === "settings" ? false : "settings");
        beep(260);
      }} title="Settings" style={{
        width: 34,
        height: 34,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
            <PixelIcon name="gear" size={16} color={settingsOpen === "settings" ? T.bg : T.accent} />
          </PixelFrame>
          <div style={{
        width: 2,
        height: 22,
        background: T.border,
        margin: "0 4px"
      }} />
          <div style={{
        display: "flex",
        alignItems: "center",
        gap: 6
      }}>
            <PixelIcon name="clock" size={12} color={T.accent} />
            <span style={{
          fontFamily: pixelFont,
          fontSize: `${14 * fontScale}px`,
          color: T.text,
          lineHeight: 1
        }}>{localTime()}</span>
          </div>
        </div>
      </div>;
}
export default TopBar;
