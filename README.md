# Sunmay Padiyar Portfolio

A game-inspired React portfolio with project, experience, skill, GitHub activity,
contact, achievement, and Companion assistant features.

## Local setup

```bash
npm install
copy .env.example .env.local
npm run dev
```

Set `VITE_AI_ASSISTANT_URL` in `.env.local` to the local or deployed Worker URL.
The rest of the portfolio remains usable if the assistant is unavailable.

## Quality checks

```bash
npm test
npm run build
npm run check
```

## Architecture

```text
src/
|-- components/  # All React UI components
|-- data/        # Static portfolio content and themes
|-- hooks/       # Stateful behavior and browser synchronization
|-- services/    # Formspree, Companion Worker, and GitHub requests
|-- utils/       # Pure calculations
|-- App.jsx      # Top-level state and component composition
|-- index.css    # Global styles
`-- main.jsx     # React entry point
```

This intentionally follows a small Vite application structure. There is one
page, so a router and separate `pages` directory would add complexity without
providing a benefit.

The Cloudflare Worker lives in `worker/`. Copy `worker/.dev.vars.example` to
`worker/.dev.vars` and provide local secrets there. Never put the Gemini key in
the Vite environment because Vite variables are shipped to the browser.

### Where to put new work

- `src/components/` contains focused React views; shared modal, notification, accent-rail, and media behavior lives in `src/components/ui/` or a named reusable component.
- `src/data/` is the single source of truth for portfolio content. Components render these objects instead of repeating project or experience copy.
- `src/hooks/` owns stateful browser behavior, while `src/services/` owns external requests. This keeps rendering code easy to test.
- `worker/src/` separates request validation, Gemini provider calls, prompt content, and response normalization so secrets and policy boundaries stay server-side.
- `src/views/` contains archived numbered snapshots from earlier iterations. It is intentionally not imported by the active Vite entrypoint; new work belongs in `src/components/`.

The shared `ModalShell` is the dismissal boundary for every blocking dialog: it handles Escape, backdrop clicks, body-scroll locking, and focus restoration in one place. `ToastNotice`, `AccentList`, and `MediaGallery` follow the same pattern for notifications, evidence rails, and image details so visual and interaction fixes apply everywhere.