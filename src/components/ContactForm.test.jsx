import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import ContactForm from "./ContactForm";

const theme = {
  accent: "#f0b34a",
  bg: "#17130f",
  border: "#705a3a",
  panel: "#292117",
  text: "#f5ead8",
  textDim: "#c8b99e"
};

afterEach(cleanup);

it("exposes labeled contact fields and submits through the form", () => {
  const sendMail = vi.fn();
  render(<ContactForm
    T={theme}
    bodyFont="monospace"
    composeEmail="visitor@example.com"
    composeMsg="Hello"
    composeName="Visitor"
    fontScale={1}
    isMobile={false}
    isTablet={false}
    mailSent={false}
    pixelFont="monospace"
    sendMail={sendMail}
    setComposeEmail={vi.fn()}
    setComposeMsg={vi.fn()}
    setComposeName={vi.fn()}
  />);

  expect(screen.getByLabelText(/player name/i)).toBeTruthy();
  expect(screen.getByLabelText(/respawn address/i)).toBeTruthy();
  expect(screen.getByLabelText(/message/i)).toBeTruthy();

  fireEvent.submit(screen.getByRole("button", { name: /send scroll/i }).closest("form"));
  expect(sendMail).toHaveBeenCalledOnce();
});
