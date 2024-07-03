import { createContext, useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { CollectionContext } from "./CollectionContext";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const navigate = useNavigate();
  const { setCartItems } = useContext(CollectionContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  useEffect(() => {
    const userExists = JSON.parse(localStorage.getItem("currentUser"));
    if (userExists) {
      setCurrentUser(userExists);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    setCartItems({});
    navigate("/login");
  };
  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        setCurrentUser,
        handleLogout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
