import { createContext, useState, useEffect } from "react";
import Alert from "../Components/Alert";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [newUser, setNewUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [alert, setAlert] = useState(null); // State for alert
  const navigate = useNavigate();

  useEffect(() => {
    const userExists = localStorage.getItem("currentUser");
    if (userExists) {
      setCurrentUser(JSON.parse(userExists));
      setIsLoggedIn(JSON.parse(userExists));
    }
  }, []);

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000); // Hide alert after 3 seconds
  };

  const SignUp = async (formValues) => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        const data = await response.json();
        showAlert("Registration Successful", "success");
        localStorage.setItem("NewUser", JSON.stringify(data.data));
        setNewUser(data.data);

        return {
          success: true,
          message: "Registration Successful",
        };
      } else {
        const errorData = await response.json();
        showAlert(errorData.message || "Something went wrong", "error");
        return {
          success: false,
          message: errorData.message || "Something went wrong",
        };
      }
    } catch (error) {
      console.log(error);
      showAlert("Network error", "error");
      return {
        success: false,
        message: "Network error",
      };
    }
  };

  const Login = async (formValues) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        const { token, isAdmin, id, user } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("isAdmin", isAdmin);
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ id, isAdmin, user })
        );
        setCurrentUser({ id, isAdmin, user });
        setIsLoggedIn({ id, isAdmin });

        showAlert("Login Successful", "success");

        return {
          success: true,
          admin: isAdmin,
          message: "Login Successful",
        };
      } else {
        showAlert(data.message, "error");
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error!", error);
      showAlert("Something went wrong!", "error");
      return { success: false, message: "Something went wrong!" };
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <UserContext.Provider
      value={{
        handleLogout,
        SignUp,
        newUser,
        Login,
        isLoggedIn,
        currentUser,
      }}
    >
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      {props.children}
    </UserContext.Provider>
  );
};
