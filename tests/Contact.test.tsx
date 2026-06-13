import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Contact } from "@/components/sections/Contact";

describe("Contact", () => {
  it("renders the closing CTA with a mailto link", () => {
    render(<Contact />);
    expect(screen.getByRole("heading", { name: /let's build something/i })).toBeInTheDocument();
    const mail = screen.getByRole("link", { name: /samuel@abera\.io/i });
    expect(mail).toHaveAttribute("href", "mailto:samuel@abera.io");
  });
});
