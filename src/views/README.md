# Archived View Snapshots

This folder is an archive, not active application code.

Earlier versions of the portfolio lived as large numbered view files. Those files are preserved here so previous design work is not lost, but the active Vite app is now built from smaller components in `src/components/`.

## Current status

- Not imported by `src/App.jsx`.
- Not imported by `src/main.jsx`.
- Ignored by ESLint through `eslint.config.js`.
- Kept only as historical reference.

## When to use this folder

Use this folder only when you need to look up an older design or behavior from a previous iteration.

Do not make live feature changes here. They will not affect the running portfolio.

## Where live work belongs

```text
src/components/   # UI components by feature
src/data/         # Portfolio content and themes
src/hooks/        # Stateful browser behavior
src/services/     # External requests
src/utils/        # Pure helpers
```

If you restore an old idea from this archive, copy only the useful concept into the active structure and keep the new implementation focused.

## Why this archive exists

The project went through many visual iterations. Deleting those snapshots would remove useful reference material, but keeping them in the active app would make the codebase confusing and slower to maintain.

This folder keeps history without letting history run the app.
