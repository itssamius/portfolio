import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SectionLabel } from "@/components/ui/SectionLabel";

describe("SectionLabel", () => {
  it("renders the number, title, and subtitle", () => {
    render(<SectionLabel no="01" title="Selected Work" subtitle="Products & client builds" />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Selected Work" })).toBeInTheDocument();
    expect(screen.getByText("Products & client builds")).toBeInTheDocument();
  });
});
