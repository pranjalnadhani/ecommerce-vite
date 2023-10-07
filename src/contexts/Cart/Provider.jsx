import { useState } from "react";
import PropTypes from "prop-types";
import CartContext from "./Context";

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function getProduct(productId) {
    return cart.find((product) => product.id === productId);
  }

  function addToCart(product) {
    if (cart.find((p) => p.id === product.id)) {
      incrementQuantity(product.id);
      return;
    }
    setCart((prevCart) => [...prevCart, product]);
  }

  function removeFromCart(product) {
    const productInCart = cart.find((p) => p.id === product.id);
    if (productInCart.quantity > 1) {
      decrementQuantity(product.id);
      return;
    }
    setCart((prevCart) => prevCart.filter((p) => p.id !== product.id));
  }

  function clearCart() {
    setCart([]);
  }

  function incrementQuantity(productId) {
    setCart((prevCart) =>
      prevCart.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      })
    );
  }

  function decrementQuantity(productId) {
    setCart((prevCart) => {
      const productInCart = prevCart.find((p) => p.id === productId);
      if (productInCart.quantity === 1) {
        return prevCart.filter((p) => p.id !== productId);
      }

      return prevCart.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      })
    }
    );
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        getProduct,
        addToCart,
        removeFromCart,
        clearCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
