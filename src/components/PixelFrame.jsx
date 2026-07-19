import React from "react";

export default function PixelFrame({ children, theme, style, active, onClick, as = "div", ...rest }) {
  const T = theme;
  const Comp = as;
  return (
    <Comp
      onClick={onClick}
      style={{
        position: "relative",
        background: active ? T.accent : T.panel,
        border: `2px solid ${active ? T.accent : T.border}`,
        boxShadow: active ? `2px 2px 0 ${T.accentDark}` : `2px 2px 0 ${T.bg}`,
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
