import { useCallback, useEffect, useRef, useState } from "react";
import { calculateXpProgress } from "@/utils/progression";
import usePersistentState from "./usePersistentState";

const STARTING_LEVEL = 12;
const SAVED_PROGRESSION_KEY = "portfolio:progression";

/** Own XP, levels, achievements, and their temporary notifications. */
export default function useProgression({ achievements, beep }) {
  const [savedProgression, setSavedProgression] = usePersistentState(
    SAVED_PROGRESSION_KEY,
    { xp: 0, level: STARTING_LEVEL, unlockedAchievements: {} },
    value => value !== null && typeof value === "object" && !Array.isArray(value)
  );
  const [xp, setXp] = useState(savedProgression.xp || 0);
  const [level, setLevel] = useState(savedProgression.level || STARTING_LEVEL);
  const [xpGain, setXpGain] = useState(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState(savedProgression.unlockedAchievements || {});
  const [achievementToast, setAchievementToast] = useState(null);

  const xpRef = useRef(savedProgression.xp || 0);
  const levelRef = useRef(savedProgression.level || STARTING_LEVEL);
  const xpGainIdRef = useRef(0);
  const achievementToastIdRef = useRef(0);
  const unlockedRef = useRef(savedProgression.unlockedAchievements || {});
  const timersRef = useRef(new Set());

  const schedule = useCallback((callback, delay) => {
    const timer = setTimeout(() => {
      timersRef.current.delete(timer);
      callback();
    }, delay);
    timersRef.current.add(timer);
    return timer;
  }, []);

  useEffect(() => () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current.clear();
  }, []);

  useEffect(() => {
    setSavedProgression({ xp, level, unlockedAchievements });
  }, [level, setSavedProgression, unlockedAchievements, xp]);

  const gainXp = useCallback(amount => {
    const gainId = ++xpGainIdRef.current;
    setXpGain({ amount, id: gainId });
    schedule(() => {
      setXpGain(current => current?.id === gainId ? null : current);
    }, 900);

    const next = calculateXpProgress(xpRef.current, levelRef.current, amount);
    xpRef.current = next.xp;
    levelRef.current = next.level;
    setXp(next.xp);

    if (next.levelsGained > 0) {
      setLevel(next.level);
      setShowLevelUp(true);
      beep(660, 0.06);
      schedule(() => beep(880, 0.09), 100);
      schedule(() => beep(1180, 0.12), 200);
      schedule(() => setShowLevelUp(false), 1800);
    }
  }, [beep, schedule]);

  const unlockAchievement = useCallback(id => {
    if (unlockedRef.current[id]) return;
    const achievement = achievements.find(item => item.id === id);
    if (!achievement) return;

    const nextUnlocked = { ...unlockedRef.current, [id]: true };
    unlockedRef.current = nextUnlocked;
    setUnlockedAchievements(nextUnlocked);
    gainXp(achievement.xp);

    const toastId = ++achievementToastIdRef.current;
    setAchievementToast({ ...achievement, toastId });
    schedule(() => {
      setAchievementToast(current => current?.toastId === toastId ? null : current);
    }, 3200);
  }, [achievements, gainXp, schedule]);

  const claimQuestXp = useCallback(() => {
    // XP is reserved for achievements so the progress bar always matches earned milestones.
  }, []);

  return {
    achievementToast,
    claimQuestXp,
    level,
    showLevelUp,
    unlockAchievement,
    unlockedAchievements,
    xp,
    xpGain
  };
}
