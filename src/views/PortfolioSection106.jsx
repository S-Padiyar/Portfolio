function PortfolioSection106({
  PixelFrame,
  PixelIcon,
  T,
  bodyFont,
  composeEmail,
  composeMsg,
  composeName,
  fontScale,
  isMobile,
  isTablet,
  mailSent,
  pixelFont,
  sendMail,
  setComposeEmail,
  setComposeMsg,
  setComposeName
}) {
  return <div style={{
    maxWidth: isMobile ? "100%" : isTablet ? 560 : "min(960px, 100%)",
    width: "100%"
  }}>
                    <div style={{
      fontSize: `${10 * fontScale}px`,
      color: T.textDim,
      marginBottom: 16,
      lineHeight: 1.7
    }}>
                      Got a quest for me — an internship, a sponsorship, a bug bounty? Fire off a scroll below and it'll land straight in my inbox.
                    </div>
                    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 12
    }}>
                      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 12
      }}>
                        <div style={{
          flex: 1
        }}>
                          <div style={{
            fontFamily: pixelFont,
            fontSize: `${8 * fontScale}px`,
            color: T.textDim,
            marginBottom: 6
          }}>
                            PLAYER NAME
                          </div>
                          <input value={composeName} onChange={e => setComposeName(e.target.value)} placeholder="Jane Doe" style={{
            width: "100%",
            background: T.panel,
            border: `2px solid ${T.border}`,
            color: T.text,
            padding: "8px 10px",
            fontSize: `${10 * fontScale}px`,
            fontFamily: bodyFont,
            outline: "none",
            boxSizing: "border-box"
          }} />
                        </div>
                        <div style={{
          flex: 1
        }}>
                          <div style={{
            fontFamily: pixelFont,
            fontSize: `${8 * fontScale}px`,
            color: T.textDim,
            marginBottom: 6
          }}>
                            RESPAWN ADDRESS (EMAIL)
                          </div>
                          <input value={composeEmail} onChange={e => setComposeEmail(e.target.value)} placeholder="jane@example.com" type="email" style={{
            width: "100%",
            background: T.panel,
            border: `2px solid ${T.border}`,
            color: T.text,
            padding: "8px 10px",
            fontSize: `${10 * fontScale}px`,
            fontFamily: bodyFont,
            outline: "none",
            boxSizing: "border-box"
          }} />
                        </div>
                      </div>
                      <div>
                        <div style={{
          fontFamily: pixelFont,
          fontSize: `${8 * fontScale}px`,
          color: T.textDim,
          marginBottom: 6
        }}>
                          MESSAGE
                        </div>
                        <textarea value={composeMsg} onChange={e => setComposeMsg(e.target.value)} placeholder="Say something..." rows={isMobile ? 5 : 8} style={{
          width: "100%",
          background: T.panel,
          border: `2px solid ${T.border}`,
          color: T.text,
          padding: "8px 10px",
          fontSize: `${10 * fontScale}px`,
          fontFamily: bodyFont,
          outline: "none",
          resize: "vertical",
          boxSizing: "border-box"
        }} />
                      </div>
                      <PixelFrame theme={T} onClick={sendMail} style={{
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        fontFamily: pixelFont,
        fontSize: `${10 * fontScale}px`,
        alignSelf: "flex-start",
        marginTop: 4
      }}>
                        <PixelIcon name="mail" size={12} color={T.text} />
                        LAUNCH SCROLL
                      </PixelFrame>
                      {mailSent && <div style={{
        fontSize: `${9 * fontScale}px`,
        color: T.accent
      }}>
                          Scroll away! Opening your email client...
                        </div>}
                    </div>
                  </div>;
}
export default PortfolioSection106;
