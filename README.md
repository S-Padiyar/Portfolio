# Portfolio

## Setup

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Structure

- `src/App.jsx` — main app component (state, layout, page logic)
- `src/data/` — static content (themes, nav items, projects, quests, mail, skills, achievements, sprite frames, logo/avatar images)
- `src/components/` — reusable UI pieces (pixel icons, frames, decorative backgrounds, sprite renderer, social logos)
- `src/hooks/` — `useViewportWidth`, `useAudioBeep`
