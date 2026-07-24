import test from "node:test";
import assert from "node:assert/strict";
import { rectanglesOverlap } from "../src/utils/collision.js";

test("detects when the playable companion enters a door", () => {
  const companion = { left: 40, right: 80, top: 50, bottom: 90 };
  const door = { left: 70, right: 150, top: 20, bottom: 140 };
  assert.equal(rectanglesOverlap(companion, door), true);
});

test("does not activate a door that the companion has not entered", () => {
  const companion = { left: 10, right: 50, top: 20, bottom: 60 };
  const door = { left: 50, right: 120, top: 20, bottom: 120 };
  assert.equal(rectanglesOverlap(companion, door), false);
});
