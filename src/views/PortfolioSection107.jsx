import PortfolioSection102 from "./PortfolioSection102";
import PortfolioSection105 from "./PortfolioSection105";
import PortfolioSection106 from "./PortfolioSection106";
import PortfolioSection103 from "./PortfolioSection103";
function PortfolioSection107({
  BrickBackground,
  GUILD_QUESTS,
  MAIL_ITEMS,
  NAV_ITEMS,
  PROJECTS,
  PixelFrame,
  PixelIcon,
  SKILL_NODES,
  ScanlineOverlay,
  T,
  active,
  beep,
  bodyFont,
  claimQuestXp,
  companion,
  composeEmail,
  composeMsg,
  composeName,
  fontScale,
  isMobile,
  isTablet,
  mailSent,
  mailTab,
  openLetter,
  pixelFont,
  readLetters,
  sendMail,
  setComposeEmail,
  setComposeMsg,
  setComposeName,
  setMailTab,
  setSelectedProjectId,
  setSelectedQuestId,
  setSelectedSkillId,
  unreadCount
}) {
  return <div style={{
    flex: 1,
    background: T.panelAlt,
    border: `3px solid ${T.border}`,
    position: "relative",
    padding: 30,
    overflow: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none"
  }}>
            <BrickBackground theme={T} />
            <ScanlineOverlay />

            {active === "projects" ? <div style={{
      position: "relative",
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
      gap: isMobile ? 14 : 20,
      alignItems: "stretch"
    }}>
                {PROJECTS.map((p, i) => <PixelFrame key={i} theme={T} onClick={() => {
        setSelectedProjectId(i);
        beep(340);
      }} data-platform={companion ? "true" : undefined} style={{
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        height: "100%"
      }}>
                    <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 4
        }}>
                      <PixelFrame theme={T} style={{
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: T.accent
          }}>
                        <PixelIcon name={p.icon || "monitor"} size={22} color={T.bg} />
                      </PixelFrame>
                    </div>
                    <div style={{
          fontFamily: pixelFont,
          fontSize: `${9 * fontScale}px`,
          textAlign: "center",
          lineHeight: 1.6
        }}>{p.title.toUpperCase()}</div>
                    <div style={{
          fontSize: `${10 * fontScale}px`,
          color: T.textDim,
          textAlign: "center"
        }}>{p.desc}</div>
                    <div style={{
          fontSize: `${9 * fontScale}px`,
          color: T.accent,
          textAlign: "center",
          marginTop: "auto"
        }}>{p.tags}</div>
                    <div style={{
          fontSize: `${8 * fontScale}px`,
          color: T.textFaint,
          textAlign: "center"
        }}>
                      CLICK TO INSPECT
                    </div>
                  </PixelFrame>)}
              </div> : active === "skills" ? <PortfolioSection102 PixelFrame={PixelFrame} PixelIcon={PixelIcon} SKILL_NODES={SKILL_NODES} T={T} beep={beep} fontScale={fontScale} isMobile={isMobile} isTablet={isTablet} pixelFont={pixelFont} setSelectedSkillId={setSelectedSkillId} /> : active === "experience" ? <PortfolioSection105 GUILD_QUESTS={GUILD_QUESTS} PixelFrame={PixelFrame} T={T} beep={beep} claimQuestXp={claimQuestXp} fontScale={fontScale} isMobile={isMobile} isTablet={isTablet} pixelFont={pixelFont} setSelectedQuestId={setSelectedQuestId} /> : active === "contact" ? <div style={{
      position: "relative"
    }}>
                {/* Tabs */}
                <div style={{
        display: "flex",
        gap: 10,
        marginBottom: 18
      }}>
                  <PixelFrame theme={T} active={mailTab === "inbox"} onClick={() => {
          setMailTab("inbox");
          beep(320, 0.03);
        }} style={{
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: pixelFont,
          fontSize: `${9 * fontScale}px`
        }}>
                    <PixelIcon name="mail" size={12} color={mailTab === "inbox" ? T.bg : T.accent} />
                    <span style={{
            color: mailTab === "inbox" ? T.bg : T.text
          }}>QUEST MAIL</span>
                    {unreadCount > 0 && <span style={{
            background: mailTab === "inbox" ? T.bg : T.accent,
            color: mailTab === "inbox" ? T.accent : T.bg,
            fontSize: `${8 * fontScale}px`,
            padding: "2px 5px",
            lineHeight: 1
          }}>
                        {unreadCount}
                      </span>}
                  </PixelFrame>
                  <PixelFrame theme={T} active={mailTab === "compose"} onClick={() => {
          setMailTab("compose");
          beep(320, 0.03);
        }} style={{
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: pixelFont,
          fontSize: `${9 * fontScale}px`
        }}>
                    <PixelIcon name="arrow" size={12} color={mailTab === "compose" ? T.bg : T.accent} />
                    <span style={{
            color: mailTab === "compose" ? T.bg : T.text
          }}>SEND SCROLL</span>
                  </PixelFrame>
                </div>

                {mailTab === "inbox" ? <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 10
      }}>
                    {unreadCount > 0 && <div style={{
          fontSize: `${9 * fontScale}px`,
          color: T.accent,
          marginBottom: 2
        }}>
                        {unreadCount} UNCLAIMED DROP{unreadCount > 1 ? "S" : ""} WAITING — CLICK TO CLAIM
                      </div>}
                    {MAIL_ITEMS.map(m => {
          const unread = !readLetters[m.id];
          return <PixelFrame key={m.id} theme={T} onClick={() => openLetter(m.id)} style={{
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            gap: 14
          }}>
                          <PixelFrame theme={T} style={{
              width: 36,
              height: 36,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: unread ? T.accent : T.panel
            }}>
                            <PixelIcon name="mail" size={16} color={unread ? T.bg : T.textDim} />
                          </PixelFrame>
                          <div style={{
              flex: 1,
              minWidth: 0
            }}>
                            <div style={{
                fontFamily: pixelFont,
                fontSize: `${9 * fontScale}px`,
                color: unread ? T.text : T.textDim,
                marginBottom: 6,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}>
                              {m.subject.toUpperCase()}
                            </div>
                            <div style={{
                fontSize: `${10 * fontScale}px`,
                color: T.textDim
              }}>
                              {m.from}
                            </div>
                          </div>
                          {unread && <div style={{
              fontFamily: pixelFont,
              fontSize: `${7 * fontScale}px`,
              color: T.bg,
              background: T.accent,
              padding: "3px 6px",
              flexShrink: 0
            }}>
                              LOOT
                            </div>}
                          <div style={{
              fontSize: `${9 * fontScale}px`,
              color: T.textFaint,
              flexShrink: 0
            }}>{m.date}</div>
                        </PixelFrame>;
        })}
                  </div> : <PortfolioSection106 PixelFrame={PixelFrame} PixelIcon={PixelIcon} T={T} bodyFont={bodyFont} composeEmail={composeEmail} composeMsg={composeMsg} composeName={composeName} fontScale={fontScale} isMobile={isMobile} isTablet={isTablet} mailSent={mailSent} pixelFont={pixelFont} sendMail={sendMail} setComposeEmail={setComposeEmail} setComposeMsg={setComposeMsg} setComposeName={setComposeName} />}
              </div> : active === "about" ? <PortfolioSection103 PixelFrame={PixelFrame} PixelIcon={PixelIcon} T={T} fontScale={fontScale} isMobile={isMobile} pixelFont={pixelFont} /> : <div style={{
      position: "relative",
      color: T.textDim,
      fontSize: `${11 * fontScale}px`,
      textAlign: "center",
      paddingTop: 60
    }}>
                Placeholder content for {NAV_ITEMS.find(n => n.id === active)?.label || active}.
              </div>}
          </div>;
}
export default PortfolioSection107;
