# Portfolio Style Guide

This project should feel like one game-inspired product, not a pile of one-off UI pieces.

## Naming

- Components use `PascalCase`: `CompanionPanel.jsx`, `SkillTree.jsx`.
- Hooks use `camelCase` with a `use` prefix: `useProgression.js`.
- Services describe the external boundary: `assistantClient.js`, `contactService.js`.
- Static content belongs in `src/data/`; repeated layout values belong in `src/constants/`.

## Component folders

- `components/layout/`: app shell, navigation, status panels, and page composition.
- `components/ui/`: reusable primitives such as pixel frames, icons, sprites, modals, toasts, and media helpers.
- `components/assistant/`: Botmay conversation UI.
- `components/contact/`: mailbox, contact form, and opened letters.
- `components/profile/`: character sheet.
- `components/projects/`: trophy case views.
- `components/experience/`: guild hall views.
- `components/skills/`: skill tree views.
- `components/settings/`: settings and achievements panel.
- `components/dungeon/`: hidden journal views.
- `components/games/`: inactive/experimental game vault code.

Use `@/` imports for source files so nested components stay readable.

## Design tokens

- Use `src/constants/layout.js` for repeated spacing and panel-size decisions.
- Keep one-off pixel-perfect values local only when they are specific to a component.
- Use theme tokens from `src/data/themes.js` instead of raw colors in components.
- Preserve the pixel/game visual identity; do not replace it with generic modern cards.

## UI rules

- Related text should be visually grouped with small gaps.
- Unrelated sections should use larger spacing from the shared spacing scale.
- Buttons and links must remain semantic elements.
- Inputs need real labels; placeholders are hints, not labels.
- Modals should use `ModalShell` unless a deliberately custom modal behavior is required.
- Notifications should use `ToastNotice`.

## Security and data

- Never put secrets in frontend code or `VITE_*` variables.
- Gemini keys belong in `worker/.dev.vars` locally or Cloudflare secrets in production.
- Assistant text is rendered as React text/elements, never raw HTML.
- Keep API request logic in `services/` or `worker/src/`, not inside visual components.

## Validation

Run before handing off changes:

```bash
npm.cmd run check
```

Run dependency audit when security-sensitive code or dependencies change:

```bash
npm.cmd audit --audit-level=moderate
```
