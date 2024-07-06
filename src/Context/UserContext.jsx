import { createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
// import { CollectionContext } from "./CollectionContext";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [newUser, setNewUser] = useState({});
    const navigate = useNavigate();
  //   const { setCartItems } = useContext(CollectionContext);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  //   const [currentUser, setCurrentUser] = useState(
  //     JSON.parse(localStorage.getItem("currentUser")) || null
  //   );
   useEffect(()=>{
    const userExists = localStorage.getItem("currentUser")
    if(userExists){
      setIsLoggedIn(JSON.parse(userExists))
    }

   },[])

  const Login = async (formValues) => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();
      const user = users.find((user) => {
        return (
          user.email === formValues.email &&
          user.password === formValues.password
        );
      });
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        // setCurrentUser(user);
        setIsLoggedIn(user);
        return {
          success: true,
          message: "Login Successful",
        };
      } else {
        return { success: false, message: "Invalid email or password" };
      }
    } catch (error) {
      console.log("Error!", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(null);
    navigate("/login");
  };
  const SignUp = async (formValues) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      if (response.ok) {
        alert("Registration Successful");
        localStorage.setItem("NewUser", JSON.stringify(formValues));
        setNewUser(formValues);
        return {
          success: true,
          message: "Registration Successful",
        };
      } else {
        return {
          success: false,
          message: "Something went wrong",
        };
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UserContext.Provider
      value={{
        // currentUser,
        // setCurrentUser,
        handleLogout,
        SignUp,
        newUser,
        Login,
        isLoggedIn,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
