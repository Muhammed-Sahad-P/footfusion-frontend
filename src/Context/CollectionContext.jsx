import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import Alert from "../Components/Alert";

export const CollectionContext = createContext();

export const CollectionProvider = (props) => {
  const { isLoggedIn,currentUser } = useContext(UserContext);
  // console.log(currentUser);
  

  const userId = isLoggedIn?.user?._id;
  // console.log(userId);
  
  const [cartItems, setCartItems] = useState({});
  const [buyItems, setBuyItems] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [alert, setAlert] = useState(null);
  const [viewCart, setViewcart] = useState([]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  //fetch/view wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/wishlist/${currentUser?.user?._id}`,
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
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, [currentUser]);

  //add to wishlist
  const addToWishlist = async (itemId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUser?.user?._id, productId: itemId }),
        credentials: "include",
      });
      console.log(userId);
      

      if (response.status === 400) {
        const errorData = await response.json();
        setAlert({ message: errorData.message, type: "error" });
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to update wishlist");
      }

      const data = await response.json();

      // Determine the action based on the response message
      const isRemoved = data.message.includes("removed");
      const alertMessage = isRemoved
        ? "Product removed from wishlist"
        : "Product added to wishlist";
      const alertType = isRemoved ? "error" : "success"; // Set type for alert

      // Update the wishlist state
      setWishlist(data.wishlist.products);
      setAlert({ message: alertMessage, type: alertType });
    } catch (error) {
      setAlert({ message: "Error updating wishlist", type: "error" });
    }
  };

  //remove from wishlist
  const removeFromWishlist = async (itemId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/wishlist/${currentUser?.user?._id}/${itemId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        setWishlist((prevWishlist) =>
          prevWishlist.filter((item) => item._id !== itemId)
        );
        setAlert({ message: "Product removed from wishlist", type: "error" });
      } else {
        throw new Error("Failed to remove from wishlist");
      }
    } catch (error) {
      setAlert({ message: "Error removing from wishlist", type: "error" });
    }
  };

  //add to cart
  const addToCart = async (itemId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUser?.user?._id, productId: itemId }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to add cart data");
      }
      const data = await response.json();
      setAlert({
        message: "Product added to cart successfully",
        type: "success",
        data,
      });
      setViewcart(data.products);
    } catch (error) {
      setAlert({ message: "Error occured Cart", type: "error" });
    }
  };

  //fetch/view cart
  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/cart/${currentUser?.user?._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add cart data");
        }
        const data = await response.json();
        const newData = data.products || [];
        setViewcart(newData);
      } catch (error) {
        console.error("Error adding cart", error);
      }
    };
    getCart(currentUser?.user?._id);
  }, [currentUser]);

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
    viewCart,
    setViewcart,
  };

  return (
    <CollectionContext.Provider value={contextValue}>
      {props.children}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
    </CollectionContext.Provider>
  );
};
