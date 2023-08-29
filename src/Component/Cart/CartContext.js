// CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartElements, setCartElements] = useState([]);

  const addToCart = (product) => {
    const existingCartItemIndex = cartElements.findIndex(
      (item) => item.title === product.title
    );

    if (existingCartItemIndex !== -1) {
      const updatedCart = [...cartElements];
      updatedCart[existingCartItemIndex].quantity += 1;
      setCartElements(updatedCart);
    } else {
      setCartElements([...cartElements, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = cartElements.filter((_, i) => i !== index);
    setCartElements(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{ cartElements, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
