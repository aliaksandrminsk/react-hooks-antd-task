import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { SettingsState } from "../context/settings/SettingsState";
import { Rates } from "../pages/Rates/Rates";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const serverAnswer_1 = {
  defaultCurrency: "USD",
  currencies: [
    {
      symbol: "USD",
      name: "United States dollar",
      icon: "23px-Flag_of_the_United_States.png",
      state: "United States",
    },
    {
      symbol: "GBP",
      name: "British pound",
      icon: "23px-Flag_of_the_United_Kingdom.png",
      state: "United Kingdom",
    },
    {
      symbol: "AUD",
      name: "Australian dollar",
      icon: "Flag_of_Australia_(converted).png",
      state: "Australia",
    },
  ],
};

const serverAnswer_2 = {
  results: {
    USD: 1,
    GBP: 0.73996,
    AUD: 1.40829,
  },
};

describe("Rates page", () => {
  it("renders Rates Page", async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: serverAnswer_1 })
      .mockResolvedValueOnce({ data: serverAnswer_2 });

    await waitFor(() => {
      return render(
        <SettingsState>
          <Rates />
        </SettingsState>
      );
    });

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(await screen.getAllByText(/United States/i)).not.toBeNull();
    expect(await screen.getAllByText(/GBP/i)).not.toBeNull();
    expect(await screen.getAllByText(/Australia/i)).not.toBeNull();
  });
});
