import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Stats } from "@/components/sections/Stats";

describe("Stats", () => {
  it("renders all stat labels and values", () => {
    render(<Stats />);
    expect(screen.getByText("Projects on this page")).toBeInTheDocument();
    expect(screen.getByText("Live products you can open")).toBeInTheDocument();
    expect(screen.getByText("Client storefronts")).toBeInTheDocument();
    expect(screen.getByText("Case studies")).toBeInTheDocument();
  });
});
