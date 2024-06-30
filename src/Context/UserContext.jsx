import  { createContext, useState } from "react";

export const UserContext = createContext();
export const UserContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {props.children}
    </UserContext.Provider>
  );
};
