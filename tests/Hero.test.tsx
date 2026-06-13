import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("renders the headline and the three featured projects", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("I build software that ships.");
    expect(screen.getByText("Caravan")).toBeInTheDocument();
    expect(screen.getByText("Blackjack")).toBeInTheDocument();
    expect(screen.getByText("Fitness Tracker")).toBeInTheDocument();
  });
});
