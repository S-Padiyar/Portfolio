import { useCallback, useEffect, useRef, useState } from "react";
export default function useCompanionSystem({
  avatarRef,
  beep,
  companion,
  reunionFound,
  setCompanion,
  setEncounterMsg,
  setKonamiActive,
  setNameEggShown,
  setReunionFound,
  unlockAchievement
}) {
  const timersRef = useRef(new Set());
  const schedule = useCallback((callback, delay) => {
    const timer = setTimeout(() => {
      timersRef.current.delete(timer);
      callback();
    }, delay);
    timersRef.current.add(timer);
  }, []);

  useEffect(() => () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current.clear();
  }, []);

  // Typed-word easter egg: type "sunmay" anywhere
  useEffect(() => {
    const target = "sunmay";
    let buf = "";
    function onKey(e) {
      if (e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-target.length);
      if (buf === target) {
        setNameEggShown(true);
        unlockAchievement("true_name");
        beep(520, 0.05);
        schedule(() => setNameEggShown(false), 3000);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [beep, schedule, setNameEggShown, unlockAchievement]);

  // Konami code easter egg — summons a draggable companion sprite
  useEffect(() => {
    const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let pos = 0;
    function onKey(e) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === seq[pos]) {
        pos++;
        if (pos === seq.length) {
          setKonamiActive(true);
          setCompanion({
            x: 60,
            y: 60,
            vx: 0,
            vy: 0,
            onGround: false
          });
          setReunionFound(false);
          unlockAchievement("old_school");
          pos = 0;
          schedule(() => setKonamiActive(false), 2600);
        }
      } else {
        pos = key === seq[0] ? 1 : 0;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [schedule, setCompanion, setKonamiActive, setReunionFound, unlockAchievement]);

  // Companion sprite — real platformer physics: gravity, jumping (with a double
  // jump), and landing on buttons/cards tagged with data-platform.
  const keysRef = useRef({
    left: false,
    right: false
  });
  const jumpQueueRef = useRef(0); // Queues only fresh jump presses, ignoring key repeat.
  const companionAnimRef = useRef({
    walkTick: 0,
    lastWalkFlip: 0
  });
  const physRef = useRef(null); // Mirrors React state inside the animation frame loop.
  const [companionFrame, setCompanionFrame] = useState("idle");
  const [companionFacing, setCompanionFacing] = useState(1);
  const [landingBursts, setLandingBursts] = useState([]);
  useEffect(() => {
    function down(e) {
      if (e.key === "ArrowLeft") keysRef.current.left = true;else if (e.key === "ArrowRight") keysRef.current.right = true;else if ((e.key === "ArrowUp" || e.key === " ") && !e.repeat) jumpQueueRef.current++;else return;
      if (physRef.current) e.preventDefault();
    }
    function up(e) {
      if (e.key === "ArrowLeft") keysRef.current.left = false;else if (e.key === "ArrowRight") keysRef.current.right = false;
    }
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
    // Bind these listeners once (not on every companion position update) —
    // physRef.current tells us live whether a companion is active.
  }, []);
  const hasCompanion = !!companion;
  useEffect(() => {
    if (!hasCompanion) {
      physRef.current = null;
      return;
    }
    physRef.current = {
      ...companion,
      jumpsUsed: 0
    };
    const SPRITE = 40;
    const SPEED = 4.2;
    const GRAVITY = 0.9;
    const JUMP_V = -14;
    const AIR_JUMP_V = -12;
    let raf;
    let lastTime = performance.now();
    function spawnBurst(x, y) {
      const id = Math.random().toString(36).slice(2);
      setLandingBursts(b => [...b, {
        id,
        x,
        y
      }]);
      schedule(() => setLandingBursts(b => b.filter(p => p.id !== id)), 350);
    }
    function tick(now) {
      const dt = Math.min(2, (now - lastTime) / 16.67);
      lastTime = now;
      const keys = keysRef.current;
      const p = physRef.current;
      if (!p) return;
      if (keys.left) {
        p.vx = -SPEED;
        setCompanionFacing(-1);
      } else if (keys.right) {
        p.vx = SPEED;
        setCompanionFacing(1);
      } else {
        p.vx = 0;
      }
      while (jumpQueueRef.current > 0) {
        jumpQueueRef.current--;
        if (p.onGround) {
          p.vy = JUMP_V;
          p.onGround = false;
          p.jumpsUsed = 0;
          beep(520, 0.04);
        } else if (p.jumpsUsed < 1) {
          p.vy = AIR_JUMP_V;
          p.jumpsUsed = 1;
          beep(660, 0.05);
          spawnBurst(p.x + SPRITE / 2, p.y + SPRITE);
        }
      }
      p.vy += GRAVITY * dt;
      let nx = p.x + p.vx * dt;
      let ny = p.y + p.vy * dt;
      nx = Math.max(4, Math.min(window.innerWidth - SPRITE - 4, nx));
      const floor = window.innerHeight - SPRITE - 4;
      let landed = false;
      if (p.vy >= 0) {
        const platforms = document.querySelectorAll("[data-platform]");
        const footY = ny + SPRITE;
        const prevFootY = p.y + SPRITE;
        for (const el of platforms) {
          const r = el.getBoundingClientRect();
          const overlapsX = nx + SPRITE > r.left + 4 && nx < r.right - 4;
          if (overlapsX && prevFootY <= r.top + 6 && footY >= r.top) {
            ny = r.top - SPRITE;
            landed = true;
            break;
          }
        }
      }
      if (!landed && ny >= floor) {
        ny = floor;
        landed = true;
      }
      const wasFalling = !p.onGround && p.vy > 4;
      if (landed && wasFalling) {
        spawnBurst(nx + SPRITE / 2, ny + SPRITE);
      }
      if (landed) {
        p.vy = 0;
        p.jumpsUsed = 0;
      }
      p.onGround = landed;
      p.x = nx;
      p.y = ny;
      setCompanion({
        x: p.x,
        y: p.y,
        vx: p.vx,
        vy: p.vy,
        onGround: p.onGround
      });
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // Depend only on whether a companion exists, not on the companion object
    // itself — that object changes every frame (we call setCompanion below),
    // so depending on it re-created this entire rAF loop 60x/sec.
    // `companion` changes every animation frame; adding it would restart the loop continuously.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beep, hasCompanion, schedule, setCompanion]);

  // Derive sprite animation frame + occasional wandering encounters from motion
  useEffect(() => {
    if (!companion) {
      // Animation state intentionally follows the physics state maintained by the rAF loop.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCompanionFrame("idle");
      return;
    }
    const moving = Math.abs(companion.vx || 0) > 0.1;
    if (!companion.onGround) {
      setCompanionFrame("jump");
    } else if (moving) {
      const a = companionAnimRef.current;
      const now = performance.now();
      if (now - a.lastWalkFlip > 100) {
        a.walkTick++;
        a.lastWalkFlip = now;
      }
      const walkCycle = ["walk1", "walk3", "walk2", "walk4"];
      setCompanionFrame(walkCycle[a.walkTick % walkCycle.length]);
    } else {
      setCompanionFrame("idle");
    }
  }, [companion]);

  // Companion reaching the avatar triggers a simple reunion moment
  useEffect(() => {
    if (!companion || reunionFound || !avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const dist = Math.hypot(companion.x + 20 - (rect.left + rect.width / 2), companion.y + 20 - (rect.top + rect.height / 2));
    if (dist < 40) {
      setReunionFound(true);
      setEncounterMsg("Your companion found you. It looks pleased.");
      unlockAchievement("reunion");
      beep(600, 0.1);
      schedule(() => setEncounterMsg(null), 2200);
    }
  }, [avatarRef, beep, companion, reunionFound, schedule, setEncounterMsg, setReunionFound, unlockAchievement]);
  return {
    companionFacing,
    companionFrame,
    landingBursts,
  };
}
