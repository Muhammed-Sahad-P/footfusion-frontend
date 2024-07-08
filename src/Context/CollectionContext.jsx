import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../utils/useFetch";
import { UserContext } from "./UserContext";

export const CollectionContext = createContext();

export const CollectionProvider = (props) => {
  const { isLoggedIn } = useContext(UserContext);
  const [cartItems, setCartItems] = useState({});

  const [buyItems, setBuyItems] = useState({});
  const { data } = useFetch("http://localhost:3000/products");

  // take from server
  useEffect(() => {
    if (isLoggedIn) {
      setCart();
    }
  }, [isLoggedIn]);

  // store in to server
  useEffect(() => {
    if (isLoggedIn) {
      cartAdds();
    }
  }, [cartItems, isLoggedIn]);

  const setCart = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${isLoggedIn.id}`
      );
      const data = await response.json();
      if (data.cart) {
        setCartItems(data.cart || {});
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const cartAdds = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${isLoggedIn.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart: cartItems }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (itemId) => {
    const item = data.find((item) => item.id === itemId);

    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems[itemId];
      if (existingItem) {
        return {
          ...prevCartItems,
          [itemId]: { ...existingItem, quantity: existingItem.quantity + 1 },
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
        // eslint-disable-next-line no-unused-vars
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
