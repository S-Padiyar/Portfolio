import test from "node:test";
import assert from "node:assert/strict";
import { MAIL_ITEMS } from "../src/data/mail.js";
import { PROJECTS } from "../src/data/projects.js";
import { GUILD_QUESTS } from "../src/data/quests.js";
import { SKILL_NODES } from "../src/data/skills.js";

test("portfolio content is resume-backed rather than placeholder copy", () => {
  const serializedContent = JSON.stringify({ PROJECTS, GUILD_QUESTS, SKILL_NODES });
  assert.equal(/placeholder|project one|acme robotics|quantum labs/i.test(serializedContent), false);
  assert.equal(serializedContent.includes("NOVA Cloud LLC"), true);
  assert.equal(serializedContent.includes("George Mason University"), true);
  assert.equal(serializedContent.includes("CyberSages"), true);
});

test("mailbox contains the three requested milestone messages", () => {
  assert.equal(MAIL_ITEMS.length, 3);
  assert.deepEqual(
    MAIL_ITEMS.map(item => item.from),
    ["NOVA Cloud LLC", "George Mason University", "National Center for Simulation"]
  );
});
