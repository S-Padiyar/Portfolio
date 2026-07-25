import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderAssistantText } from "@/components/assistant/CompanionPanel";

afterEach(cleanup);

describe("Companion response links", () => {
  it("turns only known portfolio pages and HTTPS URLs into safe controls", () => {
    const handleNavClick = vi.fn();
    render(<div>{renderAssistantText(
      "Open Trophy Case or https://github.com/S-Padiyar.",
      handleNavClick,
      vi.fn(),
      { accent: "#fff" }
    )}</div>);

    fireEvent.click(screen.getByRole("button", { name: "Trophy Case" }));
    expect(handleNavClick).toHaveBeenCalledWith("projects");
    const link = screen.getByRole("link", { name: "https://github.com/S-Padiyar" });
    expect(link.getAttribute("href")).toBe("https://github.com/S-Padiyar");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });
});
