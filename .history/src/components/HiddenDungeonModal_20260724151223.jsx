import { useState } from "react";
import PixelFrame from "./PixelFrame";
import PixelIcon from "./PixelIcon";
import ModalShell from "./ui/ModalShell";
import { BLOG_POSTS } from "../data/blogPosts";

/** Keeps the journal readable while the shared shell handles dismissal and focus. */
function HiddenDungeonModal({ theme, beep, fontScale, pixelFont, setHiddenRoomOpen }) {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const selectedPost = BLOG_POSTS.find(post => post.id === selectedPostId);
  const closeJournal = () => {
    beep(220);
    setHiddenRoomOpen(false);
  };

  return <ModalShell ariaLabel="Dungeon Journal blog" closeLabel="Close Dungeon Journal" onClose={closeJournal} panelStyle={{ maxWidth: 920, minHeight: "calc(100vh - 32px)", padding: 24 }} theme={theme}>
    <header className="modal-journal-header" style={{ borderColor: theme.border }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <PixelFrame theme={theme} style={{ width: 38, height: 38, display: "grid", placeItems: "center", background: theme.accent, flexShrink: 0 }}>
          <PixelIcon name="book" size={20} color={theme.bg} />
        </PixelFrame>
        <div style={{ minHeight: 38, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: pixelFont, fontSize: `${14 * fontScale}px`, color: theme.accent, lineHeight: 1.2 }}>Dungeon Journal</div>
          <div style={{ fontFamily: "var(--copy-font)", fontSize: `${12 * fontScale}px`, color: theme.textDim, lineHeight: 1.35, marginTop: 1 }}>
            Notes on learning, engineering, whatever that's on my mind.
          </div>
        </div>
      </div>
    </header>

    {selectedPost ? <article style={{ maxWidth: 700, margin: "28px auto 0" }}>
      <button type="button" className="text-button" onClick={() => { beep(300); setSelectedPostId(null); }} style={{ color: theme.accent, fontFamily: pixelFont, fontSize: `${10 * fontScale}px` }}>
        &lt;- All posts
      </button>
      <h1 style={{ fontFamily: pixelFont, fontSize: `${16 * fontScale}px`, color: theme.text, lineHeight: 1.5, margin: "24px 0 8px" }}>{selectedPost.title}</h1>
      <div style={{ fontFamily: "var(--copy-font)", fontSize: `${11 * fontScale}px`, color: theme.textDim, marginBottom: 20 }}>{selectedPost.date} &middot; {selectedPost.readTime}</div>
      {selectedPost.paragraphs.map(paragraph => <p key={paragraph} style={{ fontFamily: "var(--copy-font)", fontSize: `${13 * fontScale}px`, color: theme.text, lineHeight: 1.75, margin: "0 0 18px" }}>{paragraph}</p>)}
      {selectedPost.href && <PixelFrame as="a" href={selectedPost.href} target="_blank" rel="noopener noreferrer" theme={theme} title={selectedPost.href} style={{
        display: "inline-flex",
        marginTop: 6,
        padding: "10px 14px",
        color: theme.text,
        fontFamily: pixelFont,
        fontSize: `${10 * fontScale}px`
      }}>
        Open PDF
      </PixelFrame>}
    </article> : BLOG_POSTS.length > 0 ? <section aria-label="Blog posts" className="modal-card-grid">
      {BLOG_POSTS.map(post => <PixelFrame key={post.id} as={post.href ? "a" : undefined} href={post.href} target={post.href ? "_blank" : undefined} rel={post.href ? "noopener noreferrer" : undefined} theme={theme} onClick={post.href ? () => beep(340) : () => { beep(340); setSelectedPostId(post.id); }} title={post.href || `Read ${post.title}`} style={{ padding: 18, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10, minHeight: 220 }}>
        <div style={{ fontFamily: "var(--copy-font)", fontSize: `${10 * fontScale}px`, color: theme.textFaint }}>{post.date} &middot; {post.readTime}</div>
        <h2 style={{ fontFamily: pixelFont, fontSize: `${11 * fontScale}px`, color: theme.accent, lineHeight: 1.5, margin: 0 }}>{post.title}</h2>
        <p style={{ fontFamily: "var(--copy-font)", fontSize: `${12 * fontScale}px`, color: theme.textDim, lineHeight: 1.6, margin: 0 }}>{post.excerpt}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>{post.tags.map(tag => <span key={tag} style={{ border: `1px solid ${theme.border}`, color: theme.textDim, padding: "3px 6px", fontSize: `${9 * fontScale}px` }}>{tag}</span>)}</div>
      </PixelFrame>)}
    </section> : <div className="empty-state" style={{ marginTop: 24, background: theme.panelAlt, borderColor: theme.border, color: theme.textDim, fontSize: `${13 * fontScale}px` }}>
      There are no blog posts at this time. Check back later.
    </div>}
  </ModalShell>;
}

export default HiddenDungeonModal;
