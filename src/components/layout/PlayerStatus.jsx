import PixelFrame from "@/components/ui/PixelFrame";
import { PixelHeart } from "@/components/layout/DecorativeUI";
import { AVATAR_IMAGES } from "@/data/images";

const IEEE_PUBLICATION_URL = "https://doi.org/10.1109/URTC68753.2025.11533095";

function PlayerStatus({
  theme,
  avatarRef,
  companion,
  fontScale,
  handleAvatarClick,
  isLargeScreen,
  level,
  pixelFont,
  themeKey,
  xp,
  xpGain
}) {
  return <PixelFrame theme={theme} style={{
    width: "100%",
    padding: "14px 12px",
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8
  }}>
            <div ref={avatarRef} style={{
      position: "relative"
    }}>
              <PixelFrame theme={theme} onClick={handleAvatarClick} title="Avatar" data-platform={companion ? "true" : undefined} style={{
        width: 96,
        height: 97,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: theme.panelAlt,
        border: `2px solid ${theme.border}`,
        overflow: "hidden",
        position: "relative"
      }}>
                <img src={AVATAR_IMAGES[themeKey]} alt="Pixel avatar of Sunmay" draggable={false} style={{
          // The source image includes transparent space around the sprite. Slightly
          // oversizing and bottom-anchoring it keeps the character prominent and
          // visually grounded without changing the dimensions of the avatar frame.
          width: "112%",
          height: "112%",
          objectFit: "contain",
          objectPosition: "center bottom",
          imageRendering: "pixelated",
          display: "block",
          position: "absolute",
          bottom: -1,
          left: "50%",
          transform: "translateX(-50%)",
          maxWidth: "none"
        }} />
              </PixelFrame>
            </div>
            <div style={{
      fontFamily: pixelFont,
      fontSize: `${10 * fontScale}px`,
      lineHeight: 1.6,
      textAlign: "center",
      marginTop: -4
    }}>SUNMAY</div>
            <div style={{
      position: "relative",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
              <div style={{
        fontSize: `${9 * fontScale}px`,
        color: theme.textDim,
        letterSpacing: "1px",
        paddingLeft: "1px",
        textAlign: "center",
        marginBottom: 4
      }}>
                LV. {level} &middot; BUILDER
              </div>
              {xpGain && <div key={xpGain.id} style={{
        position: "absolute",
        top: -4,
        fontFamily: pixelFont,
        fontSize: `${10 * fontScale}px`,
        color: theme.accent,
        letterSpacing: "0.5px",
        animation: "xp-float 900ms ease-out forwards",
        pointerEvents: "none",
        textShadow: `0 0 4px ${theme.accent}88`
      }}>
                  +{xpGain.amount} XP
                </div>}
              {/* The track must leave real content height after its border and padding. */}
              <div title="XP" aria-label={`${xp} of 100 experience points`} style={{
        position: "relative",
        width: "100%",
        maxWidth: 140,
        alignSelf: "center",
        height: 5,
        border: `1px solid ${theme.border}`,
        background: theme.panelAlt,
        padding: 0,
        boxSizing: "border-box",
        overflow: "hidden"
      }}>
                <div style={{
          height: "100%",
          minHeight: 1,
          // XP is stored as progress within the current 100-point level.
          width: `${Math.max(0, Math.min(xp, 100))}%`,
          background: theme.accent,
          transition: "width 300ms ease"
        }} />
              </div>
            </div>
            <a
              href="https://www.gatech.edu/"
              target="_blank"
              rel="noopener noreferrer"
              title="https://www.gatech.edu/"
              aria-label="GT '29 · https://www.gatech.edu/"
              style={{
      color: theme.accent,
      fontSize: `${11 * fontScale}px`,
      letterSpacing: "0.5px",
      paddingLeft: "0.5px",
      textAlign: "center",
      marginTop: -2,
      textDecoration: "none"
    }}>
              RANK: GT &apos;29
            </a>

            <div style={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 3,
      justifyContent: "center"
    }}>
              {[1, 2, 3, 4, 5].map(i => <PixelHeart key={i} size={11} filled={i <= 4} color={theme.accent} bg={theme.border} />)}
            </div>

            <div style={{
      width: isLargeScreen ? "calc(100% - 20px)" : "100%",
      alignSelf: "center",
      marginTop: 4,
      display: "flex",
      flexDirection: "column",
      gap: 3
    }}>
              {[{
        label: "INTERNSHIPS",
        value: "02"
      }, {
        label: "LOCATION",
        value: "ATLANTA"
      }, {
        label: "PUBLICATION",
        value: "IEEE"
      }].map(stat => {
        const isPublication = stat.label === "PUBLICATION";
        const Tag = isPublication ? "a" : "div";
        return <Tag key={stat.label} href={isPublication ? IEEE_PUBLICATION_URL : undefined} target={isPublication ? "_blank" : undefined} rel={isPublication ? "noopener noreferrer" : undefined} title={isPublication ? IEEE_PUBLICATION_URL : undefined} aria-label={isPublication ? `Open IEEE publication: ${IEEE_PUBLICATION_URL}` : undefined} style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          padding: "5px 7px",
          background: theme.panelAlt,
          border: `1px solid ${theme.border}`,
          boxSizing: "border-box",
          fontSize: `${8.5 * fontScale}px`,
          color: theme.textDim,
          lineHeight: 1.25,
          textDecoration: "none",
          cursor: isPublication ? "pointer" : "default"
        }}>
                  <span>{stat.label}</span>
                  <span style={{
            color: theme.accent,
            textAlign: "right"
          }}>{stat.value}</span>
              </Tag>;
      })}
            </div>
          </PixelFrame>;
}
export default PlayerStatus;
