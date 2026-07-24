import { useEffect, useRef, useState } from "react";
import PixelFrame from "./PixelFrame";
import PixelIcon from "./PixelIcon";
import PixelSprite from "./PixelSprite";

const CLOUD_QUESTIONS = [
  {
    prompt: "A team needs object storage for reports and static files.",
    options: ["S3", "Lambda", "RDS"],
    answer: "S3"
  },
  {
    prompt: "A small function should run without managing a server.",
    options: ["EC2", "Lambda", "Cost Explorer"],
    answer: "Lambda"
  },
  {
    prompt: "The finance team wants to inspect cloud spending.",
    options: ["RDS", "S3", "Cost Explorer"],
    answer: "Cost Explorer"
  },
  {
    prompt: "A relational application needs managed PostgreSQL.",
    options: ["CloudFront", "RDS", "Lambda"],
    answer: "RDS"
  },
  {
    prompt: "Users around the world need lower-latency web assets.",
    options: ["CloudFront", "Cost Explorer", "RDS"],
    answer: "CloudFront"
  }
];

export function CloudQuestGame({ theme, beep, fontScale, pixelFont }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const question = CLOUD_QUESTIONS[questionIndex];
  const complete = questionIndex === CLOUD_QUESTIONS.length - 1 && selected;

  function choose(option) {
    if (selected) return;
    setSelected(option);
    if (option === question.answer) {
      setScore(value => value + 1);
      setStreak(value => value + 1);
      beep(680, 0.06);
    } else {
      setStreak(0);
      beep(180, 0.06);
    }
  }

  function advance() {
    if (complete) {
      setQuestionIndex(0);
      setScore(0);
      setStreak(0);
    } else {
      setQuestionIndex(index => index + 1);
    }
    setSelected(null);
  }

  return <div>
    <div style={{ color: theme.textDim, fontSize: `${12 * fontScale}px`, lineHeight: 1.55, marginBottom: 12 }}>
      Route each request to the best AWS service. Score: {score}/{CLOUD_QUESTIONS.length} - Streak: {streak}
    </div>
    <PixelFrame theme={theme} style={{ padding: 14, background: theme.panelAlt, marginBottom: 12 }}>
      <div style={{ fontFamily: pixelFont, fontSize: `${10 * fontScale}px`, color: theme.text, lineHeight: 1.6 }}>
        {question.prompt}
      </div>
    </PixelFrame>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }}>
      {question.options.map(option => {
        const isAnswer = selected && option === question.answer;
        const isWrong = selected === option && option !== question.answer;
        return <PixelFrame key={option} theme={theme} onClick={() => choose(option)} style={{
          padding: "10px 6px",
          textAlign: "center",
          borderColor: isAnswer ? theme.accent : isWrong ? "#c95e5e" : theme.border,
          color: isAnswer ? theme.accent : theme.text
        }}>
          {option}
        </PixelFrame>;
      })}
    </div>
    {selected && <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
      <div style={{ color: selected === question.answer ? theme.accent : theme.textDim, fontSize: `${11 * fontScale}px` }}>
        {selected === question.answer ? "Correct route." : `Not quite - ${question.answer} fits this request.`}
      </div>
      <PixelFrame theme={theme} onClick={advance} style={{ padding: "7px 10px" }}>
        {complete ? "Restart" : "Next"}
      </PixelFrame>
    </div>}
  </div>;
}

