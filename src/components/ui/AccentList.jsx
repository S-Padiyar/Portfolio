/**
 * Shared evidence list for projects, experience, and skills.
 * The accent rail gives supporting details one consistent visual meaning.
 */
export default function AccentList({ fontScale, items, theme }) {
  return <div className="accent-list">
    {items.map((item, index) => <div key={`${index}-${item}`} className="accent-list__item"
      style={{ borderColor: theme.accent, background: theme.panelAlt, color: theme.textDim, fontSize: `${12 * fontScale}px` }}>
      {item}
    </div>)}
  </div>;
}
