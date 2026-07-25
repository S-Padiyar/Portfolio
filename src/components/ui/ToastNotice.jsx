import { panelSizes } from "@/constants/layout";

/** Consistent notification surface; bottom assigns each notice a non-overlapping lane. */
export default function ToastNotice({ bottom, children, fontScale, theme, tone = "default" }) {
  return <div role="status" aria-live="polite" className="toast-notice" style={{
    bottom, background: theme.panel, borderColor: theme.border, borderLeftColor: theme.accent,
    boxShadow: `2px 2px 0 ${theme.bg}`, color: tone === "muted" ? theme.textDim : theme.text,
    fontSize: `${11 * fontScale}px`,
    "--toast-min-width": `${panelSizes.toastMinWidth}px`,
    "--toast-max-width": `${panelSizes.toastMaxWidth}px`
  }}>{children}</div>;
}
