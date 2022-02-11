import { ActionType } from "../types";
import { ICurrency } from "./interfaces/ICurrency";

export interface ISettings {
  currencies: Array<ICurrency>;
  defaultCurrency: string;
  isSettingsJsonLoaded: boolean;
}

type UpdateCartAction = {
  type: ActionType.UPDATE_CART_ITEMS;
  cartItems: Array<ICartItem>;
};

const handlers = {
  [ActionType.UPDATE_CART_ITEMS]: (
    state: ICartState,
    action: UpdateCartAction
  ) => ({
    ...state,
    cartItems: action.cartItems,
  }),
  DEFAULT: (state: ICartState) => state,
};

export const cartReducer = (
  state: ICartState,
  action: UpdateCartAction
): ICartState => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
