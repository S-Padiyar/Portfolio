const GITHUB_RAW_LARGE_ASSET_BASE = "https://raw.githubusercontent.com/S-Padiyar/Portfolio/main/large-assets";

/**
 * Large files cannot live in public/ because Cloudflare Workers assets have a
 * 25 MiB per-file limit. During local development Vite serves large-assets/
 * through a dev-only middleware; production uses GitHub raw URLs.
 */
export function largeAssetUrl(fileName) {
  const safeFileName = encodeURIComponent(fileName);
  const isViteDev = import.meta.env?.DEV === true;
  return isViteDev
    ? `/large-assets/${safeFileName}`
    : `${GITHUB_RAW_LARGE_ASSET_BASE}/${safeFileName}`;
}
