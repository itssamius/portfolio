import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Stats } from "@/components/sections/Stats";

describe("Stats", () => {
  it("renders all stat labels and values", () => {
    render(<Stats />);
    expect(screen.getByText("Years experience")).toBeInTheDocument();
    expect(screen.getByText("Projects shipped")).toBeInTheDocument();
    expect(screen.getByText(/60%/)).toBeInTheDocument();
  });
});
