import React, { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { LayoutComponent } from "../App";

const renderWithRouter = (ui: ReactElement, { route = "/" } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]} initialIndex={0}>
      {ui}
    </MemoryRouter>
  );
};

describe("React Router", () => {
  it("full app rendering/navigating", async () => {
    const route = "/converter";
    renderWithRouter(<LayoutComponent />, { route });

    expect(await screen.findByText(/^Currency Converter$/)).toBeInTheDocument();

    const leftClick = { button: 0 };
    userEvent.click(screen.getByTestId("settings-link"), leftClick);
    expect(await screen.findByText(/^Default Currency$/)).toBeInTheDocument();

    userEvent.click(screen.getByTestId("rates-link"), leftClick);
    expect(await screen.findByText(/^Rates$/)).toBeInTheDocument();
  });

  it("landing on a bad page", async () => {
    const route = "/something-that-does-not-match";
    renderWithRouter(<LayoutComponent />, { route });
    expect(await screen.findByText(/^Rates$/)).toBeInTheDocument();
  });
});
