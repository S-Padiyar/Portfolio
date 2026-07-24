import { useEffect, useRef, useState } from "react";
import PixelFrame from "./PixelFrame";
import PixelSprite from "./PixelSprite";
import usePersistentState from "../hooks/usePersistentState";

const GAME_HEIGHT = 320;

function ResultOverlay({ theme, children, onRestart, title }) {
  return <div style={{ position: "absolute", inset: 0, zIndex: 5, display: "grid", placeItems: "center", background: `${theme.bg}e8`, padding: 16 }}>
    <PixelFrame theme={theme} style={{ padding: 18, textAlign: "center", maxWidth: 360 }}>
      <div style={{ color: theme.accent, marginBottom: 9 }}>{title}</div>
      <div style={{ color: theme.textDim, fontFamily: "var(--copy-font)", fontSize: 12, lineHeight: 1.55, marginBottom: 12 }}>{children}</div>
      <PixelFrame theme={theme} onClick={onRestart} style={{ padding: "8px 13px" }}>Play again</PixelFrame>
    </PixelFrame>
  </div>;
}

export function SkyboundGame({ theme, beep, fontScale }) {
  const arenaRef = useRef(null);
  const physicsRef = useRef({ y: 130, velocity: 0, pipes: [], score: 0, nextPipe: 0 });
  const [view, setView] = useState({ y: 130, velocity: 0, pipes: [], score: 0 });
  const [status, setStatus] = useState("ready");
  const [best, setBest] = usePersistentState("portfolio:skybound-best", 0, Number.isInteger);

  const flap = () => {
    if (status === "over") return;
    if (status === "ready") setStatus("running");
    physicsRef.current.velocity = -7.4;
    beep(590, 0.025);
  };

  useEffect(() => {
    const keyDown = event => {
      if (event.key !== " " && event.key !== "ArrowUp") return;
      event.preventDefault();
      flap();
    };
    window.addEventListener("keydown", keyDown);
    return () => window.removeEventListener("keydown", keyDown);
  });

  useEffect(() => {
    if (status !== "running") return undefined;
    let frame;
    let previous = performance.now();
    const tick = now => {
      const arena = arenaRef.current;
      if (!arena) return;
      const dt = Math.min(2, (now - previous) / 16.67);
      previous = now;
      const width = arena.clientWidth;
      const p = physicsRef.current;
      p.velocity += 0.42 * dt;
      p.y += p.velocity * dt;
      p.nextPipe -= 2.8 * dt;
      if (p.nextPipe <= 0) {
        const gapY = 72 + Math.random() * 150;
        p.pipes.push({ id: now, x: width + 20, gapY, gap: 102, scored: false });
        p.nextPipe = Math.max(145, width * 0.42);
      }
      p.pipes.forEach(pipe => { pipe.x -= 2.8 * dt; });
      p.pipes = p.pipes.filter(pipe => pipe.x > -70);
      p.pipes.forEach(pipe => {
        if (!pipe.scored && pipe.x < 78) {
          pipe.scored = true;
          p.score += 1;
          beep(800, 0.025);
        }
      });
      const hitPipe = p.pipes.some(pipe => pipe.x < 112 && pipe.x + 54 > 78 && (p.y < pipe.gapY || p.y + 28 > pipe.gapY + pipe.gap));
      if (p.y < 0 || p.y + 28 > GAME_HEIGHT - 20 || hitPipe) {
        setBest(value => Math.max(value, p.score));
        setStatus("over");
        beep(150, 0.08);
        return;
      }
      setView({ y: p.y, velocity: p.velocity, pipes: p.pipes.map(pipe => ({ ...pipe })), score: p.score });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [beep, setBest, status]);

  const restart = () => {
    physicsRef.current = { y: 130, velocity: 0, pipes: [], score: 0, nextPipe: 100 };
    setView({ y: 130, velocity: 0, pipes: [], score: 0 });
    setStatus("ready");
  };

  return <div>
    <div style={{ display: "flex", justifyContent: "space-between", color: theme.textDim, fontSize: `${10 * fontScale}px`, marginBottom: 8 }}><span>Score <b style={{ color: theme.accent }}>{view.score}</b></span><span>Best <b style={{ color: theme.accent }}>{best}</b></span></div>
    <div ref={arenaRef} onPointerDown={flap} style={{ position: "relative", height: GAME_HEIGHT, overflow: "hidden", touchAction: "none", cursor: "pointer", background: `linear-gradient(${theme.accentDark}44, ${theme.panelAlt} 58%, ${theme.bg})`, border: `2px solid ${theme.border}` }}>
      {[12, 32, 59, 84].map((left, index) => <div key={left} style={{ position: "absolute", left: `${left}%`, top: 35 + index * 39, width: 45, height: 7, background: theme.textFaint, opacity: .18 }} />)}
      {view.pipes.map(pipe => <div key={pipe.id}>
        <div style={{ position: "absolute", left: pipe.x, top: 0, width: 54, height: pipe.gapY, background: theme.border, border: `3px solid ${theme.accentDark}`, borderTop: 0 }} />
        <div style={{ position: "absolute", left: pipe.x, top: pipe.gapY + pipe.gap, bottom: 20, width: 54, background: theme.border, border: `3px solid ${theme.accentDark}`, borderBottom: 0 }} />
      </div>)}
      <div style={{ position: "absolute", left: 78, top: view.y, transform: `rotate(${Math.max(-18, Math.min(35, view.velocity * 4))}deg)` }}><PixelSprite frame={view.velocity < 0 ? "jump" : "idle"} size={30} color={theme.accent} /></div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 20, background: theme.border }} />
      {status === "ready" && <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: `${theme.bg}88`, textAlign: "center", color: theme.text }}><div><div style={{ color: theme.accent, marginBottom: 8 }}>Skybound</div><div style={{ fontFamily: "var(--copy-font)", fontSize: 12 }}>Tap, Space, or ↑ to fly</div></div></div>}
      {status === "over" && <ResultOverlay theme={theme} title="Run over" onRestart={restart}>You cleared {view.score} gates. Best: {Math.max(best, view.score)}.</ResultOverlay>}
    </div>
    <PixelFrame as="button" theme={theme} onPointerDown={flap} style={{ width: "100%", marginTop: 10, padding: 11, textAlign: "center" }}>Flap</PixelFrame>
  </div>;
}

