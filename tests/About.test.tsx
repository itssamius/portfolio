import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { About } from "@/components/sections/About";

describe("About", () => {
  it("renders bio and the three capability columns", () => {
    render(<About />);
    expect(screen.getByText(/5\+ years/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Full-Stack Web" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "E-commerce" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Apps & Systems" })).toBeInTheDocument();
  });
});
