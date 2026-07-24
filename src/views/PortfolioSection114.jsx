function PortfolioSection114({
  PixelIcon,
  T,
  fontScale,
  pixelFont,
  setHiddenRoomOpen
}) {
  return <div style={{
    position: "fixed",
    inset: 0,
    background: `${T.bg}dd`,
    zIndex: 998,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  }} onClick={() => setHiddenRoomOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{
      background: T.panel,
      border: `3px solid ${T.border}`,
      boxShadow: `4px 4px 0 ${T.bg}`,
      padding: 24,
      maxWidth: 420,
      width: "100%",
      position: "relative"
    }}>
            <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14
      }}>
              <div style={{
          fontFamily: pixelFont,
          fontSize: `${11 * fontScale}px`,
          color: T.accent,
          lineHeight: 1.6
        }}>HIDDEN DUNGEON</div>
              <div onClick={() => setHiddenRoomOpen(false)} style={{
          cursor: "pointer"
        }}>
                <PixelIcon name="close" size={14} color={T.textDim} />
              </div>
            </div>
            <div style={{
        fontSize: `${10 * fontScale}px`,
        color: T.textDim,
        lineHeight: 1.7
      }}>
              You found the secret room. This is where the placeholder bloopers, dumb jokes, and deleted scenes go once
              you write them. Replace this with whatever weird thing you want only the curious ones to find.
            </div>
          </div>
        </div>;
}
export default PortfolioSection114;
