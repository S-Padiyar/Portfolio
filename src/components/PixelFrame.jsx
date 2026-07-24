export default function PixelFrame({ children, className = "", theme, style, active, onClick, as, ...rest }) {
  const Comp = as || (onClick ? "button" : "div");
  const elementProps = Comp === "button" ? { type: "button" } : {};

  return (
    <Comp
      onClick={onClick}
      {...elementProps}
      className={`pixel-frame${active ? " pixel-frame--active" : ""}${onClick ? " pixel-frame--interactive" : ""}${className ? ` ${className}` : ""}`}
      style={{
        appearance: "none",
        background: active ? theme.accent : theme.panel,
        border: `2px solid ${active ? theme.accentDark : theme.border}`,
        boxShadow: `3px 3px 0 ${theme.bg}`,
        color: active ? theme.bg : theme.text,
        cursor: onClick ? "pointer" : undefined,
        font: "inherit",
        textDecoration: "none",
        transition: "filter 120ms ease, transform 120ms ease",
        ...style
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
