/** Read JSON from localStorage without letting unavailable or corrupt storage crash the UI. */
export function readBrowserStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

/** Persist JSON when storage is available; preferences are non-critical. */
export function writeBrowserStorage(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private browsing and storage quotas may make localStorage unavailable.
  }
}
