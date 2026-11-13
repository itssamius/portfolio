import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Work } from "@/components/sections/Work";

describe("Work", () => {
  it("shows all projects by default and filters by category", async () => {
    render(<Work />);
    const grid = screen.getByTestId("work-grid");

    // default: all 13 projects (4 products + 9 client)
    expect(within(grid).getAllByRole("heading", { level: 3 })).toHaveLength(13);

    fireEvent.click(screen.getByRole("button", { name: "Client Work" }));
    await waitFor(() => expect(within(grid).getAllByRole("heading", { level: 3 })).toHaveLength(9));

    fireEvent.click(screen.getByRole("button", { name: "Products" }));
    await waitFor(() => expect(within(grid).getAllByRole("heading", { level: 3 })).toHaveLength(4));

    fireEvent.click(screen.getByRole("button", { name: "All" }));
    await waitFor(() => expect(within(grid).getAllByRole("heading", { level: 3 })).toHaveLength(13));
  });

  it("links case-study products internally and leaves dead client sites unlinked", () => {
    render(<Work />);
    const grid = screen.getByTestId("work-grid");
    expect(within(grid).getByRole("link", { name: /Journey/ })).toHaveAttribute("href", "/work/journey");
    expect(within(grid).getByRole("link", { name: /Plot Locator/ })).toHaveAttribute(
      "href",
      "https://plot-locator-abera.fly.dev"
    );
    expect(within(grid).queryByRole("link", { name: /Manetained/ })).toBeNull();
    expect(within(grid).getByRole("heading", { name: "Manetained" })).toBeInTheDocument();
  });
});
