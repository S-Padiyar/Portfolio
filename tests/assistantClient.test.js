import test from "node:test";
import assert from "node:assert/strict";
import {
  buildAssistantPayload,
  requestAssistantReply
} from "../src/services/assistantClient.js";

test("builds a limited provider-neutral transcript", () => {
  const messages = [
    { from: "ai", text: "Welcome" },
    { from: "user", text: "Hello" },
    { from: "ai", text: "Thinking", pending: 1 }
  ];
  assert.deepEqual(buildAssistantPayload(messages, 2), {
    messages: [
      { role: "model", text: "Welcome" },
      { role: "user", text: "Hello" }
    ]
  });
});

test("returns a validated assistant reply", async () => {
  const fetchMock = async () => ({
    ok: true,
    json: async () => ({ message: "Visit Trophy Case." })
  });
  const reply = await requestAssistantReply("https://worker.test", [], fetchMock);
  assert.equal(reply, "Visit Trophy Case.");
});

test("rejects an empty successful response", async () => {
  const fetchMock = async () => ({ ok: true, json: async () => ({}) });
  await assert.rejects(
    requestAssistantReply("https://worker.test", [], fetchMock),
    /empty response/
  );
});

test("preserves a high-demand error code from the Worker", async () => {
  const fetchMock = async () => ({
    ok: false,
    json: async () => ({
      code: "HIGH_DEMAND",
      error: "The model is experiencing high demand."
    })
  });

  await assert.rejects(
    requestAssistantReply("https://worker.test", [], fetchMock),
    error => error.code === "HIGH_DEMAND" && /high demand/.test(error.message)
  );
});
