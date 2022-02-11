import React, { useEffect, useReducer } from "react";
import { ActionType } from "../types";
import { CartContext } from "./cartContext";
import { cartReducer, ISettings } from "./cartReducer";
import { ICurrency } from "./interfaces/ICurrency";

export const CartState: React.FC = ({ children }) => {
  const initialState: ISettings = {
    currencies: new Array<ICurrency>(),
    defaultCurrency: "",
    isSettingsJsonLoaded: false;
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  const getSettings = () => {
    const response = await axios.get("/currencies.json");
    const currencies = response.data.currencies;
    const defaultCurrency = response.data.defaultCurrency;

    dispatch({
      type: ActionType.SET_SETTINGS,
      currencies,
      defaultCurrency,
    });
  };

  const setDefaultCurrency = (defaultCurrency: string) => {
    dispatch({
      type: ActionType.SET_SETTINGS,
      defaultCurrency,
    });
  };

  const getAllRates = () => {
  };

  const getRate = (currencyAmount: number, currencyAmount) => {
  };


  const { cartItems } = state;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addCartItem,
        updateCartItemCount,
        removeCartItems,
        isAddedProduct,
        getSelectedItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
