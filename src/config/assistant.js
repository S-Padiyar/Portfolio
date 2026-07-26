export const PRODUCTION_ASSISTANT_URL = "https://portfolio-assistant.sunmay-padiyar-dev.workers.dev";

/**
 * Vite build variables are unavailable on Cloudflare static-assets Workers
 * unless they are provided during the build. This public fallback keeps Botmay
 * connected in production while still allowing local overrides through
 * VITE_AI_ASSISTANT_URL.
 */
export function getAssistantEndpoint() {
  return import.meta.env.VITE_AI_ASSISTANT_URL || PRODUCTION_ASSISTANT_URL;
}
