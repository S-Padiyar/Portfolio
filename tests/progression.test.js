import test from "node:test";
import assert from "node:assert/strict";
import { calculateXpProgress } from "../src/utils/progression.js";

test("adds XP without changing the current level", () => {
  assert.deepEqual(calculateXpProgress(12, 12, 3), {
    xp: 15,
    level: 12,
    levelsGained: 0
  });
});

test("carries overflow XP into the next level", () => {
  assert.deepEqual(calculateXpProgress(95, 12, 10), {
    xp: 5,
    level: 13,
    levelsGained: 1
  });
});

test("supports gaining several levels at once", () => {
  assert.deepEqual(calculateXpProgress(95, 12, 205), {
    xp: 0,
    level: 15,
    levelsGained: 3
  });
});
