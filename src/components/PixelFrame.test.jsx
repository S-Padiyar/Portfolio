import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import PixelFrame from "./PixelFrame";

const theme = {
  accent: "#f0b34a",
  accentDark: "#9c651f",
  bg: "#17130f",
  border: "#705a3a",
  panel: "#292117"
};

afterEach(cleanup);

describe("PixelFrame", () => {
  it("uses a semantic button for interactive actions", () => {
    const onClick = vi.fn();
    render(<PixelFrame theme={theme} onClick={onClick}>Open</PixelFrame>);

    const button = screen.getByRole("button", { name: "Open" });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
    expect(button.type).toBe("button");
  });

  it("supports semantic external links", () => {
    render(<PixelFrame as="a" theme={theme} href="https://example.com">Profile</PixelFrame>);
    expect(screen.getByRole("link", { name: "Profile" }).href).toBe("https://example.com/");
  });
});
