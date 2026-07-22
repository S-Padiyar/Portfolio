export default function PixelFrame({ children, theme, style, active, onClick, as, ...rest }) {
  const T = theme;
  const Comp = as || (onClick ? "button" : "div");
  const elementProps = Comp === "button" ? { type: "button" } : {};

  return (
    <Comp
      onClick={onClick}
      {...elementProps}
      style={{
        appearance: Comp === "button" ? "none" : undefined,
        color: "inherit",
        font: "inherit",
        textAlign: "inherit",
        position: "relative",
        background: active ? T.accent : T.panel,
        border: `2px solid ${active ? T.accent : T.border}`,
        boxShadow: active ? `2px 2px 0 ${T.accentDark}` : `2px 2px 0 ${T.bg}`,
        cursor: onClick ? "pointer" : "default",
        ...style
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
