# Large Assets

This folder stores media that should stay in the repository but should not be bundled into the Cloudflare Workers static asset upload.

Cloudflare Workers static assets have a 25 MiB per-file limit. Vite copies everything in `public/` into `dist/`, so oversized PDFs and videos must not live in `public/`.

Current large assets:

- `CyberSages-Engineering-Portfolio.pdf`
- `cybersages-robot-demo.mp4`

The live site links to these through GitHub raw URLs:

```text
https://raw.githubusercontent.com/S-Padiyar/Portfolio/main/large-assets/<file-name>
```

If the production branch changes from `main`, update the URLs in `src/data/`.

For a more production-grade media setup later, move these files to Cloudflare R2 or another object-storage bucket and update the same data URLs.
