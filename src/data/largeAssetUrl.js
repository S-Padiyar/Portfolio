const GITHUB_BLOB_LARGE_ASSET_BASE = "https://github.com/S-Padiyar/Portfolio/blob/main/large-assets";
const GITHUB_RAW_LARGE_ASSET_BASE = "https://raw.githubusercontent.com/S-Padiyar/Portfolio/main/large-assets";

/**
 * Large files cannot live in public/ because Cloudflare Workers assets have a
 * 25 MiB per-file limit. During local development Vite serves large-assets/
 * through a dev-only middleware; production uses GitHub raw URLs.
 */
export function largeAssetUrl(fileName, { raw = true } = {}) {
  const safeFileName = encodeURIComponent(fileName);
  const isViteDev = import.meta.env?.DEV === true;
  if (isViteDev) return `/large-assets/${safeFileName}`;

  const baseUrl = raw ? GITHUB_RAW_LARGE_ASSET_BASE : GITHUB_BLOB_LARGE_ASSET_BASE;
  return `${baseUrl}/${safeFileName}`;
}
