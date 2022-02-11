import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { ActionType } from "../types";
import { ICurrency } from "./interfaces/ICurrency";
import { ISettingsState, settingsReducer } from "./settingsReducer";
import { SettingsContext } from "./settingsContext";

export const SettingsState: React.FC = ({ children }) => {
  const initialState: ISettingsState = {
    currencies: new Array<ICurrency>(),
    defaultCurrency: "",
    isSettingsJsonLoaded: false,
  };

  const [state, dispatch] = useReducer(settingsReducer, initialState);

  const initSettings = () => {
    axios.get("currencies.json").then((response) => {
      const currencies = response.data.currencies;
      const defaultCurrency = response.data.defaultCurrency;

      dispatch({
        type: ActionType.SET_SETTINGS,
        currencies,
        defaultCurrency,
      });
    });
  };

  const setDefaultCurrency = (defaultCurrency: string) => {
    dispatch({
      type: ActionType.SET_DEFAULT_CURRENCY,
      defaultCurrency,
    });
  };

  const getAllRates = async () => {
    const toCurrencies = [];
    for (const currency of currencies) {
      toCurrencies.push(currency.symbol);
    }

    return await axios
      .get(
        process.env.REACT_APP_AXIOS_BASE_URL +
          "/fetch-multi?from=" +
          defaultCurrency +
          "&to=" +
          toCurrencies.join(",") +
          "&api_key=" +
          process.env.REACT_APP_API_KEY
      )
      .then((response) => {
        const rates: Record<string, number> = {};
        for (const [key, value] of Object.entries(response.data.results)) {
          rates[key] = value as number;
        }
        return rates;
      });
  };

  const getRate = async (
    currentAmount: number,
    currentCurrency: string,
    toCurrency: string
  ) => {
    return await axios
      .get(
        process.env.REACT_APP_AXIOS_BASE_URL +
          "/convert?from=" +
          currentCurrency +
          "&to=" +
          toCurrency +
          "&amount=" +
          currentAmount +
          "&api_key=" +
          process.env.REACT_APP_API_KEY
      )
      .then((response) => {
        for (const [key, value] of Object.entries<number>(
          response.data.result
        )) {
          if (key === toCurrency) {
            return value;
          }
        }
        return null;
      });
  };

  useEffect(() => {
    initSettings();
  }, []);

  const { currencies, defaultCurrency, isSettingsJsonLoaded } = state;

  return (
    <SettingsContext.Provider
      value={{
        currencies,
        defaultCurrency,
        isSettingsJsonLoaded,
        setDefaultCurrency,
        getAllRates,
        getRate,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
