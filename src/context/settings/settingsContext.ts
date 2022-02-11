import { createContext } from "react";
import { ICurrency } from "./interfaces/ICurrency";

interface ICartContext {
  currencies: Array<ICurrency>;
  defaultCurrency: string;
  isSettingsJsonLoaded: boolean;
  setDefaultCurrency: (defaultCurrency: string) => void;
  getAllRates: () => Promise<Record<string, number>>;
  getRate: (
    currentAmount: number,
    currentCurrency: string,
    toCurrency: string
  ) => Promise<number|null>;
}

export const SettingsContext = createContext({} as ICartContext);
