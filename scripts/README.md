# Scripts

This folder contains legacy one-off refactor helpers.

The normal development workflow does not depend on these scripts. Routine commands belong in `package.json` so they are easy to discover with `npm run`.

## Current status

- Nothing in this folder is called by `package.json`.
- These scripts directly rewrite source files.
- Treat them as historical maintenance tools, not everyday commands.

## Existing scripts

### `split-views.mjs`

Purpose: split an older oversized `src/App.jsx` render tree into numbered files under `src/views/`.

Status: legacy. The active app no longer uses `src/views/`, so do not run this for normal feature work.

### `extract-companion-hook.mjs`

Purpose: extract a specific line range from `src/App.jsx` into `src/hooks/useCompanionSystem.js`.

Status: legacy. `useCompanionSystem.js` already exists, so rerunning this can overwrite current work.

## Add a script here only if

- The task is too large or awkward for a short `package.json` command.
- The script has a clear input and output.
- The script is safe to run repeatedly.
- The script is documented in this README.

## Documentation required for new scripts

When adding a script, include:

- What problem it solves.
- When to run it.
- The exact command.
- Required inputs or environment variables.
- Files it reads or writes.
- How to verify the result.

Use this template:

```md
## script-name

Purpose:

When to run:

Command:

Inputs:

Outputs:

Verification:
```

## Normal project commands

Use these from the project root:

```bash
npm run dev
npm run lint
npm test
npm run build
npm run check
```
