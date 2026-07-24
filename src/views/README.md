# Archived view snapshots

The active application is composed from the focused components in `src/components` and the state/data modules in `src/hooks`, `src/services`, and `src/data`. The numbered files in this folder are preserved snapshots from earlier iterations; they are not imported by `src/App.jsx` or the Vite entrypoint.

Keeping this archive avoids losing historical work while preventing it from participating in the build. New UI work belongs in `src/components` with one responsibility per file.