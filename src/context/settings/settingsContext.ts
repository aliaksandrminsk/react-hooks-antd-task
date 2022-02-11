import { createContext } from "react";
import { ICartItem } from "./interfaces/ICartItem";
import { IProduct } from "../product/interfaces/IProduct";

interface ICartContext {
  cartItems: Array<ICartItem>;
  addCartItem: (product: IProduct) => void;
  updateCartItemCount: (key: string, values: Partial<ICartItem>) => void;
  removeCartItems: (keys: Set<string>) => void;
  isAddedProduct: (key: string) => boolean;
  getSelectedItems: () => Set<string>;
}

export const CartContext = createContext({} as ICartContext);
