import { useEffect, useRef } from "react";
import PixelIcon from "../PixelIcon";

/**
 * Shared modal boundary for every blocking overlay in the portfolio.
 * Centralizing dismissal and focus behavior prevents dialogs from drifting as the site grows.
 */
export default function ModalShell({ ariaLabel, children, closeLabel = "Close dialog", onClose, panelStyle, theme, zIndex = 998 }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const previouslyFocusedElement = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    // Blocking background scroll keeps the user''s position stable behind the modal.
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const handleKeyDown = event => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedElement?.focus?.();
    };
  }, [onClose]);

  return <div role="presentation" onMouseDown={event => {
    // Only the backdrop dismisses the dialog; interactions inside never do.
    if (event.target === event.currentTarget) onClose();
  }} style={{
    position: "fixed", inset: 0, zIndex, display: "grid", placeItems: "center",
    padding: 20, overflowY: "auto", background: `${theme.bg}dd`
  }}>
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={ariaLabel} tabIndex={-1} style={{
      position: "relative", width: "100%", maxWidth: 720, maxHeight: "90vh",
      overflowY: "auto", padding: 24, background: theme.panel,
      border: `2px solid ${theme.border}`, boxShadow: `4px 4px 0 ${theme.bg}`,
      ...panelStyle
    }}>
      <button type="button" onClick={onClose} title="Close" aria-label={closeLabel}
        className="icon-button" style={{ position: "absolute", zIndex: 3, top: 12, right: 12 }}>
        <PixelIcon name="close" size={12} color={theme.textDim} />
      </button>
      {children}
    </div>
  </div>;
}
