import { ActionType } from "../types";
import { ICurrency } from "./interfaces/ICurrency";

export interface ISettingsState {
  currencies: Array<ICurrency>;
  defaultCurrency: string;
  isSettingsJsonLoaded: boolean;
}

type SetSettingsAction = {
  type: ActionType.SET_SETTINGS;
  currencies: Array<ICurrency>;
  defaultCurrency: string;
};

type SetDefaultCurrencyAction = {
  type: ActionType.SET_DEFAULT_CURRENCY;
  defaultCurrency: string;
};

type Action = SetSettingsAction | SetDefaultCurrencyAction;

const handlers = {
  [ActionType.SET_SETTINGS]: (state: ISettingsState, action: Action) => ({
    ...state,
    currencies: (action as SetSettingsAction).currencies,
    defaultCurrency: (action as SetSettingsAction).defaultCurrency,
    isSettingsJsonLoaded: true,
  }),
  [ActionType.SET_DEFAULT_CURRENCY]: (
    state: ISettingsState,
    action: Action
  ): ISettingsState => ({
    ...state,
    defaultCurrency: (action as SetDefaultCurrencyAction).defaultCurrency,
  }),
  DEFAULT: (state: ISettingsState) => state,
};

export const settingsReducer = (
  state: ISettingsState,
  action: Action
): ISettingsState => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
