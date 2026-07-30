import PixelFrame from "@/components/ui/PixelFrame";
import { ACHIEVEMENTS } from "@/data/achievements";

function AchievementsPanel({ theme, fontScale, pixelFont, unlockedAchievements }) {
  const unlockedCount = ACHIEVEMENTS.filter(
    achievement => unlockedAchievements[achievement.id]
  ).length;

  return <div>
    <div style={{
      fontSize: `${10 * fontScale}px`,
      color: theme.textDim,
      marginBottom: 6,
      letterSpacing: "1px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transform: "translateY(-6px)"
    }}>
      <span style={{
        color: theme.textFaint,
        fontSize: `${9 * fontScale}px`
      }}>
        {unlockedCount}/{ACHIEVEMENTS.length}
      </span>
    </div>
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 6
    }}>
      {ACHIEVEMENTS.map(achievement => {
        const isUnlocked = !!unlockedAchievements[achievement.id];

        return <PixelFrame key={achievement.id} theme={theme} style={{
          padding: "8px 10px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          opacity: isUnlocked ? 1 : 0.35,
          transition: "opacity 300ms ease"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 6
          }}>
            <span style={{
              fontFamily: pixelFont,
              fontSize: `${10 * fontScale}px`,
              color: isUnlocked ? theme.accent : theme.textFaint,
              letterSpacing: "0.5px"
            }}>
              {isUnlocked ? achievement.label : "???"}
            </span>
            <span style={{
              fontSize: `${9 * fontScale}px`,
              color: theme.textFaint,
              flexShrink: 0
            }}>
              +{achievement.xp} XP
            </span>
          </div>
          <div style={{
            fontFamily: "var(--copy-font)",
            fontSize: `${11 * fontScale}px`,
            color: theme.textDim,
            lineHeight: 1.5
          }}>
            {isUnlocked ? achievement.desc : "Locked. Keep exploring to find it."}
          </div>
        </PixelFrame>;
      })}
    </div>
  </div>;
}

export default AchievementsPanel;
