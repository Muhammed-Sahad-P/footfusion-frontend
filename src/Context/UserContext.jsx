import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();
export const UserContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  useEffect(() => {
    const userExists = JSON.parse(localStorage.getItem("currentUser"));
    if (userExists) {
      setCurrentUser(userExists);
    }
  }, []);


  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        setCurrentUser,
       
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
