import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";

export const CollectionContext = createContext();

export const CollectionProvider = (props) => {
  const { isLoggedIn } = useContext(UserContext);

  const userId = isLoggedIn?.user?._id;
  const [cartItems, setCartItems] = useState({});
  const [buyItems, setBuyItems] = useState({});

  //add to cart
  const addToCart = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, productId: itemId }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to add cart data");
      }
      const data = await response.json();
      console.log("Cart added:", data);
    } catch (error) {
      console.error("Error adding cart", error);
    }
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
