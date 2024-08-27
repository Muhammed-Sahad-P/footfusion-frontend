import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const CollectionContext = createContext();

export const CollectionProvider = (props) => {
  const { isLoggedIn } = useContext(UserContext);

  const userId = isLoggedIn?.user?._id;
  const [cartItems, setCartItems] = useState({});
  const [buyItems, setBuyItems] = useState({});
  const [wishlist, setWishlist] = useState([]);

  //fetch/view wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/wishlist/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }
        const data = await response.json();
        setWishlist(data.products || []);
        console.log("Wishlist fetched:", data);
      } catch (error) {
        console.error("Error fetching wishlist", error);
      }
    };
    if (userId) {
      fetchWishlist();
    }
  }, [userId]);

  //add to wishlist
  const addToWishlist = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, productId: itemId }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to add data to wishlist");
      }
      const data = await response.json();
      setWishlist((prevWishlist) => [...prevWishlist, data.wishlist]); // Update the wishlist state immediately
      console.log("Wishlist added:", data);
    } catch (error) {
      console.error("Error adding to wishlist", error);
    }
  };

  //remove from wishlist
  const removeFromWishlist = async (itemId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/wishlist/${userId}/${itemId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        setWishlist((prevWishlist) =>
          prevWishlist.filter((item) => item._id !== itemId)
        ); // Update the wishlist state immediately
        console.log("Product removed from wishlist");
      } else {
        throw new Error("Failed to remove from wishlist");
      }
    } catch (error) {
      console.error("Error removing from wishlist", error);
    }
  };

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

  const contextValue = {
    addToCart,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    setWishlist,
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
