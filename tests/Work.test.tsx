import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Work } from "@/components/sections/Work";

describe("Work", () => {
  it("shows all projects by default and filters by category", async () => {
    render(<Work />);
    const grid = screen.getByTestId("work-grid");

    // default: all 15 projects (6 products + 9 client)
    expect(within(grid).getAllByRole("link")).toHaveLength(15);

    fireEvent.click(screen.getByRole("button", { name: "Client Work" }));
    await waitFor(() => expect(within(grid).getAllByRole("link")).toHaveLength(9));

    fireEvent.click(screen.getByRole("button", { name: "Products" }));
    await waitFor(() => expect(within(grid).getAllByRole("link")).toHaveLength(6));

    fireEvent.click(screen.getByRole("button", { name: "All" }));
    await waitFor(() => expect(within(grid).getAllByRole("link")).toHaveLength(15));
  });
});