export function CoreCollectorGame({ theme, beep, fontScale }) {
  const arenaRef = useRef(null);
  const controlsRef = useRef({ left: false, right: false, up: false, down: false });
  const worldRef = useRef({ x: 130, y: 245, hazards: [], cores: [], score: 0, lives: 3, spawn: 0, coreSpawn: 70 });
  const [view, setView] = useState({ x: 130, y: 245, hazards: [], cores: [], score: 0, lives: 3 });
  const [over, setOver] = useState(false);
  const [best, setBest] = usePersistentState("portfolio:core-collector-best", 0, Number.isInteger);

  useEffect(() => {
    const keys = { ArrowLeft: "left", a: "left", ArrowRight: "right", d: "right", ArrowUp: "up", w: "up", ArrowDown: "down", s: "down" };
    const update = (event, value) => {
      const control = keys[event.key];
      if (!control) return;
      controlsRef.current[control] = value;
      event.preventDefault();
    };
    const down = event => update(event, true);
    const up = event => update(event, false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);

  useEffect(() => {
    if (over) return undefined;
    let frame;
    let previous = performance.now();
    const tick = now => {
      const arena = arenaRef.current;
      if (!arena) return;
      const dt = Math.min(2, (now - previous) / 16.67);
      previous = now;
      const width = arena.clientWidth;
      const world = worldRef.current;
      const c = controlsRef.current;
      world.x = Math.max(4, Math.min(width - 32, world.x + (Number(c.right) - Number(c.left)) * 4.2 * dt));
      world.y = Math.max(34, Math.min(GAME_HEIGHT - 38, world.y + (Number(c.down) - Number(c.up)) * 4.2 * dt));
      world.spawn -= dt;
      world.coreSpawn -= dt;
      if (world.spawn <= 0) {
        world.hazards.push({ id: now, x: Math.random() * Math.max(40, width - 28), y: -24, speed: 2.2 + world.score * .035 });
        world.spawn = Math.max(18, 52 - world.score * .8);
      }
      if (world.coreSpawn <= 0) {
        world.cores.push({ id: now + 1, x: 15 + Math.random() * Math.max(20, width - 45), y: -20 });
        world.coreSpawn = 100;
      }
      world.hazards.forEach(item => { item.y += item.speed * dt; });
      world.cores.forEach(item => { item.y += 1.8 * dt; });
      const collides = item => Math.abs(world.x - item.x) < 25 && Math.abs(world.y - item.y) < 25;
      const hit = world.hazards.find(collides);
      if (hit) {
        world.hazards = world.hazards.filter(item => item.id !== hit.id);
        world.lives -= 1;
        beep(160, 0.07);
      }
      const caught = world.cores.filter(collides);
      if (caught.length) {
        world.score += caught.length;
        const ids = new Set(caught.map(item => item.id));
        world.cores = world.cores.filter(item => !ids.has(item.id));
        beep(840, 0.035);
      }
      world.hazards = world.hazards.filter(item => item.y < GAME_HEIGHT + 30);
      world.cores = world.cores.filter(item => item.y < GAME_HEIGHT + 30);
      if (world.lives <= 0) {
        setBest(value => Math.max(value, world.score));
        setOver(true);
        return;
      }
      setView({ ...world, hazards: [...world.hazards], cores: [...world.cores] });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [beep, over, setBest]);

  const restart = () => {
    worldRef.current = { x: 130, y: 245, hazards: [], cores: [], score: 0, lives: 3, spawn: 0, coreSpawn: 55 };
    setView({ ...worldRef.current });
    setOver(false);
  };
  return <div>
    <div style={{ display: "flex", justifyContent: "space-between", color: theme.textDim, fontSize: `${10 * fontScale}px`, marginBottom: 8 }}><span>Cores <b style={{ color: theme.accent }}>{view.score}</b></span><span>Lives <b style={{ color: theme.accent }}>{"♥".repeat(Math.max(0, view.lives))}</b></span><span>Best <b style={{ color: theme.accent }}>{best}</b></span></div>
    <div ref={arenaRef} style={{ position: "relative", height: GAME_HEIGHT, overflow: "hidden", touchAction: "none", background: `radial-gradient(circle at center, ${theme.panelAlt}, ${theme.bg})`, border: `2px solid ${theme.border}` }}>
      {view.hazards.map(item => <div key={item.id} style={{ position: "absolute", left: item.x, top: item.y, width: 22, height: 22, background: "#d45f5f", transform: "rotate(45deg)", border: `2px solid ${theme.textFaint}` }} />)}
      {view.cores.map(item => <div key={item.id} style={{ position: "absolute", left: item.x, top: item.y, width: 14, height: 14, background: theme.accent, boxShadow: `0 0 12px ${theme.accent}`, transform: "rotate(45deg)" }} />)}
      <div style={{ position: "absolute", left: view.x, top: view.y }}><PixelSprite frame="walk1" size={30} color={theme.accent} /></div>
      {over && <ResultOverlay theme={theme} title="System overloaded" onRestart={restart}>You recovered {view.score} cores. Best: {Math.max(best, view.score)}.</ResultOverlay>}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 54px)", gridTemplateRows: "repeat(2, 42px)", justifyContent: "center", gap: 6, marginTop: 10 }}>
      <span /><PixelFrame as="button" theme={theme} onPointerDown={() => { controlsRef.current.up = true; }} onPointerUp={() => { controlsRef.current.up = false; }} onPointerLeave={() => { controlsRef.current.up = false; }} style={{ display: "grid", placeItems: "center" }}>↑</PixelFrame><span />
      <PixelFrame as="button" theme={theme} onPointerDown={() => { controlsRef.current.left = true; }} onPointerUp={() => { controlsRef.current.left = false; }} onPointerLeave={() => { controlsRef.current.left = false; }} style={{ display: "grid", placeItems: "center" }}>Left</PixelFrame><PixelFrame as="button" theme={theme} onPointerDown={() => { controlsRef.current.down = true; }} onPointerUp={() => { controlsRef.current.down = false; }} onPointerLeave={() => { controlsRef.current.down = false; }} style={{ display: "grid", placeItems: "center" }}>↓</PixelFrame><PixelFrame as="button" theme={theme} onPointerDown={() => { controlsRef.current.right = true; }} onPointerUp={() => { controlsRef.current.right = false; }} onPointerLeave={() => { controlsRef.current.right = false; }} style={{ display: "grid", placeItems: "center" }}>Right</PixelFrame>
    </div>
  </div>;
}
