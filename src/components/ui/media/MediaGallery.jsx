import { useState } from "react";
import MediaInfoModal from "@/components/ui/media/MediaInfoModal";

/**
 * Renders a consistent evidence gallery for projects and experience entries.
 * Keeping image sizing and the detail viewer here prevents each modal from
 * inventing its own cropping, spacing, and dismissal behavior.
 */
export default function MediaGallery({ beep, fontScale, items = [], label = "Project images", pixelFont, theme }) {
  const [selectedMedia, setSelectedMedia] = useState(null);
  if (items.length === 0) return null;

  return <>
    <div className="media-gallery" aria-label={label}>
      {items.map((item, index) => item.type === "video" ? <div key={`${item.src}-${index}`} className="media-gallery__item" style={{ background: theme.panelAlt, borderColor: theme.border }}>
        <video controls preload="metadata" src={item.src} aria-label={item.label || "Project video"} />
      </div> : <button key={`${item.src}-${index}`} type="button" className="media-gallery__item media-gallery__button"
        onClick={() => { beep?.(300, 0.04); setSelectedMedia({ ...item, caption: item.caption || item.alt }); }}
        title={`View ${item.alt || "image"}`} aria-label={`View ${item.alt || "image"}`}>
        {item.objectFit !== "cover" && <span aria-hidden="true" style={{
          position: "absolute",
          inset: -10,
          backgroundImage: `linear-gradient(${theme.bg}88, ${theme.bg}88), url(${item.src})`,
          backgroundPosition: item.objectPosition || "center",
          backgroundSize: "cover",
          filter: "blur(7px)",
          transform: "scale(1.06)"
        }} />}
        <img src={item.src} alt={item.alt || "Project image"} style={{ position: "relative", zIndex: 1, objectFit: item.objectFit || "contain", objectPosition: item.objectPosition || "center" }} />
      </button>)}
    </div>
    {selectedMedia && <MediaInfoModal fontScale={fontScale} media={selectedMedia} onClose={() => setSelectedMedia(null)} pixelFont={pixelFont} theme={theme} />}
  </>;
}
