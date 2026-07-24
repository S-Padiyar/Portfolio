export default function PixelFrame({ children, className = "", theme, style, active, onClick, as, ...rest }) {
  const T = theme;
  const Comp = as || (onClick ? "button" : "div");
  const elementProps = Comp === "button" ? { type: "button" } : {};

  return (
    <Comp
      onClick={onClick}
      {...elementProps}
      className={`pixel-frame${active ? " pixel-frame--active" : ""}${onClick ? " pixel-frame--interactive" : ""}${className ? ` ${className}` : ""}`}
      style={{
        "--frame-bg": theme.panel,
        "--frame-border": theme.border,
        "--frame-shadow": theme.bg,
        "--frame-active": theme.accent,
        "--frame-active-shadow": theme.accentDark,
        ...style
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
