import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MenuBar } from "../components/Menu/MenuBar";
import { MemoryRouter } from "react-router-dom";

describe("Render components", () => {
  it("renders Menu component", async () => {
    await waitFor(() => {
      return render(
        <MemoryRouter initialEntries={["/"]} initialIndex={0}>
          <MenuBar />
        </MemoryRouter>
      );
    });

    expect(screen.getByText(/Сonverter/i)).toBeInTheDocument();
    expect(screen.getByText(/All rates/i)).toBeInTheDocument();
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
  });
});
