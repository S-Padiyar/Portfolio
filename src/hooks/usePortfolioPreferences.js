import usePersistentState from "./usePersistentState";
import { THEMES } from "@/data/themes";

/** Own durable accessibility and appearance preferences. */
export default function usePortfolioPreferences() {
  const [themeKey, setThemeKey] = usePersistentState(
    "portfolio:theme",
    "amber",
    value => Object.hasOwn(THEMES, value)
  );
  const [soundOn, setSoundOn] = usePersistentState(
    "portfolio:sound",
    true,
    value => typeof value === "boolean"
  );
  const [fontScale, setFontScale] = usePersistentState(
    "portfolio:font-scale",
    1.05,
    value => Number.isFinite(value) && value >= 1 && value <= 1.4
  );
  const [readableFont, setReadableFont] = usePersistentState(
    "portfolio:readable-font",
    false,
    value => typeof value === "boolean"
  );

  return {
    fontScale,
    readableFont,
    setFontScale,
    setReadableFont,
    setSoundOn,
    setThemeKey,
    soundOn,
    themeKey
  };
}
