import test from "node:test";
import assert from "node:assert/strict";
import { readBrowserStorage, writeBrowserStorage } from "../src/utils/browserStorage.js";

function installStorage(initialEntries = []) {
  const values = new Map(initialEntries);
  globalThis.window = {
    localStorage: {
      getItem: key => values.has(key) ? values.get(key) : null,
      setItem: (key, value) => values.set(key, value)
    }
  };
  return values;
}

test("reads and writes JSON preferences", () => {
  const values = installStorage();
  writeBrowserStorage("preference", { theme: "mono" });
  assert.equal(values.get("preference"), '{"theme":"mono"}');
  assert.deepEqual(readBrowserStorage("preference", {}), { theme: "mono" });
  delete globalThis.window;
});

test("falls back when stored JSON is corrupt", () => {
  installStorage([["preference", "not-json"]]);
  assert.deepEqual(readBrowserStorage("preference", { theme: "amber" }), { theme: "amber" });
  delete globalThis.window;
});
