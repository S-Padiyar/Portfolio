import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import CharacterSheet from "@/components/profile/CharacterSheet";

const theme = {
  accent: "#e8a54b",
  border: "#4a3526",
  panel: "#241a14",
  panelAlt: "#2c2019",
  text: "#f1e6d8",
  textDim: "#9c8a76",
  textFaint: "#6b5c4c"
};

afterEach(cleanup);

describe("CharacterSheet", () => {
  it("renders the current progression level", () => {
    render(<CharacterSheet
      theme={theme}
      fontScale={1}
      isMobile={false}
      level={17}
      pixelFont="monospace"
    />);
    expect(screen.getByText("Level 17")).toBeTruthy();
  });
});
