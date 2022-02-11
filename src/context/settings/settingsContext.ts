import { createContext } from "react";
import { ICurrency } from "./interfaces/ICurrency";

interface ICartContext {
  currencies: Array<ICurrency>;
  defaultCurrency: string;
  isSettingsJsonLoaded: boolean;
  setDefaultCurrency: (defaultCurrency: string) => void;
  getAllRates: () => any;
  getRate: (
    currentAmount: number,
    currentCurrency: string,
    toCurrency: string
  ) => Promise<number>;
}

export const SettingsContext = createContext({} as ICartContext);
