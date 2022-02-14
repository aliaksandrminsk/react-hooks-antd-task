import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SettingsState } from "../context/settings/SettingsState";
import { Settings } from "../pages/Settings/Settings";
import axios, { AxiosResponse } from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const hits = {
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

describe("useReducer", () => {
  it("hook testing", async () => {
    //Prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: hits,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };
    // Make the mock return the custom axios response
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);

    await waitFor(() => {
      return render(<SettingsState children={<Settings />} />);
    });

    expect(screen.getByLabelText(/United States dollar/i)).toBeChecked();
    expect(screen.getByLabelText(/Australian dollar/i)).not.toBeChecked();

    const labelRadio: HTMLInputElement =
      screen.getByLabelText(/British pound/i);
    expect(labelRadio).not.toBeChecked();
    const leftClick = { button: 0 };
    userEvent.click(labelRadio, leftClick);
    expect(labelRadio).toBeChecked();
  });
});
