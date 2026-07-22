export const XP_PER_LEVEL = 100;

/** Calculate XP carry-over without coupling the rule to React state. */
export function calculateXpProgress(currentXp, currentLevel, amount) {
  const safeAmount = Number.isFinite(amount) ? Math.max(0, amount) : 0;
  const totalXp = currentXp + safeAmount;
  const levelsGained = Math.floor(totalXp / XP_PER_LEVEL);

  return {
    xp: totalXp % XP_PER_LEVEL,
    level: currentLevel + levelsGained,
    levelsGained
  };
}
