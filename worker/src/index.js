import { requestGeminiAnswer } from "./geminiClient.js";
import {
  buildVisitorTranscript,
  corsHeaders,
  extractGeminiMessage,
  isHighDemandResponse,
  jsonResponse
} from "./requestUtils.js";

const ALLOWED_CONTENT_TYPE = "application/json";

function optionsResponse(origin) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(origin)
  });
}

function getAllowedRequestOrigin(allowedOriginValue = "", requestOrigin) {
  const allowedOrigins = allowedOriginValue
    .split(",")
    .map(origin => origin.trim())
    .filter(Boolean);
  return allowedOrigins.includes(requestOrigin) ? requestOrigin : null;
}

/**
 * Handles browser requests at the Worker boundary.
 * Keeping validation here means provider details stay isolated and easier to test.
 */
export async function handleAssistantRequest(request, env, fetchImpl = fetch) {
  const requestOrigin = request.headers.get("Origin");
  const allowedOrigin = getAllowedRequestOrigin(env.ALLOWED_ORIGIN, requestOrigin);

  if (!allowedOrigin) {
    return jsonResponse({ error: "Origin not allowed." }, 403, "null");
  }
  if (request.method === "OPTIONS") return optionsResponse(allowedOrigin);
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed." }, 405, allowedOrigin);

  const contentType = request.headers.get("Content-Type")?.split(";")[0].trim();
  if (contentType !== ALLOWED_CONTENT_TYPE) {
    return jsonResponse({ error: "JSON requests are required." }, 415, allowedOrigin);
  }

  if (!env.GEMINI_API_KEY) {
    console.error("Missing GEMINI_API_KEY Worker secret.");
    return jsonResponse({ error: "The assistant is not configured." }, 500, allowedOrigin);
  }

  if (env.AI_RATE_LIMITER?.limit) {
    const rateLimitKey = request.headers.get("CF-Connecting-IP") || requestOrigin;
    const rateLimitResult = await env.AI_RATE_LIMITER.limit({ key: rateLimitKey });
    if (!rateLimitResult.success) {
      return jsonResponse({
        error: "The assistant is handling high demand. Please try again shortly.",
        code: "HIGH_DEMAND"
      }, 429, allowedOrigin);
    }
  }

  try {
    const body = await request.json();
    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return jsonResponse({ error: "A message is required." }, 400, allowedOrigin);
    }

    const transcript = buildVisitorTranscript(body.messages);
    if (!transcript) return jsonResponse({ error: "A message is required." }, 400, allowedOrigin);

    const providerResponse = await requestGeminiAnswer({
      apiKey: env.GEMINI_API_KEY,
      transcript,
      fetchImpl
    });
    const providerData = await providerResponse.json().catch(() => ({
      error: { message: `Gemini returned non-JSON response with status ${providerResponse.status}.` }
    }));

    if (!providerResponse.ok) {
      if (isHighDemandResponse(providerResponse, providerData)) {
        return jsonResponse({
          error: "The assistant is handling high demand. Please try again shortly.",
          code: "HIGH_DEMAND"
        }, 503, allowedOrigin);
      }
      console.error("Gemini API error:", providerData?.error?.message || providerResponse.status);
      return jsonResponse({ error: "The assistant is unavailable." }, 502, allowedOrigin);
    }

    const message = extractGeminiMessage(providerData);
    if (!message) return jsonResponse({ error: "The assistant returned no answer." }, 502, allowedOrigin);
    return jsonResponse({ message }, 200, allowedOrigin);
  } catch (error) {
    console.error("Assistant Worker error:", error);
    return jsonResponse({
      error: "The assistant is unavailable.",
      code: "WORKER_ERROR",
      detail: error?.message || "Unknown Worker error."
    }, 500, allowedOrigin);
  }
}

export default { fetch: handleAssistantRequest };
