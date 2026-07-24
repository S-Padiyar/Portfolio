import { useState } from "react";
import PixelFrame from "./PixelFrame";
import PixelIcon from "./PixelIcon";
import { BLOG_POSTS } from "../data/blogPosts";

function HiddenDungeonModal({ T, beep, fontScale, pixelFont, setHiddenRoomOpen }) {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const selectedPost = BLOG_POSTS.find(post => post.id === selectedPostId);

  const closeBlog = () => {
    beep(220);
    setHiddenRoomOpen(false);
  };

  return <div role="presentation" style={{
    position: "fixed",
    inset: 0,
    background: `${T.bg}f2`,
    zIndex: 998,
    padding: 16,
    overflowY: "auto"
  }}>
    <main role="dialog" aria-modal="true" aria-label="Dungeon Journal blog" style={{
      background: T.panel,
      border: `2px solid ${T.border}`,
      boxShadow: `4px 4px 0 ${T.bg}`,
      maxWidth: 920,
      minHeight: "calc(100vh - 32px)",
      margin: "0 auto",
      padding: 24
    }}>
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 16,
        paddingBottom: 16,
        borderBottom: `2px solid ${T.border}`
      }}>
        <div>
          <div style={{
            fontFamily: pixelFont,
            fontSize: `${14 * fontScale}px`,
            color: T.accent,
            lineHeight: 1.5
          }}>Dungeon Journal</div>
          <div style={{
            fontFamily: "var(--copy-font)",
            fontSize: `${12 * fontScale}px`,
            color: T.textDim,
            lineHeight: 1.5,
            marginTop: 4
          }}>Notes on philosophy, life, learning, engineering, and whatever else feels worth exploring.</div>
        </div>
        <button type="button" onClick={closeBlog} title="Close" aria-label="Close Dungeon Journal" style={{
          appearance: "none",
          background: "none",
          border: 0,
          padding: 4,
          cursor: "pointer"
        }}>
          <PixelIcon name="close" size={14} color={T.textDim} />
        </button>
      </header>

      {selectedPost ? <article style={{ maxWidth: 700, margin: "28px auto 0" }}>
        <button type="button" onClick={() => { beep(300); setSelectedPostId(null); }} style={{
          appearance: "none",
          background: "none",
          border: 0,
          padding: 0,
          color: T.accent,
          cursor: "pointer",
          fontFamily: pixelFont,
          fontSize: `${10 * fontScale}px`
        }}>← All posts</button>
        <h1 style={{ fontFamily: pixelFont, fontSize: `${16 * fontScale}px`, color: T.text, lineHeight: 1.5, margin: "24px 0 8px" }}>
          {selectedPost.title}
        </h1>
        <div style={{ fontFamily: "var(--copy-font)", fontSize: `${11 * fontScale}px`, color: T.textDim, marginBottom: 20 }}>
          {selectedPost.date} · {selectedPost.readTime}
        </div>
        {selectedPost.paragraphs.map(paragraph => <p key={paragraph} style={{
          fontFamily: "var(--copy-font)",
          fontSize: `${13 * fontScale}px`,
          color: T.text,
          lineHeight: 1.75,
          margin: "0 0 18px"
        }}>{paragraph}</p>)}
      </article> : <section aria-label="Blog posts" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
        gap: 16,
        marginTop: 24
      }}>
        {BLOG_POSTS.map(post => <PixelFrame key={post.id} theme={T} onClick={() => {
          beep(340);
          setSelectedPostId(post.id);
        }} title={`Read ${post.title}`} style={{
          padding: 18,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 10,
          minHeight: 220
        }}>
          <div style={{ fontFamily: "var(--copy-font)", fontSize: `${10 * fontScale}px`, color: T.textFaint }}>
            {post.date} · {post.readTime}
          </div>
          <h2 style={{ fontFamily: pixelFont, fontSize: `${11 * fontScale}px`, color: T.accent, lineHeight: 1.5, margin: 0 }}>
            {post.title}
          </h2>
          <p style={{ fontFamily: "var(--copy-font)", fontSize: `${12 * fontScale}px`, color: T.textDim, lineHeight: 1.6, margin: 0 }}>
            {post.excerpt}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
            {post.tags.map(tag => <span key={tag} style={{
              border: `1px solid ${T.border}`,
              color: T.textDim,
              padding: "3px 6px",
              fontSize: `${9 * fontScale}px`
            }}>{tag}</span>)}
          </div>
        </PixelFrame>)}
      </section>}
    </main>
  </div>;
}

export default HiddenDungeonModal;
