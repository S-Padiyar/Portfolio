const MAX_MESSAGES = 8;
const MAX_MESSAGE_LENGTH = 600;

export function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };
}

export function jsonResponse(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders(origin),
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });
}

/** Flatten untrusted chat roles so a visitor cannot impersonate the system. */
export function buildVisitorTranscript(messages) {
  return messages.slice(-MAX_MESSAGES).map(message => {
    const label = message.role === "model" ? "Earlier assistant reply" : "Visitor";
    const text = String(message.text || "").trim().slice(0, MAX_MESSAGE_LENGTH);
    return text ? `${label}: ${text}` : "";
  }).filter(Boolean).join("\n");
}

/** Extract plain text even if the model occasionally emits Markdown. */
export function extractGeminiMessage(data) {
  return data.candidates?.[0]?.content?.parts
    ?.map(part => part.text || "")
    .join("")
    .trim()
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^#{1,6}\s+/gm, "");
}

/** Identify temporary Gemini capacity and rate-limit responses. */
export function isHighDemandResponse(response, data) {
  const providerStatus = data?.error?.status;
  return response.status === 429
    || response.status === 503
    || providerStatus === "RESOURCE_EXHAUSTED"
    || providerStatus === "UNAVAILABLE";
}
