import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import GameVault from "@/components/games/GameVault";

const theme = {
  accent: "#e8a54b",
  accentDark: "#8a5a1f",
  bg: "#1c1410",
  border: "#4a3526",
  panel: "#241a14",
  panelAlt: "#2c2019",
  text: "#f1e6d8",
  textDim: "#9c8a76",
  textFaint: "#6b5c4c"
};

const baseProps = {
  theme: theme,
  beep: vi.fn(),
  companion: { x: 0, y: 0 },
  fontScale: 1,
  isMobile: false,
  pixelFont: "monospace",
  setCompanion: vi.fn(),
  setSelectedProjectId: vi.fn()
};

beforeEach(() => {
  vi.stubGlobal("requestAnimationFrame", vi.fn(() => 1));
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("GameVault", () => {
  it("does not provide a shortcut around the Botmay Door", () => {
    render(<GameVault {...baseProps} enteredGameDoor={null} />);
    expect(screen.getByLabelText("Botmay Door")).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Enter" })).toBeNull();
    expect(screen.queryByText(/Reach the exit/)).toBeNull();
  });

  it("opens the arcade only after a physical door-entry event", () => {
    vi.useFakeTimers();
    render(<GameVault
      {...baseProps}
      enteredGameDoor={{ id: "arcade", entryId: 1 }}
    />);
    expect(screen.getByText(/Entering Game Vault/)).toBeTruthy();
    act(() => vi.advanceTimersByTime(1300));
    expect(screen.getByRole("dialog", { name: "Game Vault" })).toBeTruthy();
    expect(screen.getByTitle("Play Botmay Kingdom")).toBeTruthy();
    vi.useRealTimers();
  });

  it("launches Skybound from the unlocked arcade", () => {
    vi.useFakeTimers();
    render(<GameVault {...baseProps} enteredGameDoor={{ id: "arcade", entryId: 2 }} />);
    act(() => vi.advanceTimersByTime(1300));
    fireEvent.click(screen.getByTitle("Play Skybound"));
    expect(screen.getByText("Tap, Space, or ↑ to fly")).toBeTruthy();
    expect(screen.getByLabelText("Close Game Vault")).toBeTruthy();
    vi.useRealTimers();
  });

  it("provides a touch-friendly companion entry on mobile", () => {
    const setCompanion = vi.fn();
    render(<GameVault {...baseProps} isMobile setCompanion={setCompanion} enteredGameDoor={null} />);
    fireEvent.click(screen.getByTitle("Guide Botmay into the Game Vault"));
    expect(setCompanion).toHaveBeenCalledOnce();
  });
});
