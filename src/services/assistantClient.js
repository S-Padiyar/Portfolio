const DEFAULT_HISTORY_LIMIT = 8;

export class AssistantRequestError extends Error {
  constructor(message, code = "ASSISTANT_UNAVAILABLE") {
    super(message);
    this.name = "AssistantRequestError";
    this.code = code;
  }
}

/** Convert UI messages into the small, provider-neutral payload used by the Worker. */
export function buildAssistantPayload(messages, limit = DEFAULT_HISTORY_LIMIT) {
  return {
    messages: messages
      .filter(message => !message.pending)
      .slice(-limit)
      .map(message => ({
        role: message.from === "ai" ? "model" : "user",
        text: message.text
      }))
  };
}

/** Request one reply while keeping HTTP and response validation out of React. */
export async function requestAssistantReply(endpoint, messages, fetchImpl = fetch) {
  if (!endpoint) throw new Error("AI assistant URL is not configured.");

  const response = await fetchImpl(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildAssistantPayload(messages))
  });

  const data = await response.json();
  if (!response.ok) {
    throw new AssistantRequestError(
      data.error || "The assistant request failed.",
      data.code
    );
  }
  if (!data.message) throw new Error("The assistant returned an empty response.");
  return data.message;
}
