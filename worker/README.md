# Portfolio assistant Worker

This Worker keeps the Gemini API key out of the browser and limits the assistant
to verified portfolio facts.

1. Replace `ALLOWED_ORIGIN` in `wrangler.jsonc` with the deployed portfolio origin.
2. From this directory, run `npx wrangler login`.
3. Add the key without committing it: `npx wrangler secret put GEMINI_API_KEY`.
4. Deploy with `npx wrangler deploy`.
5. Copy the Worker URL into the portfolio host's `VITE_AI_ASSISTANT_URL` build variable.

For local Worker development, put `GEMINI_API_KEY=...` in `worker/.dev.vars`.
That file is ignored by Git.
