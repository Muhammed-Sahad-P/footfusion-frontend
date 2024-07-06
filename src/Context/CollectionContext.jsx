import { createContext,  useState } from "react";
import useFetch from "../utils/useFetch";

export const CollectionContext = createContext();

export const CollectionProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [buyItems, setBuyItems] = useState({});
  const {data}= useFetch("http://localhost:3000/products");


  const addToCart = (itemId) => {
    const item = data.find((item) => item.id === itemId);

  

    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems[itemId];
      if (existingItem) {
        return {
          ...prevCartItems,
          [itemId]: {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          },
        };
      } else {
        return {
          ...prevCartItems,
          [itemId]: {
            ...item,
            quantity: 1,
          },
        };
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems[itemId];
      if (existingItem.quantity > 1) {
        return {
          ...prevCartItems,
          [itemId]: {
            ...existingItem,
            quantity: existingItem.quantity - 1,
          },
        };
      } else {
        const { [itemId]: _, ...newCartItems } = prevCartItems;
        return newCartItems;
      }
    });
  };

  const contextValue = {
    addToCart,
    removeFromCart,
    cartItems,
    buyItems,
    setBuyItems,
    setCartItems,
  };

  return (
    <CollectionContext.Provider value={contextValue}>
      {props.children}
    </CollectionContext.Provider>
  );
};
