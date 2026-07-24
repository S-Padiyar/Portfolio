import { useEffect, useState } from "react";
import { readBrowserStorage, writeBrowserStorage } from "../utils/browserStorage";

/** useState with safe localStorage hydration and persistence. */
export default function usePersistentState(key, initialValue, isValid = () => true) {
  const [value, setValue] = useState(() => {
    const storedValue = readBrowserStorage(key, initialValue);
    return isValid(storedValue) ? storedValue : initialValue;
  });

  useEffect(() => {
    writeBrowserStorage(key, value);
  }, [key, value]);

  return [value, setValue];
}