export function PidTargetGame({ theme, beep, fontScale, pixelFont }) {
  const [power, setPower] = useState(50);
  const [result, setResult] = useState(null);
  const [target, setTarget] = useState(74);
  const [wind, setWind] = useState(-4);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [shot, setShot] = useState(null);
  const [launching, setLaunching] = useState(false);
  const [attempts, setAttempts] = useState(0);

  function launch() {
    if (launching) return;
    const distance = Math.round(power * 1.45 + wind);
    const hit = Math.abs(distance - target) <= 5;
    setResult(null);
    setShot({ distance, id: Date.now() });
    setLaunching(true);
    setAttempts(value => value + 1);
    beep(390, 0.04);
    setTimeout(() => {
      setResult({ distance, hit });
      setLaunching(false);
      if (hit) setScore(value => value + Math.max(40, 130 - attempts * 15));
      beep(hit ? 760 : 230, hit ? 0.09 : 0.06);
    }, 650);
  }

  function nextTarget() {
    setTarget(58 + Math.floor(Math.random() * 31));
    setWind(-8 + Math.floor(Math.random() * 17));
    setRound(value => value + 1);
    setResult(null);
    setShot(null);
    setAttempts(0);
  }

  return <div>
    <div style={{ color: theme.textDim, fontSize: `${12 * fontScale}px`, lineHeight: 1.55 }}>
      Round {round} - Score {score}. Account for wind and land within five units of the {target}-unit target.
    </div>
    <div style={{ position: "relative", height: 94, margin: "14px 0", background: theme.panelAlt, border: `2px solid ${theme.border}` }}>
      <div style={{ position: "absolute", left: 14, bottom: 14, width: 24, height: 18, background: theme.accent }} />
      <div style={{ position: "absolute", left: `${target}%`, bottom: 8, width: 4, height: 54, background: theme.accent }} />
      <style>{`@keyframes launcher-arc-${shot?.id || 0} { 0% { left: 25px; bottom: 28px; } 50% { bottom: 75px; } 100% { left: ${Math.min(96, shot?.distance || 0)}%; bottom: 24px; } }`}</style>
      {shot && <div key={shot.id} style={{ position: "absolute", width: 10, height: 10, borderRadius: "50%", background: result?.hit ? theme.accent : result ? "#c95e5e" : theme.text, animation: `launcher-arc-${shot.id} 650ms ease-in forwards` }} />}
      <div style={{ position: "absolute", right: 8, top: 6, color: theme.textFaint, fontSize: `${9 * fontScale}px` }}>TARGET</div>
      <div style={{ position: "absolute", left: 8, top: 6, color: theme.textDim, fontSize: `${9 * fontScale}px` }}>WIND {wind > 0 ? "+" : ""}{wind}</div>
    </div>
    <label style={{ display: "block", fontFamily: pixelFont, fontSize: `${9 * fontScale}px`, color: theme.textDim }}>
      Power: {power}
      <input
        type="range"
        min="20"
        max="80"
        value={power}
        onChange={event => { setPower(Number(event.target.value)); setResult(null); }}
        style={{ width: "100%", marginTop: 10, accentColor: theme.accent }}
      />
    </label>
    <div style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
      <div style={{ color: result?.hit ? theme.accent : theme.textDim, fontSize: `${11 * fontScale}px` }}>
        {result ? `${result.distance} units - ${result.hit ? "target locked" : "adjust and retry"}` : "Ready to launch."}
      </div>
      <PixelFrame theme={theme} disabled={launching} onClick={result?.hit ? nextTarget : launch} style={{ padding: "8px 12px", opacity: launching ? .65 : 1 }}>{launching ? "In flight..." : result?.hit ? "Next target" : "Launch"}</PixelFrame>
    </div>
  </div>;
}

const OBSTACLE_RATIOS = [0.31, 0.52, 0.72];
const SHARD_RATIOS = [0.19, 0.41, 0.63, 0.84];

