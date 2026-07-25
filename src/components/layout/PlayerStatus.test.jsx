import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import PlayerStatus from "@/components/layout/PlayerStatus";

const theme = {
  accent: "#e8a54b",
  accentDark: "#9a6a2e",
  bg: "#17130f",
  border: "#4a3526",
  panel: "#241a14",
  panelAlt: "#2c2019",
  text: "#f1e6d8",
  textDim: "#9c8a76"
};

afterEach(cleanup);

describe("PlayerStatus", () => {
  it("links the IEEE publication stat to the paper DOI", () => {
    render(<PlayerStatus
      theme={theme}
      avatarRef={{ current: null }}
      companion={null}
      fontScale={1}
      handleAvatarClick={vi.fn()}
      level={13}
      pixelFont="monospace"
      themeKey="amber"
      xp={25}
      xpGain={null}
    />);

    const publicationLink = screen.getByRole("link", { name: /open ieee publication/i });
    expect(publicationLink.getAttribute("href")).toBe("https://doi.org/10.1109/URTC68753.2025.11533095");
    expect(screen.getByText("PUBLICATION")).toBeTruthy();
  });
});
