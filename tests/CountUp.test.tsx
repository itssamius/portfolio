import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CountUp } from "@/components/ui/CountUp";

describe("CountUp", () => {
  it("renders the final value and suffix immediately when reduced motion", () => {
    render(<CountUp value={60} suffix="%" />);
    expect(screen.getByText(/60%/)).toBeInTheDocument();
  });
});
