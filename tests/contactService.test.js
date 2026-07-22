import test from "node:test";
import assert from "node:assert/strict";
import {
  isValidContactSubmission,
  submitContactForm
} from "../src/services/contactService.js";

test("requires both a valid email and a message", () => {
  assert.equal(isValidContactSubmission("visitor@example.com", "Hello"), true);
  assert.equal(isValidContactSubmission("not-an-email", "Hello"), false);
  assert.equal(isValidContactSubmission("visitor@example.com", "  "), false);
});

test("normalizes contact fields before submission", async () => {
  let requestOptions;
  const fetchMock = async (_url, options) => {
    requestOptions = options;
    return { ok: true };
  };

  await submitContactForm({
    name: "  ",
    email: " visitor@example.com ",
    message: " Hello "
  }, fetchMock);

  assert.deepEqual(JSON.parse(requestOptions.body), {
    name: "Portfolio visitor",
    email: "visitor@example.com",
    message: "Hello"
  });
});
