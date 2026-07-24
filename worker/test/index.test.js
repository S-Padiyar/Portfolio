import test from "node:test";
import assert from "node:assert/strict";
import { handleAssistantRequest } from "../src/index.js";

const ORIGIN = "https://portfolio.test";
const ENV = { ALLOWED_ORIGIN: ORIGIN, GEMINI_API_KEY: "test-key" };

function makeRequest(body, options = {}) {
  return new Request("https://worker.test", {
    method: options.method || "POST",
    headers: {
      Origin: options.origin || ORIGIN,
      "Content-Type": options.contentType || "application/json",
      ...(options.headers || {})
    },
    body: options.method === "GET" ? undefined : body
  });
}

test("rejects requests from an unapproved origin", async () => {
  const request = makeRequest(JSON.stringify({ messages: [] }), {
    origin: "https://attacker.test"
  });
  const response = await handleAssistantRequest(request, ENV);
  assert.equal(response.status, 403);
});

test("requires JSON requests", async () => {
  const request = makeRequest("messages=hello", { contentType: "text/plain" });
  const response = await handleAssistantRequest(request, ENV);
  assert.equal(response.status, 415);
});

test("returns a normalized Gemini reply", async () => {
  const request = makeRequest(JSON.stringify({
    messages: [{ role: "user", text: "Where are the projects?" }]
  }));
  const fetchMock = async (_url, options) => {
    assert.equal(options.headers["x-goog-api-key"], "test-key");
    return new Response(JSON.stringify({
      candidates: [{ content: { parts: [{ text: "Visit **Trophy Case**." }] } }]
    }), { status: 200, headers: { "Content-Type": "application/json" } });
  };

  const response = await handleAssistantRequest(request, ENV, fetchMock);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { message: "Visit Trophy Case." });
  assert.equal(response.headers.get("X-Content-Type-Options"), "nosniff");
});

test("preserves a high-demand response for the frontend", async () => {
  const request = makeRequest(JSON.stringify({
    messages: [{ role: "user", text: "Hello" }]
  }));
  const fetchMock = async () => new Response(JSON.stringify({
    error: { status: "RESOURCE_EXHAUSTED" }
  }), { status: 429, headers: { "Content-Type": "application/json" } });

  const response = await handleAssistantRequest(request, ENV, fetchMock);
  assert.equal(response.status, 503);
  assert.equal((await response.json()).code, "HIGH_DEMAND");
});

test("stops requests when the Cloudflare rate limit is exhausted", async () => {
  const request = makeRequest(JSON.stringify({
    messages: [{ role: "user", text: "Hello" }]
  }));
  const env = {
    ...ENV,
    AI_RATE_LIMITER: { limit: async () => ({ success: false }) }
  };
  const response = await handleAssistantRequest(request, env, async () => {
    throw new Error("Gemini must not be called after rate limiting.");
  });

  assert.equal(response.status, 429);
  assert.equal((await response.json()).code, "HIGH_DEMAND");
});
