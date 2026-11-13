import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("renders the headline and the three featured projects", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("I build software that ships.");
    expect(screen.getByRole("link", { name: /Journey/ })).toHaveAttribute("href", "/work/journey");
    expect(screen.getByRole("link", { name: /Blackjack/ })).toHaveAttribute("href", "/work/blackjack");
    expect(screen.getByRole("link", { name: /Folio/ })).toHaveAttribute("href", "/work/folio");
  });
});
