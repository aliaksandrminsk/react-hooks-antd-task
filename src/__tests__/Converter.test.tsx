import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { SettingsState } from "../context/settings/SettingsState";
import axios from "axios";
import { Converter } from "../pages/Converter/Converter";

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
  result: {
    GBP: 0.74,
    rate: 0.7392,
  },
};

describe("Converter page", () => {
  it("renders Converter Page", async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: serverAnswer_1 })
      .mockResolvedValueOnce({ data: serverAnswer_2 });

    await waitFor(() => {
      return render(
        <SettingsState>
          <Converter />
        </SettingsState>
      );
    });

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(await screen.getAllByText(/USD/i)).not.toBeNull();

    const comboboxs = screen.getAllByRole("combobox");
    expect(comboboxs).toHaveLength(2);
  });
});
