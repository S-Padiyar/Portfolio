import { useEffect, useRef, useState } from "react";
import PixelFrame from "@/components/ui/PixelFrame";
import PixelSprite from "@/components/ui/PixelSprite";

const WORLD_WIDTH = 1500;
const PLATFORM_DATA = [
  { x: 190, y: 188, width: 150 }, { x: 410, y: 137, width: 145 },
  { x: 650, y: 185, width: 130 }, { x: 870, y: 120, width: 155 },
  { x: 1110, y: 174, width: 145 }, { x: 1300, y: 112, width: 115 }
];
const SPIKE_POSITIONS = [355, 590, 810, 1050, 1270];
const SHARD_DATA = [
  { x: 245, y: 148 }, { x: 475, y: 97 }, { x: 710, y: 145 },
  { x: 940, y: 80 }, { x: 1175, y: 134 }, { x: 1350, y: 72 }
];
const START = { x: 14, y: 220, vy: 0, grounded: true, jumps: 0 };

export default function CompanionRunGame({ theme, beep, fontScale }) {
  const arenaRef = useRef(null);
  const controlsRef = useRef({ left: false, right: false, jump: false });
  const physicsRef = useRef({ ...START });
  const collectedRef = useRef([]);
  const facingRef = useRef(1);
  const startTimeRef = useRef(null);
  const [player, setPlayer] = useState({ x: START.x, y: START.y, facing: 1, camera: 0 });
  const [collected, setCollected] = useState([]);
  const [damage, setDamage] = useState(0);
  const [won, setWon] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [droneX, setDroneX] = useState(0);

  useEffect(() => {
    const updateKey = (event, pressed) => {
      if (event.key === "ArrowLeft") controlsRef.current.left = pressed;
      else if (event.key === "ArrowRight") controlsRef.current.right = pressed;
      else if (pressed && (event.key === "ArrowUp" || event.key === " ") && !event.repeat) controlsRef.current.jump = true;
      else return;
      event.preventDefault();
    };
    const keyDown = event => updateKey(event, true);
    const keyUp = event => updateKey(event, false);
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, []);

  useEffect(() => {
    if (won) return undefined;
    let frame;
    let previousTime = performance.now();
    let displayedSecond = -1;
    const respawn = () => {
      physicsRef.current = { ...START };
      setDamage(value => value + 1);
      beep(160, 0.07);
    };
    const tick = now => {
      const arena = arenaRef.current;
      if (!arena) return;
      if (startTimeRef.current === null) startTimeRef.current = now;
      const width = arena.clientWidth;
      const dt = Math.min(2, (now - previousTime) / 16.67);
      previousTime = now;
      const p = physicsRef.current;
      const previousY = p.y;
      const direction = Number(controlsRef.current.right) - Number(controlsRef.current.left);
      if (direction) facingRef.current = direction;
      p.x = Math.max(2, Math.min(WORLD_WIDTH - 32, p.x + direction * 4.25 * dt));
      if (controlsRef.current.jump && p.jumps < 2) {
        p.vy = p.jumps === 0 ? -11.5 : -9.4;
        p.jumps += 1;
        p.grounded = false;
        beep(p.jumps === 1 ? 510 : 680, 0.035);
      }
      controlsRef.current.jump = false;
      p.vy += 0.62 * dt;
      p.y += p.vy * dt;

      let landingY = 220;
      if (p.vy >= 0) {
        PLATFORM_DATA.forEach(platform => {
          const left = platform.x;
          const right = left + platform.width;
          const crossedTop = previousY + 30 <= platform.y + 4 && p.y + 30 >= platform.y;
          if (p.x + 26 > left && p.x < right && crossedTop) landingY = Math.min(landingY, platform.y - 30);
        });
      }
      if (p.y >= landingY) {
        p.y = landingY;
        p.vy = 0;
        p.grounded = true;
        p.jumps = 0;
      } else p.grounded = false;

      const drone = 760 + Math.sin(now / 620) * 115;
      setDroneX(drone);
      const hitSpike = SPIKE_POSITIONS.some(x => Math.abs(p.x - x) < 21 && p.y + 30 > 215);
      const hitDrone = Math.abs(p.x - drone) < 25 && Math.abs(p.y - 86) < 25;
      if (hitSpike || hitDrone) respawn();

      SHARD_DATA.forEach((shard, index) => {
        if (!collectedRef.current.includes(index) && Math.abs(p.x - shard.x) < 24 && Math.abs(p.y - shard.y) < 28) {
          collectedRef.current = [...collectedRef.current, index];
          setCollected(collectedRef.current);
          beep(850, 0.04);
        }
      });
      if (p.x > WORLD_WIDTH - 70 && collectedRef.current.length === SHARD_DATA.length) {
        setWon(true);
        beep(940, 0.13);
      }
      const elapsed = Math.floor((now - startTimeRef.current) / 1000);
      if (elapsed !== displayedSecond) {
        displayedSecond = elapsed;
        setSeconds(elapsed);
      }
      const camera = Math.max(0, Math.min(WORLD_WIDTH - width, p.x - width * .35));
      setPlayer({ x: p.x, y: p.y, facing: facingRef.current, camera });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [beep, won]);

  const setControl = (name, value) => { controlsRef.current[name] = value; };
  const restart = () => {
    physicsRef.current = { ...START };
    collectedRef.current = [];
    startTimeRef.current = performance.now();
    setPlayer({ x: START.x, y: START.y, facing: 1, camera: 0 });
    setCollected([]);
    setDamage(0);
    setSeconds(0);
    setWon(false);
  };

  return <div>
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, color: theme.textDim, fontSize: `${10 * fontScale}px`, marginBottom: 8 }}>
      <span>Shards <b style={{ color: theme.accent }}>{collected.length}/{SHARD_DATA.length}</b></span>
      <span>Time <b style={{ color: theme.accent }}>{seconds}s</b></span>
      <span>Errors <b style={{ color: damage ? "#d96a63" : theme.accent }}>{damage}</b></span>
    </div>
    <div style={{ color: theme.textDim, fontSize: `${10 * fontScale}px`, marginBottom: 10 }}>Collect every shard, dodge the patrol drone, and reach the portal. You can double jump.</div>
    <div ref={arenaRef} style={{ position: "relative", height: 270, overflow: "hidden", background: `linear-gradient(${theme.panelAlt}, ${theme.bg})`, border: `2px solid ${theme.border}` }}>
      {[180, 510, 930, 1240].map((x, index) => <div key={x} style={{ position: "absolute", left: x - player.camera, bottom: 40, width: 70 + index * 8, height: 65 + index * 15, background: theme.accentDark, opacity: .18, clipPath: "polygon(50% 0,100% 100%,0 100%)" }} />)}
      <div style={{ position: "absolute", left: -player.camera, width: WORLD_WIDTH, bottom: 20, height: 20, background: theme.border }} />
      {PLATFORM_DATA.map(platform => <div key={platform.x} style={{ position: "absolute", left: platform.x - player.camera, top: platform.y, width: platform.width, height: 10, background: theme.border, borderTop: `3px solid ${theme.accentDark}` }} />)}
      {SPIKE_POSITIONS.map(x => <div key={x} style={{ position: "absolute", left: x - player.camera, top: 233, width: 0, height: 0, borderLeft: "12px solid transparent", borderRight: "12px solid transparent", borderBottom: "17px solid #d96a63" }} />)}
      {SHARD_DATA.map((shard, index) => !collected.includes(index) && <div key={shard.x} aria-label="Data shard" style={{ position: "absolute", left: shard.x - player.camera, top: shard.y, width: 14, height: 14, background: theme.accent, transform: "rotate(45deg)", boxShadow: `0 0 12px ${theme.accent}` }} />)}
      <div aria-label="Patrol drone" style={{ position: "absolute", left: droneX - player.camera, top: 86, width: 26, height: 14, background: "#d96a63", border: `2px solid ${theme.bg}`, boxShadow: `-8px 0 0 ${theme.textFaint}, 8px 0 0 ${theme.textFaint}` }} />
      <div style={{ position: "absolute", left: WORLD_WIDTH - 56 - player.camera, top: 174, width: 44, height: 76, borderRadius: "22px 22px 0 0", background: collected.length === SHARD_DATA.length ? theme.accentDark : theme.panel, border: `3px solid ${collected.length === SHARD_DATA.length ? theme.accent : theme.textFaint}`, boxShadow: collected.length === SHARD_DATA.length ? `0 0 18px ${theme.accent}` : "none" }} />
      <div style={{ position: "absolute", left: player.x - player.camera, top: player.y, width: 30, height: 30 }}><PixelSprite frame={player.y < 220 ? "jump" : "walk1"} size={30} color={theme.accent} facing={player.facing} /></div>
      {won && <div style={{ position: "absolute", inset: 0, zIndex: 3, display: "grid", placeItems: "center", background: `${theme.bg}e8` }}><PixelFrame theme={theme} style={{ padding: 18, textAlign: "center" }}>
        <div style={{ color: theme.accent, marginBottom: 8 }}>Stage clear!</div>
        <div style={{ color: theme.textDim, fontSize: `${10 * fontScale}px`, marginBottom: 12 }}>Time {seconds}s &middot; Errors {damage} &middot; Score {Math.max(100, 1200 - seconds * 10 - damage * 75)}</div>
        <PixelFrame theme={theme} onClick={restart} style={{ padding: "8px 12px" }}>Run again</PixelFrame>
      </PixelFrame></div>}
    </div>
    <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
      <PixelFrame as="button" theme={theme} aria-label="Move left" onPointerDown={() => setControl("left", true)} onPointerUp={() => setControl("left", false)} onPointerLeave={() => setControl("left", false)} style={{ padding: "9px 18px" }}>Left</PixelFrame>
      <PixelFrame as="button" theme={theme} onPointerDown={() => setControl("jump", true)} style={{ padding: "9px 18px" }}>Jump</PixelFrame>
      <PixelFrame as="button" theme={theme} aria-label="Move right" onPointerDown={() => setControl("right", true)} onPointerUp={() => setControl("right", false)} onPointerLeave={() => setControl("right", false)} style={{ padding: "9px 18px" }}>Right</PixelFrame>
    </div>
  </div>;
}
