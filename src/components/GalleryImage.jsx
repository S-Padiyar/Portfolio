/** Consistent media frame with optional on-demand image information. */
export default function GalleryImage({ image, onInfo, theme }) {
  const contained = image.objectFit !== "cover";
  const frame = <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", overflow: "hidden", background: theme.panelAlt, border: `1px solid ${theme.border}` }}>
    {contained && <div aria-hidden="true" style={{ position: "absolute", inset: -10, backgroundImage: `linear-gradient(${theme.bg}88, ${theme.bg}88), url(${image.src})`, backgroundPosition: image.objectPosition || "center", backgroundSize: "cover", filter: "blur(7px)", transform: "scale(1.06)" }} />}
    <img src={image.src} alt={image.alt} style={{ position: "relative", zIndex: 1, display: "block", width: "100%", height: "100%", objectFit: contained ? "contain" : "cover", boxSizing: "border-box", transform: image.offsetX ? `translateX(${image.offsetX}px) scale(1.01)` : undefined, objectPosition: image.objectPosition || "center" }} />
  </div>;

  if (!onInfo) return frame;

  return <button type="button" onClick={onInfo} title="Image information" aria-label={`Image information: ${image.alt}`} style={{ appearance: "none", display: "block", width: "100%", padding: 0, border: 0, background: "transparent", cursor: "pointer" }}>
    {frame}
  </button>;
}
