import { useCallback, useEffect, useRef, useState } from "react";
import { calculateXpProgress } from "../utils/progression";

const STARTING_LEVEL = 12;

/** Own XP, levels, achievements, and their temporary notifications. */
export default function useProgression({ achievements, beep }) {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(STARTING_LEVEL);
  const [xpGain, setXpGain] = useState(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState({});
  const [achievementToast, setAchievementToast] = useState(null);

  const xpRef = useRef(0);
  const levelRef = useRef(STARTING_LEVEL);
  const xpGainIdRef = useRef(0);
  const achievementToastIdRef = useRef(0);
  const unlockedRef = useRef({});
  const claimedQuestsRef = useRef({});
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

    unlockedRef.current[id] = true;
    setUnlockedAchievements(current => ({ ...current, [id]: true }));
    gainXp(achievement.xp);

    const toastId = ++achievementToastIdRef.current;
    setAchievementToast({ ...achievement, toastId });
    schedule(() => {
      setAchievementToast(current => current?.toastId === toastId ? null : current);
    }, 3200);
  }, [achievements, gainXp, schedule]);

  const claimQuestXp = useCallback(quest => {
    if (claimedQuestsRef.current[quest.id]) return;
    claimedQuestsRef.current[quest.id] = true;
    gainXp(quest.reward);
  }, [gainXp]);

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
