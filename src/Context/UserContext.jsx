import { createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [newUser, setNewUser] = useState({});

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const userExists = localStorage.getItem("currentUser");
    if (userExists) {
      setIsLoggedIn(JSON.parse(userExists));
    }
  }, []);

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

        setIsLoggedIn(user);
        return {
          success: true,
          message: "Login Successful",
        };
      } else if (
        formValues.email === "sahad1212@gmail.com" &&
        formValues.password === "1212"
      ) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            name: "Sahad",
            email: "sahad1212@gmail.com",
            password: "1212",
          })
        );

        setIsLoggedIn({
          name: "Sahad",
          email: "sahad1212@gmail.com",
          password: "1212",
        });

        return {
          success: true,
          admin: true,
          message: "Admin Login Successful",
        };
      } else {
        return { success: false, message: "Invalid email or password" };
      }
    } catch (error) {
      console.log("Error!", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(null);
    localStorage.removeItem("currentUser");

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
