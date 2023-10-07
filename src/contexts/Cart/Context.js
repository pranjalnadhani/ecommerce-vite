import { createContext } from "react";

const CartContext = createContext({
  cart: [],
  getProduct: (productId) => {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  incrementQuantity: (productId) => {},
  decrementQuantity: (productId) => {},
});

export default CartContext;
