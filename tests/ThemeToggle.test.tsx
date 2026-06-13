import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const setTheme = vi.fn();
vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark", setTheme, resolvedTheme: "dark" }),
}));

describe("ThemeToggle", () => {
  it("renders an accessible toggle button", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: /theme/i })).toBeInTheDocument();
  });

  it("switches theme on click", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: /theme/i }));
    expect(setTheme).toHaveBeenCalledWith("light");
  });
});
