# Portfolio Assistant Worker

This Cloudflare Worker powers Botmay, the AI companion inside the portfolio.

The Worker exists for one main reason: the Gemini API key must never be exposed to the browser. The frontend sends a small JSON request to this Worker, and the Worker validates the request before calling Gemini with portfolio-specific context.

## Responsibilities

- Keep `GEMINI_API_KEY` server-side.
- Enforce the allowed frontend origin through CORS.
- Accept only JSON `POST` requests.
- Validate and trim user messages.
- Limit the transcript sent to Gemini.
- Normalize Gemini responses before returning them to the frontend.
- Return friendly high-demand/rate-limit errors that the chat UI can display.

## Files

```text
worker/
|-- src/
|   |-- geminiClient.js    # Gemini API boundary
|   |-- index.js           # Worker request handler
|   |-- requestUtils.js    # Validation, CORS, transcript helpers
|   `-- systemPrompt.js    # Botmay behavior and verified portfolio knowledge
|-- test/                  # Worker and request utility tests
|-- .dev.vars.example      # Safe local environment template
|-- README.md
`-- wrangler.jsonc         # Worker deployment config
```

## Local setup

From the project root, install dependencies if you have not already:

```bash
npm install
```

Create local Worker secrets:

```bash
copy worker\.dev.vars.example worker\.dev.vars
```

Edit `worker/.dev.vars`:

```env
GEMINI_API_KEY=your-gemini-key
ALLOWED_ORIGIN=http://localhost:5173
```

Run the Worker from the `worker` directory:

```bash
cd worker
npx wrangler dev
```

Wrangler should start the Worker at:

```text
http://127.0.0.1:8787
```

Then set the frontend variable in `.env.local`:

```env
VITE_AI_ASSISTANT_URL=http://127.0.0.1:8787
```

Start the frontend from the project root:

```bash
npm run dev
```

## Production setup

Log in to Cloudflare:

```bash
cd worker
npx wrangler login
```

Set the Gemini key as a Worker secret:

```bash
npx wrangler secret put GEMINI_API_KEY
```

Update `worker/wrangler.jsonc`:

```jsonc
"vars": {
  "ALLOWED_ORIGIN": "https://your-portfolio-domain.com"
}
```

Deploy:

```bash
npx wrangler deploy
```

Copy the deployed Worker URL into the frontend host’s `VITE_AI_ASSISTANT_URL` build variable.

## Request format

The frontend sends:

```json
{
  "message": "Who is Sunmay?",
  "messages": [
    { "role": "user", "text": "What projects are here?" },
    { "role": "assistant", "text": "Check the Trophy Case." }
  ]
}
```

The Worker returns:

```json
{
  "reply": "Sunmay is a Georgia Tech computer science student interested in systems, robotics, and software engineering."
}
```

## Testing

From the project root:

```bash
npm run test:unit
```

The Worker tests cover request validation, CORS behavior, transcript normalization, Gemini response handling, and high-demand error mapping.

For the full project gate:

```bash
npm run check
```

## Security rules

- Do not commit `worker/.dev.vars`.
- Do not place `GEMINI_API_KEY` in `.env.local`.
- Do not create a `VITE_GEMINI_API_KEY`; Vite would expose it to the browser.
- Keep Botmay facts in `worker/src/systemPrompt.js` so the model uses verified site knowledge.
- Treat browser-provided transcript messages as untrusted text.
- Keep response rendering on the frontend as React text/elements, not raw HTML.

## Troubleshooting

### The browser says Botmay cannot connect

Check that:

- `npx wrangler dev` is running.
- `.env.local` points to the Worker URL.
- `ALLOWED_ORIGIN` matches the frontend origin exactly.
- The Worker terminal is not showing a CORS or JSON validation error.

### Wrangler reports both root and Worker configs

Run Wrangler from the intended directory:

```bash
cd worker
npx wrangler dev
```

This avoids accidentally mixing the root static-site config with the assistant Worker config.

### Gemini returns a high-demand error

The Worker preserves that error type so the frontend can show a useful chat message. Wait and retry, or switch to a different provider later if the project grows.
