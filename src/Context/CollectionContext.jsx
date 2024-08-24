import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../utils/useFetch";
import { UserContext } from "./UserContext";

export const CollectionContext = createContext();

export const CollectionProvider = (props) => {
  const { isLoggedIn } = useContext(UserContext);
  const userId = isLoggedIn?.id;
  const [cartItems, setCartItems] = useState({});
  const [buyItems, setBuyItems] = useState({});
  const { data: products } = useFetch("http://localhost:5000/products");

  // take from server
  useEffect(() => {
    if (isLoggedIn && userId) {
      setCart();
    }
  }, [isLoggedIn,userId]);

  // store into server
  useEffect(() => {
    if (isLoggedIn && userId && Object.keys(cartItems).length > 0) {
      const timer = setTimeout(() => {
        cartAdds();
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [cartItems, isLoggedIn, userId]);

  const setCart = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}/cart`);
      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }
      const data = await response.json();
      if (data.cart) {
        setCartItems(data.cart || {});
      }
    } catch (error) {
      console.error("Error fetching cart", error);
    }
  };

  const cartAdds = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}/cart`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: cartItems }),
      });
      if (!response.ok) {
        throw new Error("Failed to update cart data");
      }
      const data = await response.json();
      console.log("Cart updated:", data);
    } catch (error) {
      console.error("Error updating cart", error);
    }
  };

  const addToCart = (itemId) => {
    if (!products || products.length === 0) return;

    const item = products.find((item) => item.id === itemId);
    if (!item) return; // Handle case where item is not found

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


  const removeFromCart = (itemId, removeCompletely = false) => {
    setCartItems((prevCartItems) => {
      if (removeCompletely) {
        // eslint-disable-next-line no-unused-vars
        const { [itemId]: _, ...newCartItems } = prevCartItems;
        return newCartItems;
      } else {
        const existingItem = prevCartItems[itemId];
        if (existingItem && existingItem.quantity > 1) {
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
