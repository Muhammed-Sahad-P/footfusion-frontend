import { createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [newUser, setNewUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userExists = localStorage.getItem("currentUser");
    if (userExists) {
      setIsLoggedIn(JSON.parse(userExists));
    }
  }, []);

  const Login = async (formValues) => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();
      console.log(data);
      

      if (response.ok) {
        const { token, isAdmin, id,user} = data;
        localStorage.setItem("token", token);
        localStorage.setItem("isAdmin", isAdmin);
        localStorage.setItem("currentUser", JSON.stringify({ id, isAdmin, user })); 
    
        
        setIsLoggedIn({ id, isAdmin });

        return {
          success: true,
          admin: isAdmin,
          message: "Login Successful",
        };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error!", error);
      return { success: false, message: "Something went wrong!" };
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  const SignUp = async (formValues) => {
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Registration Successful");
        localStorage.setItem("NewUser", JSON.stringify(data.data));
        setNewUser(data.data);

        return {
          success: true,
          message: "Registration Successful",
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || "Something went wrong",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Network error",
      };
    }
  };
  return (
    <UserContext.Provider
      value={{
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
