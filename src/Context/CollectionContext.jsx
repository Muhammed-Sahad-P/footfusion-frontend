import React, { createContext, useState } from "react";
import { ProductData } from "../Components/Products/Product";

export const CollectionContext = createContext();

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < ProductData.length; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const CollectionProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const contextValue = { cartItems, addToCart, removeFromCart };

  return (
    <CollectionContext.Provider value={contextValue}>
      {props.children}
    </CollectionContext.Provider>
  );
};