export function CompanionRunGame({ theme, beep, fontScale }) {
  const arenaRef = useRef(null);
  const controlsRef = useRef({ left: false, right: false, jump: false });
  const physicsRef = useRef({ x: 12, y: 158, vy: 0, grounded: true });
  const [player, setPlayer] = useState({ x: 12, y: 158 });
  const [won, setWon] = useState(false);
  const [falls, setFalls] = useState(0);
  const [shards, setShards] = useState([]);
  const shardsRef = useRef([]);

  useEffect(() => {
    function keyDown(event) {
      if (event.key === "ArrowLeft") controlsRef.current.left = true;
      else if (event.key === "ArrowRight") controlsRef.current.right = true;
      else if ((event.key === "ArrowUp" || event.key === " ") && !event.repeat) controlsRef.current.jump = true;
      else return;
      event.preventDefault();
    }
    function keyUp(event) {
      if (event.key === "ArrowLeft") controlsRef.current.left = false;
      if (event.key === "ArrowRight") controlsRef.current.right = false;
    }
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, []);

  useEffect(() => {
    let frame;
    let previousTime = performance.now();
    function tick(now) {
      const arena = arenaRef.current;
      if (!arena) return;
      const dt = Math.min(2, (now - previousTime) / 16.67);
      previousTime = now;
      const width = arena.clientWidth;
      const groundY = 158;
      const physics = physicsRef.current;
      const controls = controlsRef.current;

      if (controls.left) physics.x -= 3.4 * dt;
      if (controls.right) physics.x += 3.4 * dt;
      physics.x = Math.max(4, Math.min(width - 34, physics.x));
      if (controls.jump && physics.grounded) {
        physics.vy = -10.5;
        physics.grounded = false;
        beep(520, 0.04);
      }
      controls.jump = false;
      physics.vy += 0.58 * dt;
      physics.y += physics.vy * dt;
      if (physics.y >= groundY) {
        physics.y = groundY;
        physics.vy = 0;
        physics.grounded = true;
      }

      const hitObstacle = OBSTACLE_RATIOS.some(ratio => {
        const obstacleX = width * ratio;
        return physics.x + 28 > obstacleX
          && physics.x < obstacleX + 24
          && physics.y + 28 > groundY + 3;
      });
      SHARD_RATIOS.forEach((ratio, index) => {
        const shardX = width * ratio;
        if (!shardsRef.current.includes(index) && physics.x + 28 > shardX && physics.x < shardX + 18) {
          shardsRef.current = [...shardsRef.current, index];
          setShards(shardsRef.current);
          beep(820, 0.035);
        }
      });
      if (hitObstacle) {
        physics.x = 12;
        physics.y = groundY;
        physics.vy = 0;
        setFalls(value => value + 1);
        beep(170, 0.06);
      }
      if (physics.x > width - 62) {
        setWon(true);
        physics.x = width - 58;
      }
      setPlayer({ x: physics.x, y: physics.y });
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [beep]);

  function setControl(name, value) {
    controlsRef.current[name] = value;
  }

  function restart() {
    physicsRef.current = { x: 12, y: 158, vy: 0, grounded: true };
    setPlayer({ x: 12, y: 158 });
    setWon(false);
    setFalls(0);
    shardsRef.current = [];
    setShards([]);
  }

  return <div>
    <div style={{ color: theme.accent, fontSize: `${10 * fontScale}px`, marginBottom: 7 }}>
      Data shards: {shards.length}/{SHARD_RATIOS.length} - Errors: {falls}
    </div>
    <div style={{ color: theme.textDim, fontSize: `${11 * fontScale}px`, lineHeight: 1.5, marginBottom: 10 }}>
      Reach the exit without touching the error blocks. Use left/right and ↑/Space, or the controls below.
    </div>
    <div ref={arenaRef} style={{ position: "relative", height: 220, overflow: "hidden", background: theme.panelAlt, border: `2px solid ${theme.border}` }}>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 30, background: theme.border }} />
      {OBSTACLE_RATIOS.map(ratio => <div key={ratio} style={{
        position: "absolute",
        left: `${ratio * 100}%`,
        bottom: 30,
        width: 24,
        height: 25,
        background: "#c95e5e",
        border: `2px solid ${theme.bg}`
      }}><PixelIcon name="close" size={12} color={theme.bg} /></div>)}
      {SHARD_RATIOS.map((ratio, index) => !shards.includes(index) && <div key={ratio} aria-label="Data shard" style={{
        position: "absolute", left: `${ratio * 100}%`, bottom: index % 2 ? 82 : 62,
        width: 14, height: 14, background: theme.accent, transform: "rotate(45deg)", boxShadow: `0 0 10px ${theme.accent}`
      }} />)}
      <div style={{ position: "absolute", right: 8, bottom: 30, width: 38, height: 58, background: theme.accentDark, border: `3px solid ${theme.accent}` }}>
        <div style={{ position: "absolute", width: 5, height: 5, borderRadius: "50%", background: theme.accent, right: 5, top: 28 }} />
      </div>
      <div style={{ position: "absolute", left: player.x, top: player.y, width: 30, height: 30 }}>
        <PixelSprite frame={player.y < 158 ? "jump" : "walk1"} size={30} color={theme.accent} />
      </div>
      {won && <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: `${theme.bg}dd`, zIndex: 2 }}>
        <PixelFrame theme={theme} style={{ padding: 16, textAlign: "center" }}>
          <div style={{ color: theme.accent, marginBottom: 8 }}>Stage clear!</div>
          <div style={{ color: theme.textDim, fontSize: `${10 * fontScale}px`, marginBottom: 10 }}>Shards: {shards.length}/{SHARD_RATIOS.length} - Errors: {falls}</div>
          <PixelFrame theme={theme} onClick={restart} style={{ padding: "7px 10px" }}>Run again</PixelFrame>
        </PixelFrame>
      </div>}
    </div>
    <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
      <PixelFrame as="button" theme={theme} onPointerDown={() => setControl("left", true)} onPointerUp={() => setControl("left", false)} onPointerLeave={() => setControl("left", false)} style={{ padding: "8px 16px" }}>Left</PixelFrame>
      <PixelFrame as="button" theme={theme} onPointerDown={() => setControl("jump", true)} style={{ padding: "8px 16px" }}>Jump</PixelFrame>
      <PixelFrame as="button" theme={theme} onPointerDown={() => setControl("right", true)} onPointerUp={() => setControl("right", false)} onPointerLeave={() => setControl("right", false)} style={{ padding: "8px 16px" }}>Right</PixelFrame>
    </div>
  </div>;
}
