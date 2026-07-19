import { useRef, useCallback } from "react";

// Tiny square-wave "beep" used for UI feedback throughout the site.
// Pass the current soundOn flag in; the returned function is stable.
export default function useAudioBeep(soundOn) {
  const audioCtxRef = useRef(null);

  const beep = useCallback(
    (freq = 220, dur = 0.05) => {
      if (!soundOn) return;
      try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        const ctx = audioCtxRef.current;
        // Browsers commonly create the context in a suspended state. Resume it
        // from the user's click/tap before scheduling the oscillator.
        if (ctx.state === "suspended") {
          void ctx.resume();
        }
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.value = freq;
        gain.gain.value = 0.03;
        osc.connect(gain);
        gain.connect(ctx.destination);
        const startAt = ctx.currentTime + 0.005;
        gain.gain.setValueAtTime(0.03, startAt);
        osc.start(startAt);
        gain.gain.exponentialRampToValueAtTime(0.0001, startAt + dur);
        osc.stop(startAt + dur);
      } catch (e) {}
    },
    [soundOn]
  );

  return beep;
}
